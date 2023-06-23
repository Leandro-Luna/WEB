// tests/investmentApi.test.js
const request = require('supertest');
const app = require('../src/app');

describe('Investment API', () => {
  test('POST /stocks - should add a new stock', async () => {
    const stock = {
      symbol: 'AAPL',
      quantity: 10,
      price: 181.8,
      investment: 1000,
    };

    const response = await request(app).post('/stocks').send(stock);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(stock);
  });

  test('GET /stocks - should get all stocks', async () => {
    const response = await request(app).get('/stocks');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('DELETE /stocks - should clear all stocks', async () => {
    const response = await request(app).delete('/stocks');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Stocks cleared successfully' });
  });

  test('GET /portfolio/performance - should calculate portfolio performance', async () => {
    const response = await request(app).get('/portfolio/performance');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('performance');
    expect(typeof response.body.performance).toBe('number');
  });
});
