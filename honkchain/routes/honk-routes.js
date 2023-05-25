const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json()

const {
    welcome,
    blockchainHistory,
    latestBlock,
    getBlocksInRange,
    transaction
} = require('../controllers/honk-controller');

router.route('/').get(welcome);

router
  .route('/history')
  .get(blockchainHistory);

router
  .route('/history/latest')
  .get(latestBlock)

router
  .route('/history/:address')
  .get(/* Account History */)

router 
  .route('/history/range')
  .get(getBlocksInRange)

router.route('/transact').post(bodyParser, transaction)

module.exports = router;
