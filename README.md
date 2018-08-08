# json-omit

Json manipulation node module.

Available functions :

- `omit(originialObject, ...paths)` : copies the `originalObject` and deletes attributes specified in `...paths` before returning the result
- `clone(originalObject)` : retruns a **deep** copy of the `originalObject`

## Examples

```javascript
const { omit, clone } = require("json-omit");
```

### omit(originalObject, ...paths)

omit attributes or nested attributes :

```javascript
const orignialObject = {
  depth0: {
    depth1: {
      attr1: "keep this attribute",
      attr2: { value: "remove me" },
      attr3: "remove me as well"
    }
  },
  someOtherAttribute: "I should be removed"
};

const omitted = omit(
  originalObject,
  "depth0.depth1.attr2",
  "depth0.depth1.attr3",
  "someOtherAttribute"
);

console.log(omitted);
/*
{
  depth0: {
    depth1: {
      attr1: "keep this attribute"
    }
  }
}
*/
```

omit attribute or nested attribute in every row of array

```javascript
const originalObject = {
  history: [
    { timestamp: "1234567", value: "example1" },
    { timestamp: "1234568", value: "example1", extraValue: true },
    { timestamp: "1234569", value: "example1" },
    { timestamp: "1234570", value: "example1" }
  ]
};

const omitted = omit(originalObject, "history.value");

console.log(omitted);
/*
{
  history: [
    { timestamp: "1234567" },
    { timestamp: "1234568" },
    { timestamp: "1234569" },
    { timestamp: "1234570" }
  ]
}
*/
```

omit attribute or nested attribute in specific row of array

```javascript
const originalObject = {
  history: [
    { timestamp: "1234567", value: "example1" },
    { timestamp: "1234568", value: "example1" },
    { timestamp: "1234569", value: "example1" },
    { timestamp: "1234570", value: "example1" }
  ]
};

const omitted = omit(originalObject, "history.2.value");

console.log(omitted);
/*
{
  history: [
    { timestamp: "1234567", value: "example1" },
    { timestamp: "1234568", value: "example1" },
    { timestamp: "1234569" },
    { timestamp: "1234570", value: "example1" }
  ]
};
*/
```

### clone(originalObject)

```javascript
const originalObject = {
  depth0: { depth1: { depth2: { value: "nested value" } } }
};
const copiedObject = clone(originalObject);

copiedObject.depth0.depth1.depth2.value = "changed nested value";

console.log(originalObject.depth0.depth1.depth2.value); // outputs "nested value"
console.log(copiedObject.depth0.depth1.depth2.value); // outputs "changed nested value"
```

## Contributing

- Contributing is **very welcomed** via pull requests or creating issues
- If you make a pull request, be sure to write/adapt a test file with respect to your specific changes
- Running tests is done via mocha and npm, run them like so : `npm t`
