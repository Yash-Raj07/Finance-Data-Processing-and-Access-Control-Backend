const { v4: uuidv4 } = require('uuid');
const db = require('../store/db');

/**
 * Service to handle Financial Record-related operations.
 */
class RecordService {
  /**
   * Creates a new financial record.
   * @param {Object} recordData - Record details.
   * @returns {Object} The created record.
   */
  createRecord(recordData) {
    const newRecord = {
      id: uuidv4(),
      userId: recordData.userId,
      amount: recordData.amount,
      type: recordData.type,
      category: recordData.category,
      date: recordData.date || new Date().toISOString(),
      note: recordData.note || '',
      isDeleted: false // Added soft delete flag
    };
    db.records.push(newRecord);
    return newRecord;
  }

  /**
   * Retrieves records based on filters with pagination and search.
   * @param {Object} options - Filter criteria (type, category, date, search, page, limit).
   * @returns {Object} List of filtered records and metadata.
   */
  getRecords(options = {}) {
    const { type, category, date, search, page = 1, limit = 10 } = options;
    
  const results = db.records.filter(record => {
  // Ignore soft-deleted records
  if (record.isDeleted) return false;

  // Type filter
  if (type && record.type !== type) return false;

  // Category filter
  if (category && record.category !== category) return false;

  // Date filter
  if (date && !record.date.startsWith(date)) return false;

  // Search filter
  if (search) {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      (record.note && record.note.toLowerCase().includes(searchTerm)) ||
      record.category.toLowerCase().includes(searchTerm);

    if (!matchesSearch) return false;
  }

  return true;
});

    // Pagination
    const totalCount = results.length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedResults = results.slice(startIndex, endIndex);

    return {
      records: paginatedResults,
      pagination: {
        total: totalCount,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalCount / limit)
      }
    };
  }

  /**
   * Updates a record by ID.
   * @param {string} recordId - ID of the record.
   * @param {Object} updateData - Data to update.
   * @returns {Object|null} Updated record or null if not found.
   */
  updateRecord(recordId, updateData) {
    const record = db.records.find(r => r.id === recordId);
    if (record) {
      if (updateData.amount !== undefined) record.amount = updateData.amount;
      if (updateData.type !== undefined) record.type = updateData.type;
      if (updateData.category !== undefined) record.category = updateData.category;
      if (updateData.date !== undefined) record.date = updateData.date;
      if (updateData.note !== undefined) record.note = updateData.note;
      return record;
    }
    return null;
  }

  /**
   * Soft deletes a record by ID.
   * @param {string} recordId - ID of the record.
   * @returns {boolean} True if deleted, false if not found.
   */
  deleteRecord(recordId) {
    const record = db.records.find(r => r.id === recordId);
    if (record) {
      record.isDeleted = true;
      return true;
    }
    return false;
  }
}

module.exports = new RecordService();
