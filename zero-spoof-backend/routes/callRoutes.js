const express = require('express');
const callController = require('../controllers/callController');
const router = express.Router();

router.post('/check', callController.checkSpoofing);
router.post('/log', callController.logCall);
router.get('/logs', callController.getAllCalls);



// ✅ Admin Routes for Managing Blacklist
router.post('/blacklist/add', callController.addToBlacklist);
router.post('/blacklist/remove', callController.removeFromBlacklist);
 //router.get('/blacklist/list', callController);


module.exports = router;


