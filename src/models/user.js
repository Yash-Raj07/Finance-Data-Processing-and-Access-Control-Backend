/**
 * User Schema Definition
 * 
 * Fields:
 * - id: string (UUID)
 * - name: string
 * - email: string
 * - role: 'viewer' | 'analyst' | 'admin'
 * - isActive: boolean
 */

const User = {
  id: '',
  name: '',
  email: '',
  role: 'viewer',
  isActive: true
};

module.exports = User;
