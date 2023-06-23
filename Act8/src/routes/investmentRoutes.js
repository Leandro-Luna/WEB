const { Router } = require('express');
const router = Router();

const investmentRepository = require('../repositories/investmentRepository.js');
const investmentService = require('../services/investmentService.js')
const investmentController = require('../controllers/investmentController');


router.post('/stocks', investmentController.addStock);
router.get('/stocks', investmentController.getAllStocks);
router.delete('/stocks', investmentController.clearStocks);
router.get('/portfolio/performance', investmentController.calculatePortfolioPerformance);

module.exports = router