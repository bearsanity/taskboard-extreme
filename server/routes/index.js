const router = require('express').Router();

router.get('/api/health', (req, res) => {
    res.send('Working!')
})

module.exports = router;