const { v4: uuidv4 } = require('uuid');

const db = {
  users: [
    { id: 'admin-123', name: 'Admin User', email: 'admin@example.com', role: 'admin', isActive: true },
    { id: 'analyst-123', name: 'Analyst User', email: 'analyst@example.com', role: 'analyst', isActive: true },
    { id: 'viewer-123', name: 'Viewer User', email: 'viewer@example.com', role: 'viewer', isActive: true },
    { id: 'inactive-123', name: 'Inactive User', email: 'inactive@example.com', role: 'viewer', isActive: false }
  ],
  records: [
    { id: uuidv4(), userId: 'analyst-123', amount: 5000, type: 'income', category: 'Salary', date: '2026-03-01T10:00:00Z', note: 'Monthly salary' },
    { id: uuidv4(), userId: 'analyst-123', amount: 1500, type: 'expense', category: 'Rent', date: '2026-03-05T10:00:00Z', note: 'Monthly rent' },
    { id: uuidv4(), userId: 'analyst-123', amount: 200, type: 'expense', category: 'Food', date: '2026-03-06T12:00:00Z', note: 'Grocery shopping' },
    { id: uuidv4(), userId: 'admin-123', amount: 1000, type: 'income', category: 'Freelance', date: '2026-03-10T15:00:00Z', note: 'Side project' },
    { id: uuidv4(), userId: 'admin-123', amount: 100, type: 'expense', category: 'Utilities', date: '2026-03-12T09:00:00Z', note: 'Electricity bill' }
  ]
};

module.exports = db;
