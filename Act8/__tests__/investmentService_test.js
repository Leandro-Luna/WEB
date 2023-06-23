const investmentService = require("../src/services/investmentService");
describe('Investment Service', ()=>{
    beforeAll(() => {
        investmentService.addStock({
            symbol: 'AAPL',
            quantity: 5,
            price: 1,
            investment: 5,
          });
      });
    it('Can Calculate Performance', async ()=> {
        const mockGetCurrentPrice = jest.fn((symbol) => {
            if (symbol === 'AAPL') {
              return 2; // Mocking the current price for AAPL symbol
            } else if (symbol === 'MSFT') {
              return 60; // Mocking the current price for MSFT symbol
            }
          });

        investmentService.getCurrentPrice = mockGetCurrentPrice;

        return investmentService.calculatePortfolioPerformance().then((portfolioPerformance)=>{
            expect(portfolioPerformance)
        })
      })
    it('Can retrieve stocks', async ()=>{
      expect(typeof investmentService.getAllStocks()).toBe('object')
    })
}
)