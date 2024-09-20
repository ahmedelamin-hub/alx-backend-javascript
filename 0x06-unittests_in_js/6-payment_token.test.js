const { expect } = require('chai');
const getPaymentTokenFromAPI = require('./6-payment_token');

describe('getPaymentTokenFromAPI', () => {
    it('should return a successful response when success is true', (done) => {
        getPaymentTokenFromAPI(true)
            .then((response) => {
                expect(response).to.have.property('data', 'Successful response from the API');
                done();  // Call done to signal that the test is complete
            })
            .catch((err) => done(err));  // Call done with error in case of failure
    });

    it('should not return anything when success is false', (done) => {
        const result = getPaymentTokenFromAPI(false);
        expect(result).to.be.undefined;
        done();
    });
});
