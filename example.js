// Include module
const omit = require('./index.js');
const _ = require('lodash');

// Editing jsons
const json = {
    attr0: 'v0',
    attr1: {
        nestedAttr1: 'v1',
        nestedAttr2: 'v2',
        nestedAttr3: {
            deepNestedAttr1: 'v3',
            deepNestedAttr2: 'v4',
            deepNestedArray: [
                { arrayAttr1: 'v5', arrayAttr2: 'v6' },
                { arrayAttr1: 'v5', arrayAttr2: 'v6' },
                { arrayAttr1: 'v7', arrayAttr2: 'v8' },
            ],
        },
    },
};

// Removing first level attribute
let clone = _.cloneDeep(json);
console.log( omit(clone, ['attr0']) );

// Removing nested attribute
clone = _.cloneDeep(json);
console.log( omit(clone, ['attr1.nestedAttr3.deepNestedAttr2']) );

// Removing nested array
clone = _.cloneDeep(json);
console.log( omit(clone, ['attr1.nestedAttr3.deepNestedArray']) );

// Removing attribute in every element of an array
clone = _.cloneDeep(json);
console.log( omit(clone, ['attr1.nestedAttr3.deepNestedArray.arrayAttr2']) );

// Editing array
const array = [
    { attr1: 'v1', attr2: 'v2' },
    { attr1: 'v3', attr2: 'v4' },
    { attr1: 'v5', attr2: 'v6' },
];

// Removing column of array
clone = _.cloneDeep(array);
console.log( omit(clone, ['attr1']) );