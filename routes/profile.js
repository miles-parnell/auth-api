const router = require('express').Router();
const verify = require('../routes/verifyToken');

router.get('/profile', verify, (req, res) => {
    res.send('profile page ;)');
});

module.exports = router;