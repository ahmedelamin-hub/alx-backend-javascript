const request = require('supertest');
const app = require('./api'); // Import the API

describe('API Endpoints', () => {
  
  // Test for /available_payments endpoint
  describe('GET /available_payments', () => {
    it('should return the correct payment methods', (done) => {
      request(app)
        .get('/available_payments')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect({
          payment_methods: {
            credit_cards: true,
            paypal: false
          }
        })
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  // Test for /login endpoint
  describe('POST /login', () => {
    it('should return "Welcome Betty" when userName is Betty', (done) => {
      request(app)
        .post('/login')
        .send({ userName: 'Betty' })
        .set('Content-Type', 'application/json')
        .expect(200)
        .expect('Welcome Betty')
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    it('should return status 400 when userName is not provided', (done) => {
      request(app)
        .post('/login')
        .send({})
        .set('Content-Type', 'application/json')
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });
});

