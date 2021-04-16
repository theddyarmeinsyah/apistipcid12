var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('MD5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

//Controller untuk register 
exports.registrasiuser = function(req, res){
    var post = {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password),
        usertype: req.body.usertype,
        statusid: req.body.statusid,
        tanggal_daftar: new Date(),
    }

    var query = "Select email from ?? where ??=?";
    var table = ["users","email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0){
                var query = "Insert into ?? set ?";
                var table = ["users"];
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows){
                    if (error){
                        console.log(error);
                    }else{
                        response.ok("Berhasil menambahkan data user baru", res);
                    }
                })
            }else{
                response.ok("Email sudah terdaftar!", res);
            }
        }
    })
}