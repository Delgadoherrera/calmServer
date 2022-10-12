const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const db = require("../database/models")
const sequelize = db.sequelize;
const Recibo = db.Recibo

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img/img-recibos"));
    },
    filename: (req, file, cb) => {

        const newFilename = "file" + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
        req.session.newFileName = newFilename
    }

});
const upload = multer({ storage })


router.post("/recibos/create", async (req, res) => {
    console.log('req.body', req.body)
    await Recibo.create({
        emisor: req.body.emisor,
        fechaEjecucion: req.body.fechaEjecucion,
        beneficiario: req.body.beneficiario,
        cuitBeneficiario: req.body.cuitBeneficiarion,
        cbuBeneficiario: req.body.cbuBeneficiario,
        referencia: req.body.referencia,
        importe: req.body.importe,
        numeroOperacion: req.body.numeroOperacion, 
        notasVarias: req.body.notasVarias, 
      /*   imagenRecibo: 'http://localhost:4000/img/img-Recibos/' + req.session.newFileName, */
    });

}
)

router.get("/recibos", async (req, res) => {
    console.log('req.body', req.body)

    await Recibo.findAll({
    })
        .then(await function (Recibos) {

            return res.status(200).send({ data: Recibos })
        })

}
)


router.post("/Recibos/edit", async (req, res) => {
    console.log(req.body)
    Recibo
        .update({
            nombre: req.body.name,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            email: req.body.email,
            fechaNacimiento: req.body.date,
            localidad: req.body.country,
            experiencia: req.body.experiencia,
            aplicaPersonal: req.body.oficio,
            notasVarias: req.body.notasVarias
        }, {
            where: { id: req.body.id }
        }
        ).catch(error => res.send(error))
})

router.post("/Recibos/destroy", (req, res) => {
    Recibo.destroy({ where: { id: req.body.id }, force: true })
        .then(() => {
            res.status(200)
        })
})


router.post("/recibos/uploadRecibo/:id", upload.single('file'), (req, res) => {
    console.log('estan llegando Create de facturas', req.body)
    Recibo.update({
        imagenRecibo: 'http://localhost:4000//img/img-recibos/' + req.session.newFileName
    }, { where: { id: req.params.id } })

})




module.exports = router;

