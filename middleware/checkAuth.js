const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function checkAuth(){
    return function(req, rest, next){
        var role = req.body.role;
        var tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer){
            var token = tokenWithBearer.split(' ')[1];

            //verifikasi
            jwt.verify(token, config.secret, function(err, decoded){
                if(err){
                    return rest.status[401].send({auth: false, message: 'Token tidak terdaftar'});
                }else{
                    if(role == 2){
                        req.auth = decoded;
                        next();
                    }else{
                        return rest.status[401].send({auth: false, message: 'Gagal mengotorisasi role anda!'});
                    }
                }
            });
        }
    }
}

// module.exports = (request, response, next) => {
//     try {
//         const token = request.headers.authorization.split(' ')[1]
//         console.log(token);
//         // const decoded = jwt.verify(token, process.env.JWT_KEY)
//         const decoded = jwt.verify(token)
//         request.userData = decoded
//         next()
//     } catch (error) {
//         return response.status(401).json({
//             status: false,
//             message: 'Auth failed'
//         })
//     }
// }