const db = require('../store/db');

/**
 * Service to generate summary data for the dashboard.
 */
class DashboardService {
  /**
   * Generates financial summary.
   * @returns {Object} Summary data.
   */
  getSummary() {
    // Exclude soft-deleted records from summary
    const records = db.records.filter(r => !r.isDeleted);

    const totalIncome = records
      .filter(r => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0);

    const totalExpense = records
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);

    const netBalance = totalIncome - totalExpense;

    // Category-wise aggregation
    const categoryTotals = records.reduce((acc, record) => {
      const { category, amount, type } = record;
      if (!acc[category]) {
        acc[category] = { income: 0, expense: 0, total: 0 };
      }
      
      if (type === 'income') {
        acc[category].income += amount;
        acc[category].total += amount;
      } else {
        acc[category].expense += amount;
        acc[category].total -= amount;
      }
      
      return acc;
    }, {});

    // Recent transactions (last 5)
    const recentTransactions = [...records]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    // Trends: Monthly aggregation
   const monthlyTrends = records.reduce((accumulator, record) => {
  const recordDate = new Date(record.date);

  const year = recordDate.getFullYear();
  const month = String(recordDate.getMonth() + 1).padStart(2, "0");

  const monthKey = `${year}-${month}`;

  // Initialize month bucket if not present
  if (!accumulator[monthKey]) {
    accumulator[monthKey] = {
      income: 0,
      expense: 0,
      net: 0
    };
  }

  // Update values based on record type
  if (record.type === "income") {
    accumulator[monthKey].income += record.amount;
    accumulator[monthKey].net += record.amount;
  } else {
    accumulator[monthKey].expense += record.amount;
    accumulator[monthKey].net -= record.amount;
  }

  return accumulator;
}, {});

    return {
      totalIncome,
      totalExpense,
      netBalance,
      categoryTotals,
      recentTransactions,
      monthlyTrends
    };
  }
}

module.exports = new DashboardService();
