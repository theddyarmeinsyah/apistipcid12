var connection = require('../koneksi');
var mysql = require('mysql');
var md5x = require('MD5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

//Controller untuk register 
exports.registrasiuser = function(req, res){
    var post = {
        name: req.body.name,
        email: req.body.email,
        password: md5x(req.body.password),
        usertype: req.body.usertype,
        statusid: req.body.statusid,
        userlinkid : req.body.userlinkid,
        created_at: req.body.created_at
    }

    var query = "Select email from ?? where ??=?";
    var table = ["usersx","email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0){
                var query = "Insert into ?? set ?";
                var table = ["usersx"];
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

exports.loginuser = function(req, res){
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    // console.log(post.password);

    var query = "Select * from ?? where ??=? AND ??=?";
    var table = ["usersx", "password", md5x(post.password), "email", post.email];

    query = mysql.format(query, table);
    connection.query(query, function(error, rows){
        if (error){
            console.log(error);
        }else{
            if (rows.length == 1){
                    var token = jwt.sign({rows}, config.secret,{
                        expiresIn: 1440
                });

                id_users= rows[0].id;

                var data = {
                    id_user: id_users,
                    access_token: token,
                    ip_address: ip.address()
                }

                var query = "Insert into ?? set ?";
                var table = ["usersx_access_token"];

                query = mysql.format(query,table);
                connection.query(query,data, function(error, rows){
                    if (error){
                        console.log(error);
                    }else{
                        res.json({
                            success: true,
                            message: 'Token JWT Tergenerate!',
                            token: token,
                            currUser: data.id_user
                        });
                    }
                });
            }else{
                 res.json({"error": true, "Message":"Email atau Password salah"});
            }
        }
    });
}