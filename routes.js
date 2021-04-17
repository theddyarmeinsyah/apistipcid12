'use strict';

module.exports = function(app){
    var json = require('./controller');

    app.route('/').get(json.index);

    app.route('/tampil').get(json.tampilsemua);
    app.route('/tampil/:id').get(json.tampilsemuaid);
};