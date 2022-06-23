const express = require('express');
const db = require('../../db');
const createData = require('./createData_controller');

const router = express.Router();

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// router.get('/', uploads.findAll);
router.post('/create', createData.create);
router.post('/update', createData.update);
router.post('/delete', createData.delete);
router.get('/getEvent', createData.getEvent);
router.get('/get', createData.get);

// router.put('/', uploads.update);
// router.delete('/', uploads.delete);

module.exports = router;