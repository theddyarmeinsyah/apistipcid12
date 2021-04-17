'use strict';

var express = require('express');
var router = express.Router();

// const checkAuth = require('../middleware/verifikasi');
// console.log(checkAuth);

const mahasiswaController = require('../controller/mahasiswaController');
const verifikasi = require("../middleware/verifikasi");


router.get('/api/v1/tampil', verifikasi(), mahasiswaController.tampilsemua);
router.get('/api/v1/tampilsemua/:id', verifikasi(), mahasiswaController.tampilsemuaid);

module.exports = router;

// module.exports = function(app){
//     var json = require('./controller');

//     app.route('/')
//     .get(json.index);

//     app.route('/tampil').get(json.tampilsemua);
// };

