const investmentRepository = require('../repositories/investmentRepository.js');

const investmentService = {
  addStock: async (stock) => {
    const existingStock = await investmentRepository.getStockBySymbol(stock.symbol);

    if (existingStock) {
      existingStock.quantity += stock.quantity;
      existingStock.investment += stock.investment;
      await investmentRepository.updateStock(existingStock);
    } else {
      await investmentRepository.addStock(stock);
    }
  },

  getAllStocks: async () => {
    return await investmentRepository.getAllStocks()
  },

  clearStocks: async () => {
    await investmentRepository.clearStocks();
  },
  getCurrentPrice:(symbol)=> {
    // This emulates a request to an external api
    // Its purpose is to get the current price of a given stock symbol
    // This function will be mocked later in order to test the behaviour of our logic
      const stock_data = [
        {symbol:'AAPL', price:181.8},
        {symbol:'MSFT', price:327.2},
        {symbol:'GOOGL', price:122.3},
      ]
      return stock_data.find((stock) => stock.symbol === symbol).price
    },

  calculatePortfolioPerformance: async () => {
    const stocks = await investmentRepository.getAllStocks();
    let totalValue = 0;
    let totalInvestment = 0;
    let currentPrice = 0;

    stocks.forEach((stock) => {
      currentPrice = investmentService.getCurrentPrice(stock.symbol)
      console.log(currentPrice)
      totalInvestment += stock.investment;
      totalValue += stock.quantity * currentPrice;
    });
    return ((totalValue - totalInvestment) / totalInvestment) * 100;
  },
};

module.exports = investmentService;
