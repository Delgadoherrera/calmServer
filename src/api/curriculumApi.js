const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const db = require("../database/models")
const sequelize = db.sequelize;
const Curriculum = db.Curriculum

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img/img-curriculums"));
    },
    filename: (req, file, cb) => {

        const newFilename = "file" + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
        req.session.newFileName = newFilename
    }

});
const upload = multer({ storage })


router.post("/usuario/onCv", upload.single('file'), async (req, res) => {


    console.log('req.body', req.body)



    await Curriculum.create({
        nombre: req.body.name,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        email: req.body.email,
        fechaNacimiento: req.body.date,
        localidad: req.body.country,
        experiencia: req.body.experiencia,
        aplicaPersonal: req.body.oficio,
        cv: 'http://localhost:4000/img/img-curriculums/' + req.session.newFileName,
    });

}
)



router.get("/usuario/onCv", async (req, res) => {
    console.log('req.body', req.body)

    await Curriculum.findAll({
    })
    .then(await function (curriculums) {
   
        return res.status(200).send({ data: curriculums })
    })

}
)


router.post("/curriculums/edit", async (req, res) => {
    console.log(req.body)
    Curriculum
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

router.post("/curriculums/destroy", (req, res) => {
    Curriculum.destroy({ where: { id: req.body.id }, force: true })
        .then(() => {
            res.status(200)
        })
})

module.exports = router;

