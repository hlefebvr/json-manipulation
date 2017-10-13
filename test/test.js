const jsonOmit = require('../index.js');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

const jsonToTest = {
    firstname: 'John',
    lastname: 'Doe',
    address: {
        country: 'FR',
        postalCode: 90100,
        residents: [
            { firstname: 'John', lastname: 'Doe' },
            { firstname: 'Johnette', lastname: 'Doe' },
        ]
    },
    phones: [
        0321564389,
        0723561289,
    ]
};

describe('JSON Modifications', function() {
    it('should omit series of nested attributes', function() {
        const expectedResult = {
            firstname: 'John',
            address: {
                country: 'FR',
            },
            phones: [
                0321564389,
                0723561289,
            ]
        };
        const changed = jsonOmit(jsonToTest, ['address.postalCode', 'address.residents', 'lastname']);
        expect(expectedResult).to.deep.equal(changed);
    });
    it('should omit single attributes', function() {
        const expectedResult = {
            firstname: 'John',
            address: {
                country: 'FR',
                postalCode: 90100,
                residents: [
                    { firstname: 'John', lastname: 'Doe' },
                    { firstname: 'Johnette', lastname: 'Doe' },
                ]
            },
            phones: [
                0321564389,
                0723561289,
            ]
        };
        const changed = jsonOmit(jsonToTest, 'lastname');
        expect(expectedResult).to.deep.equal(changed);
    });
    it('should omit inside array attribute in every row', function() {
        const expectedResult = {
            firstname: 'John',
            lastname: 'Doe',
            address: {
                country: 'FR',
                postalCode: 90100,
                residents: [
                    { firstname: 'John' },
                    { firstname: 'Johnette' },
                ]
            },
            phones: [
                0321564389,
                0723561289,
            ]
        };
        const changed = jsonOmit(jsonToTest, 'address.residents.lastname');
        expect(expectedResult).to.deep.equal(changed);
    });
    it('should omit first level attribute', function() {
        const expectedResult = {
            firstname: 'John',
            lastname: 'Doe',
            address: {
                country: 'FR',
                postalCode: 90100,
                residents: [
                    { firstname: 'John', lastname: 'Doe' },
                    { firstname: 'Johnette', lastname: 'Doe' },
                ]
            },
        };
        const changed = jsonOmit(jsonToTest, 'phones');
        expect(expectedResult).to.deep.equal(changed);
    });
});
