const dashboardService = require('../services/dashboardService');

class DashboardController {
  getSummary(req, res, next) {
    try {
      const summary = dashboardService.getSummary();
      res.json(summary);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DashboardController();
