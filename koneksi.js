var mysql = require('mysql');

//Buat Koneksi Database
const conn= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stipcid12_pasca'
});

conn.connect((err)=>{
    if(err) throw err;
    console.log('mysql terkoneksi');
});

modul.export = conn;