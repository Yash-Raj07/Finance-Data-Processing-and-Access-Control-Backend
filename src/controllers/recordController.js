const recordService = require('../services/recordService');

class RecordController {
  createRecord(req, res, next) {


    
   try {
  const payload = req.body;
  const userId = req.user.id;

  const { amount, type, category, date, note } = payload;

  // Combined validation
  const isInvalidAmount = !amount || amount <= 0;
  const isInvalidType = type && !["income", "expense"].includes(type);
  const isMissingFields = !amount || !type || !category;

  if (isMissingFields) {
    return res.status(400).json({
      error: "Required fields missing: amount, type, category"
    });
  }

  if (isInvalidAmount) {
    return res.status(400).json({
      error: "Amount must be a positive number"
    });
  }

  if (isInvalidType) {
    return res.status(400).json({
      error: "Invalid type. Allowed values: income, expense"
    });
  }

  const recordPayload = {
    userId,
    amount,
    type,
    category,
    date,
    note
  };

  const createdRecord = recordService.createRecord(recordPayload);

  return res.status(201).json(createdRecord);

} catch (error) {
  next(error);
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
