// controllers/investmentController.js
const investmentService = require('../services/investmentService')

const investmentController = {
  addStock: (req, res) => {
    const { symbol, quantity, price, investment } = req.body;

    if (!symbol || !quantity || !price || !investment) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const stock = {
      symbol,
      quantity,
      price,
      investment,
    };

    investmentService.addStock(stock);
    res.status(201).json(stock);
  },

  getAllStocks: (req, res) => {
    investmentService.getAllStocks().then((stocks)=>{
        res.json(stocks);
    })
  },

  clearStocks: (req, res) => {
    investmentService.clearStocks();
    res.json({ message: 'Stocks cleared successfully' });
  },

  calculatePortfolioPerformance: (req, res) => {
    investmentService.calculatePortfolioPerformance().then((portfolioPerformance)=>{
        res.json({ performance: portfolioPerformance });
    });
  },
};

module.exports = investmentController;
