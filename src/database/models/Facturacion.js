module.exports = (sequelize, dataTypes) => {
    let alias = 'Facturacion';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numeroFactura: {
            type: dataTypes.INTEGER
        },
        idPaciente: {
            type: dataTypes.INTEGER
        },
        fechaFactura: {
            type: dataTypes.DATE
        },
        valor: {
            type: dataTypes.INTEGER
        },
        notasVarias: {
            type: dataTypes.STRING
        },
        imagenFactura: {
            type: dataTypes.STRING
        },
        status: {
            type: dataTypes.STRING
        },
    };
    let config = {
        tableName: 'facturacion',
        timestamps: false
    };
    const Facturacion = sequelize.define(alias, cols, config)

    return Facturacion

}
