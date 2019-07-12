var jsonwebtoken = require('jsonwebtoken'); 
const models     = require('./models/index');
const config     = require('./config');
module.exports.applyJwt = function(expressClient) {
    expressClient.use(function(req,res,next){
        try{
            res.setHeader('Access-Control-Allow-Origin', config.frontend_url);
            res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Content-Type, Authorization");
            const token = req.headers.authorization.split(" ")[1];
            jsonwebtoken.verify(token, config.tokenKey, function (err, payload) {
                if (payload) {
                    models.userModel.findById(payload.userId).then(
                        (doc)=>{
                            req.user=doc;
                            next();
                        }
                    )
                } else {
                    next();
                }
            })
        }catch(e){
            next();
        }
    });
}