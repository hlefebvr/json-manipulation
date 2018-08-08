/* eslint-env mocha */

const clone = require("../functions/clone");
const chai = require("chai");

describe("clone(originalObjects)", () => {
  it("should clone a json {}", () => {
    const originalObject = {
      depth0: { depth1: { depth2: { value: "nested value" } } }
    };
    const originalCopyObject = {
      depth0: { depth1: { depth2: { value: "nested value" } } }
    };
    const copiedObject = clone(originalObject);
    chai.expect(copiedObject).to.deep.eq(originalObject);
    copiedObject.depth0.depth1.depth2.value = "changed nested value";
    chai.expect(originalCopyObject).to.deep.eq(originalObject);
  });
  it("should clone a json []", () => {
    const originalObject = [{ depth0: { depth1: { value: "nested value" } } }];
    const originalCopyObject = [
      { depth0: { depth1: { value: "nested value" } } }
    ];
    const copiedObject = clone(originalObject);
    chai.expect(copiedObject).to.deep.eq(originalObject);
    copiedObject[0].depth0.depth1.value = "changed nested value";
    chai.expect(originalCopyObject).to.deep.eq(originalObject);
  });
});
