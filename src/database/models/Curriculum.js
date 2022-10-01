module.exports = (sequelize, dataTypes) => {
    let alias = 'Curriculum';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        apellido: {
            type: dataTypes.STRING
        },
        telefono: {
            type: dataTypes.INTEGER
        },
        email: {
            type: dataTypes.STRING
        },
        fechaNacimiento: {
            type: dataTypes.DATE
        },
        localidad: {
            type: dataTypes.STRING
        },
        aplicaPersonal: {
            type: dataTypes.STRING
        },
        experiencia: {
            type: dataTypes.STRING
        },  
        cv: {
            type: dataTypes.STRING
        },
        notasVarias: {
            type: dataTypes.STRING
        },

    };
    let config = {
        tableName: 'curriculums',
        timestamps: false
    };
    const Curriculum = sequelize.define(alias, cols, config)

    return Curriculum

}
