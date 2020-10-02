const Sequelize = require('sequelize');
const sequelize = require('../database/database');

    const Cliente = sequelize.define('clientes', {

        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nome: {
            allowNull: false,
            type: Sequelize.STRING,
            validate: {
                len: [5, 100]
            }
        }, cnpj_cpf: {
            type: Sequelize.STRING
        },
        ie_rg: {
            type: Sequelize.STRING
        },
        ativo: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        observacao: {
            type: Sequelize.TEXT
        }

    });

    Cliente.associate = models => {
        Cliente.hasMany(models.Endereco, { 
            foreignKey: 'clienteId',
            onDelete: 'cascade',
            allowNull: false
         });
        Cliente.hasMany(models.email, { 
            foreignKey: 'clienteId',
            onDelete: 'cascade',
            allowNull: false
         });
        Cliente.hasMany(models.telefone, { 
            foreignKey: 'clienteId',
            onDelete: 'cascade',
            allowNull: false
        });
    };

    module.exports =  Cliente;


/* Cliente.associate = (models) => {
    Cliente.hasMany(models.email, { foreignKey: 'clienteId' });
    Cliente.hasMany(models.endereco, { foreignKey: 'clienteId' });
    Cliente.hasMany(models.telefone, { foreignKey: 'clienteId' });
};
 */


//module.exports = Cliente;
