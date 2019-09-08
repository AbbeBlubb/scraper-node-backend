const express = require('express');
const router = express.Router();

// Routes. Exported at the end of the file
router.get('/test', function(req, res){
    res.json('hej')
});

module.exports = router;
