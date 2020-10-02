const Sequelize = require('sequelize');
const sequelize = require('../database/database');
const Cliente = require('../models/cliente');

const Endereco = sequelize.define('enderecos', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    cep: {
        allowNull: false,
        type: Sequelize.STRING(10)
    },
    endereco: {
        allowNull: false,        
        type: Sequelize.STRING
    },
    numero: {
        allowNull: false,        
        type: Sequelize.STRING(10)
    },
    complemento: {        
        type: Sequelize.STRING
    },
    bairro: {
        allowNull: false,        
        type: Sequelize.STRING(50)
    },
    cidade: {
        allowNull: false,        
        type: Sequelize.STRING(100)
    },
    estado: {
        allowNull: false,        
        type: Sequelize.STRING(3)
    }

});

Endereco.belongsTo(Cliente, {
    foreignKey: 'clienteId',
    allowNull: false,
    type: Sequelize.INTEGER,
    onDelete: 'cascade'
});
  




module.exports = Endereco;