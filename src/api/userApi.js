const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const db = require("../database/models")
const bcryptjs = require('bcryptjs');
const User = db.User;


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img/img-usuarios"));
    },
    filename: (req, file, cb) => {
        /*    console.log(file); */
        const newFilename = "file" + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
        req.session.newFileName = newFilename
    }

});
const upload = multer({ storage })




//API REACT
//LOGIN PROCESS


router.post("/usuario/login", async (req, res) => {
    console.log(req.body)
    let emailVerify = req.body.email
    let password = req.body.password
    const find = await User.findOne({
        where: {
            email: emailVerify,
        }
    })
        .then(await function (usuario) {
            if (usuario) {
                let dbPassword = usuario.password;
                let key = bcryptjs.compareSync(password, dbPassword);
                User.findOne({
                    where: {
                        email: emailVerify,
                        password: key
                    }
                }).then(function () {
                    if (emailVerify === usuario.email && key == true) {

                        return res.status(200).send(usuario)
                    }
                    else if (emailVerify === usuario.email && key == false) {
                        // contraseña incorrecta == 1
                        return res.status(400).send('invalid password')
                    }

                }).catch((error) => {
                    /* console.log('error catch' + error) */
                })

            }
            //El mail no se encuentra ==3
            else {
                return res.status(400).send('No se encuentra el email')
            }
        });

}
)

router.post("/usuario/register", async (req, res) => {
    console.log(req.body)
    await User.create({
        nombre: req.body.name,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 10),
        tipoUsuario: 2

    });

    await User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function (usuario) {
        return res.status(200).send(usuario);
    }).catch(err => { console.log(err) })
}
)



router.post("/usuario/register/login", (req, res) => {
    res.header('Access-Control-Allow-Origin', "*");
    let emailVerify = req.body.email
    User.findOne({
        where: {
            email: emailVerify,
        }
    })
        .then(function (usuario) {
            if (usuario) {
                console.log('aqui' + usuario)
                return res.status(200).send(usuario)
            }
            else if (!usuario) {
                console.log('error')
                return res.status(400)
            }
        }).catch((error) => {
            console.log('error catch' + error)
        })
}
)

module.exports = router;

