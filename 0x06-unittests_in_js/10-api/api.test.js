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

  // Test for available payments
  describe('Available payments', () => {
    it('should return payment methods', (done) => {
	          request('http://localhost:7865/available_payments', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        const expectedResponse = {
          payment_methods: {
            credit_cards: true,
            paypal: false,
          }
        };
        expect(JSON.parse(body)).to.deep.equal(expectedResponse);
        done();
      });
    });
  });

  // Test for login endpoint
  describe('Login page', () => {
    it('should return Welcome message with valid username', (done) => {
      const options = {
        url: 'http://localhost:7865/login',
        method: 'POST',
        json: true,
        body: {
          userName: 'Betty'
        },
        headers: {
          'Content-Type': 'application/json'
        }
      };

      request(options, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('Welcome Betty');
        done();
      });
    });

    it('should return 400 if no username is provided', (done) => {
      const options = {
        url: 'http://localhost:7865/login',
        method: 'POST',
        json: true,
        body: {},
        headers: {
          'Content-Type': 'application/json'
        }
      };

      request(options, (error, response, body) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

});

