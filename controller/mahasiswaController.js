'use strict';

const response = require('../res');
const connection = require('../koneksi');

exports.index = function(req, res){
    response.ok("Aplikasi Rest API Berjalan",res)
}

//Menampilkan seluruh data mahasiswa
exports.tampilsemua = function(req, res){
    
    connection.query("Select * from mahasiswa", function(error,rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok(rows,res);
        }
    });
}

//Menampilkan seluruh data mahasiswa berdasarkan id
exports.tampilsemuaid = function(req, res){
    let id = req.params.id;
    connection.query("Select * from mahasiswa where mahasiswaid = ?", [id], function(error,rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok(rows,res);
        }
    });
}