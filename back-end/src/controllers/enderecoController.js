const Endereco = require('../models/endereco');
const status = require('http-status');

exports.Insert = (req, res, next) => {

     //recuperando os valores das propriedades
    const { cep, endereco, numero, complemento, bairro, cidade, estado, clienteId } = req.body;

    //insert no banco de dados
    Endereco.create({

        cep: cep,
        endereco: endereco,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        clienteId: clienteId,

    })
    .then((endereco) => {
        if(endereco){
            res.status(status.OK).send(endereco);
        }else{
            res.status(status.NOT_FOUND).send();
        }
    })
    .catch(error => next(error));
};

//Select todos os enderecos da empresa
exports.SelectAllAdress = (req, res, next) => {
    const { id } = req.params;
    Endereco.findAll({
        where: { clienteId: id }
    })
    .then(endereco => {
            if (endereco) {
                res.status(status.OK).send(endereco);
            }
        })
        .catch(error => next(error));
};

//Select um enderecos da empresa
exports.SelectOnAdress = (req, res, next) => {
    const { id } = req.params;
        Endereco.findByPk(id)
        .then(endereco => {
            if (endereco) {
                res.status(status.OK).send(endereco);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};


//Update Endereço
exports.Update = (req, res, next) => {
    const { id } = req.params;
    const { cep, endereco, numero, complemento, bairro, cidade, estado, clienteId } = req.body;

    Endereco.findByPk(id)
        .then(updateAdress => {
            if (updateAdress) {
                Endereco.update({
                    cep: cep,
                    endereco: endereco,
                    numero: numero,
                    complemento: complemento,
                    bairro: bairro,
                    cidade: cidade,
                    estado: estado,
                    clienteId: clienteId
                }, { where: { id: id } })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

//Delete Endereço
exports.Delete = ( req, res, next) => {
    const { id } = req.params;

    Endereco.findByPk(id)
        .then(deleteAdess => {
            if(deleteAdess){
                Endereco.destroy({
                    where: { id: id }
                })
                .then( () => {
                    res.status(status.OK).send();
                })
                .catch(error => next(error));
            }else{
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};