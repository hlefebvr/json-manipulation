const clone = require("./clone");

function destroy(originalObject, splittedPaths, depth = 0) {
  const obj = clone(originalObject);
  const toDo = {};
  const isArray = {};

  for (let i = 0; i < splittedPaths.length; i += 1) {
    const currentpath = splittedPaths[i];
    const key = currentpath[depth];

    if (!key) continue;

    if (Array.isArray(obj) && !key.match(/^([0-9]+)$/)) {
      for (let e = 0; e < obj.length; e += 1) {
        toDo[e] = [currentpath];
        isArray[e] = true;
      }
    } else if (currentpath.length - 1 === depth) {
      if (Array.isArray(obj)) obj.splice(+key, 1);
      else delete obj[key];
    } else if (!toDo[key]) {
      toDo[key] = [currentpath];
    } else {
      toDo[key].push(currentpath);
    }
  }

  const keysToExplore = Object.keys(toDo);

  for (let i = 0; i < keysToExplore.length; i += 1) {
    const key = keysToExplore[i];
    const offset = isArray[key] ? 0 : 1;
    obj[key] = destroy(obj[key], toDo[key], depth + offset);
  }

  return obj;
}

function omit(originalObject, ...paths) {
  const splittedPaths = paths.map(p => p.split("."));

  const copiedObject = clone(originalObject);

  const destinationObject = destroy(copiedObject, splittedPaths);
  return destinationObject;
}

module.exports = omit;
