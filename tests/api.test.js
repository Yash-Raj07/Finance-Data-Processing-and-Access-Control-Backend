const request = require('supertest');
const app = require('../src/app');

describe('Finance Dashboard API', () => {
  let token;

  // Login to get token for tests
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'admin@example.com',
        id: 'admin-123'
      });
    token = res.body.token;
  });

  describe('Health Check', () => {
    it('should return 200 UP', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('UP');
    });
  });

  describe('Auth Middleware', () => {
    it('should return 401 if no token provided', async () => {
      const res = await request(app).get('/api/records');
      expect(res.statusCode).toEqual(401);
    });

    it('should return 403 if invalid token provided', async () => {
      const res = await request(app)
        .get('/api/records')
        .set('Authorization', 'Bearer invalid_token');
      expect(res.statusCode).toEqual(403);
    });
  });

  describe('Records API', () => {
    it('should return records with pagination', async () => {
      const res = await request(app)
        .get('/api/records')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('records');
      expect(res.body).toHaveProperty('pagination');
      expect(res.body.pagination.page).toEqual(1);
    });

    it('should support search', async () => {
      const res = await request(app)
        .get('/api/records?search=Salary')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.records.length).toBeGreaterThan(0);
      expect(res.body.records[0].category).toBe('Salary');
    });
  });

  describe('Dashboard API', () => {
    it('should return summary data', async () => {
      const res = await request(app)
        .get('/api/dashboard/summary')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('totalIncome');
      expect(res.body).toHaveProperty('monthlyTrends');
    });
  });
});
