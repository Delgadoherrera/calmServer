module.exports = (sequelize, dataTypes) => {
    let alias = 'Recibo';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        emisor: {
            type: dataTypes.STRING
        },
        fechaEjecucion: {
            type: dataTypes.DATE
        },
        beneficiario: {
            type: dataTypes.STRING
        },
        cuitBeneficiario: {
            type: dataTypes.INTEGER
        },
        cbuBeneficiario: {
            type: dataTypes.INTEGER
        },
        referencia: {
            type: dataTypes.STRING
        },
        importe: {
            type: dataTypes.INTEGER
        },
        numeroOperacion: {
            type: dataTypes.INTEGER
        },
        imagenRecibo: {
            type: dataTypes.STRING
        },
        notasVarias: {
            type: dataTypes.STRING
        },
    };
    let config = {
        tableName: 'recibos',
        timestamps: false
    };
    const Recibo = sequelize.define(alias, cols, config)

    return Recibo

}
