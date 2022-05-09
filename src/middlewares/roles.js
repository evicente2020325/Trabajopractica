exports.Admin = function(req, res, next) {
    if(req.user.rol !== "ADMINISTRADOR") return res.status(403).send({mensaje: "Solo puede acceder el Administrador"})
    
    next();
}

exports.Usuario = function(req, res, next) {
    if(req.user.rol !== "TORNEO") return res.status(403).send({mensaje: "Solo puede acceder el usuario"})
    
    next();
}