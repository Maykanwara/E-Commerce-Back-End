const router = require('express').router();
const apiRoutes = require('./api');

router.us('/api', apiRoutes);

router.use((req.res) => {
    res.send("<h1> Is a Wrong Route!!</h1>")
});

module.exports = router;

