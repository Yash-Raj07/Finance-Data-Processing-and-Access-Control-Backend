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
const monthlyTrendsMap = new Map();

for (const record of records) {
  const date = new Date(record.date);
  const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

  if (!monthlyTrendsMap.has(monthKey)) {
    monthlyTrendsMap.set(monthKey, {
      income: 0,
      expense: 0,
      net: 0
    });
  }

  const monthData = monthlyTrendsMap.get(monthKey);

  if (record.type === "income") {
    monthData.income += record.amount;
    monthData.net += record.amount;
  } else {
    monthData.expense += record.amount;
    monthData.net -= record.amount;
  }
}

// Convert Map → Object (if needed)
const monthlyTrends = Object.fromEntries(monthlyTrendsMap);
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
