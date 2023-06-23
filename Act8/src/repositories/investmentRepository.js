// repositories/investmentRepository.js
const { Sequelize, DataTypes } = require('sequelize');

class InMemoryRepository {
  constructor() {
    this.stocks = [];
  }

  async addStock(stock) {
    this.stocks.push(stock);
  }

  async getAllStocks() {
    return this.stocks;
  }

  async clearStocks() {
    this.stocks = [];
  }

  async getStockBySymbol(symbol) {
    return this.stocks.find((stock) => stock.symbol === symbol);
  }

  async updateStock(updatedStock) {
    const existingStock = this.stocks.find((stock) => stock.symbol === updatedStock.symbol);

    if (existingStock) {
      existingStock.quantity = updatedStock.quantity;
      existingStock.investment = updatedStock.investment;
    }
}
}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/investment.db',
});

const Stock = sequelize.define('Stock', {
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  investment: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

class SQLiteRepository {
  constructor(){
    Stock.sync();
  }
  async addStock(stock) {
    await Stock.create(stock);
  }

  async getAllStocks() {
    return await Stock.findAll();
  }

  async clearStocks() {
    await Stock.destroy({
      truncate: true,
    });
  }

  async getStockBySymbol(symbol) {
    return await Stock.findOne({
      where: {
        symbol: symbol,
      },
    });
  }

  async updateStock(stock) {
    await stock.save();
  }
}

let investmentRepository
if (process.env.NODE_ENV === 'test') {
 investmentRepository = new InMemoryRepository();
} else {
   investmentRepository = new SQLiteRepository();
}

module.exports = investmentRepository;