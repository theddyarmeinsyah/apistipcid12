const express = require('express');
const app = express();

var morgan = require('morgan');
const bodyParser = require('body-parser');

const mahasiswaRoute = require('./routes/routerMahasiswa');

app.use('/uploads', express.static('uploads'));

//parse aplication / json
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// handle CORS
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (request.method === 'OPTIONS') {
        response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return response.status(200).json({})
    }
    next()
})

//Panggil Router
// var routes = require('./routes');
// routes(app);

app.use('/auth', require('./middleware'));
app.use('/mahasiswa', mahasiswaRoute);

// // handle error
// app.use((request, response, next) => {
//     const error = new Error('Not found')
//     error.status = 404
//     next(error)
// });

// app.use((error, request, response, next) => {
//     response.status(error.status || 500)
//     response.json({
//         error: {
//             message: error.message || 'Server error'
//         }
//     });
// });

app.listen(3000, () => {
    console.log(`Server started on port`);
});
