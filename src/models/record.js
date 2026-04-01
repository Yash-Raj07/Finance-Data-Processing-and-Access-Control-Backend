/**
 * Financial Record Schema Definition
 * 
 * Fields:
 * - id: string (UUID)
 * - userId: string (Foreign Key to User.id)
 * - amount: number
 * - type: 'income' | 'expense'
 * - category: string
 * - date: string (ISO date format)
 * - note: string
 */

const FinancialRecord = {
  id: '',
  userId: '',
  amount: 0,
  type: 'expense',
  category: '',
  date: '',
  note: ''
};

module.exports = FinancialRecord;
