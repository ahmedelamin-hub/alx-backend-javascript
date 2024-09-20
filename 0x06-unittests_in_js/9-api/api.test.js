const request = require('request');
const { expect } = require('chai');
const app = require('./api'); // Import your app

describe('API integration tests', () => {
  
  // Test for root endpoint
  describe('Index page', () => {
    it('should return the correct message', (done) => {
      request('http://localhost:7865', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('Welcome to the payment system');
        done();
      });
    });
  });

  // Test for cart page
  describe('Cart page', () => {
    it('should return Payment methods for cart 12 when id is a number', (done) => {
      request('http://localhost:7865/cart/12', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('Payment methods for cart 12');
        done();
      });
    });

    it('should return 404 when id is not a number', (done) => {
      request('http://localhost:7865/cart/hello', (error, response, body) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });

});
