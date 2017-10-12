const _ = require('lodash');

function recursiveDelete(attr, attributePath, depth = 0) {
    if (attr.x !== undefined) {
        if (Array.isArray(attr.x)) {
            attr.x.forEach((value, index) => {
                recursiveDelete({ x: attr.x[index] }, attributePath, depth);
            });
        }
        else if (attr.x[attributePath[depth]] !== undefined){
            if (depth === attributePath.length - 1)
                delete attr.x[attributePath[depth]];
            else
                recursiveDelete({ x: attr.x[attributePath[depth]] }, attributePath, depth + 1);
        }
    }
}

function omit(object, paths){
    let newObject = _.cloneDeep(object);
    paths.forEach((path) => {
        recursiveDelete({ x:newObject }, path.split('.'));
    });
    return newObject;
}

module.exports = omit;
