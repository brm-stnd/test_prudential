var chai = require('chai');
var expect = chai.expect;
const { successResponse, errorResponse } = require("../../helpers/response");

describe("Success And Error Response Helpers", function () {
    before(() => {
        sampleData = {
            content: 'foo'
        }
        sampleError = new Error('There is an error');
    });
    it('checks success Response when called', function () {
        var response = successResponse(sampleData, 'Success!');
        expect(response.success).to.be.true;
        expect(response.msg).to.be.a('string');
    });
    it('checks error response when called', function () {
        var response = errorResponse(sampleError);
        expect(response.success).to.be.false;
    });
});