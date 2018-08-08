/* eslint-env mocha */

const omit = require("../functions/omit");
const chai = require("chai");

describe("omit(originalObjects, ...paths)", () => {
  describe("json {} attributes and nested attributes", () => {
    it("should omit multiple attributes in depth 0", () => {
      const originalObject = {
        attr1: true,
        attr2: { nestedContent: true },
        attr3: false
      };
      const expectedObject = { attr1: true, attr3: false };
      const outputObject = omit(originalObject, "attr2");
      chai.expect(outputObject).to.deep.eq(expectedObject);
    });

    it("should omit multiple attributes in depth n > 0", () => {
      const originalObject = {
        depth0: {
          depth1: {
            depth2: {
              attr1: true,
              attr2: { nestedContent: true },
              attr3: false
            },
            someOtherAttribute: true
          },
          someOtherAttribute: true
        },
        someOtherAttribute: true
      };
      const expectedObject = {
        depth0: {
          depth1: {
            depth2: { attr1: true, attr3: false },
            someOtherAttribute: true
          },
          someOtherAttribute: true
        },
        someOtherAttribute: true
      };
      const outputObject = omit(originalObject, "depth0.depth1.depth2.attr2");
      chai.expect(outputObject).to.deep.eq(expectedObject);
    });
  });

  describe("json {} containing json [] or containing json [] with json {} rows", () => {
    it("should omit specific attribute in every row of an array attrubute", () => {
      const originalObject = {
        array: [
          { attr1: true, attr2: "remove me" },
          { attr1: true, attr2: "remove me too" }
        ]
      };
      const expectedObject = {
        array: [{ attr1: true }, { attr1: true }]
      };
      const outputObject = omit(originalObject, "array.attr2");
      chai.expect(outputObject).to.deep.eq(expectedObject);
    });
    it("should omit specific attribute in array", () => {
      const originalObject = {
        array: [
          { attr1: true, attr2: "don't delete" },
          { attr1: true, attr2: "remove me" }
        ]
      };
      const expectedObject = {
        array: [{ attr1: true, attr2: "don't delete" }, { attr1: true }]
      };
      const outputObject = omit(originalObject, "array.1.attr2");
      chai.expect(outputObject).to.deep.eq(expectedObject);
    });
  });

  describe("json [] or containing json {} rows", () => {
    it("should omit specific attribute in every row of an array as original object", () => {
      const originalObject = [
        { attr1: true, attr2: "remove me" },
        { attr1: true, attr2: "remove me too" }
      ];
      const expectedObject = [{ attr1: true }, { attr1: true }];
      const outputObject = omit(originalObject, "attr2");
      chai.expect(outputObject).to.deep.eq(expectedObject);
    });

    it("should omit specific attribute in array as original object", () => {
      const originalObject = [
        { attr1: true, attr2: "don't delete" },
        { attr1: true, attr2: "remove me" }
      ];
      const expectedObject = [
        { attr1: true, attr2: "don't delete" },
        { attr1: true }
      ];
      const outputObject = omit(originalObject, "1.attr2");
      chai.expect(outputObject).to.deep.eq(expectedObject);
    });
  });
});
