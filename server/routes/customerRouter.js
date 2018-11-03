var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json({
        test: "Wellcome customer!"
    });
})

module.exports = router;