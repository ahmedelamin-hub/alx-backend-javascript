const sinon = require('sinon');
const { expect } = require('chai');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', () => {
    it('should use Utils.calculateNumber for SUM operation', () => {
        // Create a spy for Utils.calculateNumber
        const calculateNumberSpy = sinon.spy(Utils, 'calculateNumber');

        // Call sendPaymentRequestToApi
        sendPaymentRequestToApi(100, 20);

        // Check if the spy was called with the correct arguments
        expect(calculateNumberSpy.calledWith('SUM', 100, 20)).to.be.true;

        // Restore the spy
        calculateNumberSpy.restore();
    });
});
