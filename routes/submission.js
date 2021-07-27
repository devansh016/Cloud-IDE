const express = require('express')
const router = express.Router();
const submissionController = require('../controllers/submission');

router.post('/', compilecode);

function compilecode(req, res, next){
    submissionController.executecode(req.body)
        .then(result=> {
            res.send(result);
        });
}

module.exports = router;