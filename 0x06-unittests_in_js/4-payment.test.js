const sinon = require('sinon');
const { expect } = require('chai');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./4-payment');

describe('sendPaymentRequestToApi with stub', () => {
    let calculateNumberStub;
    let consoleLogSpy;

    beforeEach(() => {
        // Stub Utils.calculateNumber to always return 10
        calculateNumberStub = sinon.stub(Utils, 'calculateNumber').returns(10);

        // Spy on console.log
        consoleLogSpy = sinon.spy(console, 'log');
    });

    afterEach(() => {
        // Restore the stub and spy
        calculateNumberStub.restore();
        consoleLogSpy.restore();
    });

    it('should call Utils.calculateNumber with SUM, 100, and 20 and return 10', () => {
        // Call sendPaymentRequestToApi
        sendPaymentRequestToApi(100, 20);

        // Assert that the stub was called with the correct arguments
        expect(calculateNumberStub.calledWith('SUM', 100, 20)).to.be.true;

        // Assert that console.log was called with the correct message
        expect(consoleLogSpy.calledWith('The total is: 10')).to.be.true;
    });
});
