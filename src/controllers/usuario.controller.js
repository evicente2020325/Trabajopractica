const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function usuarioPorDefecto() {
    var modeloUsuarios = new Usuario;
    Usuario.find({nombre: 'ADMIN'},(err, usuarioSim) => {
        if(usuarioSim.length > 0) {
            console.log("el usuario ya existe");
        }else{ bcrypt.hash('deportes123', null, null, (err, password) => {

            modeloUsuarios.nombre = 'ADMIN';
            modeloUsuarios.password = password;
            modeloUsuarios.rol = 'ADMINISTRADOR';

            modeloUsuarios.save((err, usuarioSim) => {
                console.log({usuarioSim: usuarioSim});
            })
        })   
        }
    })
}

function Login(req, res) {
    var parametros = req.body;
    Usuario.findOne({ nombre : parametros.nombre}, (err, usuarioEncontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if (usuarioEncontrado){
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, verificacionPassword) => {
                    if (verificacionPassword) {
                        return res.status(200)
                            .send({ token: jwt.crearToken(usuarioEncontrado)})
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'La contrasena no coincide.'})
                    }
                })
        }
    })
}

function Registrar(req, res){
    const modeloUsuarios = new Usuario();
    var parametros = req.body;

    bcrypt.hash('123456', null, null, (err, password) => {

        if(parametros.nombre){  

            Usuario.find({nombre: modeloUsuarios.nombre}, (err, usuarioEncontrado)=>{
                if(usuarioEncontrado.length == 0){
                 modeloUsuarios.nombre = parametros.nombre,
                 modeloUsuarios.password = password,
                 modeloUsuarios.rol = 'USUARIO'
     
                 modeloUsuarios.save((err, usuarioGuardado)=>{
                     if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
                     return res.status(200).send({usuario: usuarioGuardado})
                 })
                }else{
                 return res.status(500).send({mensaje: 'Este usuario ya existe'})
                }
            })

        }
        
    })
}


module.exports = {
    usuarioPorDefecto,
    Login,
    Registrar
}