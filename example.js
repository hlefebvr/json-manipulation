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
omit(clone, ['attr0']).then(formated => console.log('Removing first level attribute' + JSON.stringify(formated)));

// Removing nested attribute
clone = _.cloneDeep(json);
omit(clone, ['attr1.nestedAttr3.deepNestedAttr2']).then(formated => console.log('Removing nested attribute' + JSON.stringify(formated)));

// Removing nested array
clone = _.cloneDeep(json);
omit(clone, ['attr1.nestedAttr3.deepNestedArray']).then(formated => console.log('Removing nested array' + JSON.stringify(formated)));

// Removing attribute in every element of an array
clone = _.cloneDeep(json);
omit(clone, ['attr1.nestedAttr3.deepNestedArray.arrayAttr2']).then(formated => console.log('Removing attribute in every element of an array' + JSON.stringify(formated)));

// Editing array
const array = [
    { attr1: 'v1', attr2: 'v2' },
    { attr1: 'v3', attr2: 'v4' },
    { attr1: 'v5', attr2: 'v6' },
];

// Removing column of array
clone = _.cloneDeep(array);
omit(clone, ['attr1']).then(formated => console.log('Removing column of array' + JSON.stringify(formated)));