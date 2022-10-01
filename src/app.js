const express = require('express');
const path = require('path');
const cors = require('cors');
const userApi = require('./api/userApi');
const curriculumApi = require ('./api/curriculumApi')
const pacientes=require('./api/pacientesApi')
const personal=require('./api/personalApi')
const session = require('express-session');
const app = express();
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(session({ secret: 'Calm Salute' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/', userApi);
app.use('/', curriculumApi);
app.use('/', pacientes);
app.use('/', personal);

app.listen(4000, () => {
    console.log("Servidor corriendo correctamente en http://localhost:4000/")

});