const recordService = require('../services/recordService');

class RecordController {
  createRecord(req, res, next) {
    try {
      const { amount, type, category, date, note } = req.body;
      const userId = req.user.id; // Extracted from auth middleware

      // Required fields validation
      if (!amount || !type || !category) {
        return res.status(400).json({
          error: "Amount, type, and category are required"
        });
      }

      // Amount validation
      if (amount <= 0) {
        return res.status(400).json({
          error: "Amount must be a positive number"
        });
      }

      // Type validation
      if (!["income", "expense"].includes(type)) {
        return res.status(400).json({
          error: "Type must be 'income' or 'expense'"
        });
      }

      const record = recordService.createRecord({
        userId,
        amount,
        type,
        category,
        date,
        note
      });

      return res.status(201).json(record);
    } catch (error) {
      next(error);
    }
  }

  getRecords(req, res, next) {
    try {
      const { type, category, date, search, page, limit } = req.query;
      const result = recordService.getRecords({ type, category, date, search, page, limit });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  updateRecord(req, res, next) {
    try {
      const { id } = req.params;
      const { amount, type, category, date, note } = req.body;

      if (amount !== undefined && amount <= 0) {
        return res.status(400).json({ error: 'Amount must be a positive number' });
      }

      if (type !== undefined && !['income', 'expense'].includes(type)) {
        return res.status(400).json({ error: "Type must be 'income' or 'expense'" });
      }

      const updatedRecord = recordService.updateRecord(id, { amount, type, category, date, note });
      if (!updatedRecord) {
        return res.status(404).json({ error: 'Record not found' });
      }
      res.json(updatedRecord);
    } catch (error) {
      next(error);
    }
  }

  deleteRecord(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = recordService.deleteRecord(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Record not found' });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RecordController();
