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
    
// Filter out soft-deleted records first
    let results = db.records.filter(r => !r.isDeleted);

    if (type) {
      results = results.filter(r => r.type === type);
    }

    if (category) {
      results = results.filter(r => r.category === category);
    }

    if (date) {
      results = results.filter(r => r.date.startsWith(date));
    }

    // Search support
    if (search) {
      const searchTerm = search.toLowerCase();
      results = results.filter(r => 
        (r.note && r.note.toLowerCase().includes(searchTerm)) || 
        r.category.toLowerCase().includes(searchTerm)
      );
    }
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
