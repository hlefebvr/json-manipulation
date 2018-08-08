function clone(originalObject) {
  const destinationObject = Array.isArray(originalObject) ? [] : {};
  const keys = Object.keys(originalObject);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const value = originalObject[key];
    if (typeof value === "object") destinationObject[key] = clone(value);
    else destinationObject[key] = value;
  }

  return destinationObject;
}

module.exports = clone;
