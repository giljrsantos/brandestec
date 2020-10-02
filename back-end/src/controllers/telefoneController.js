const Telefone = require('../models/telefone');
const status = require('http-status');

exports.Insert = (req, res, next) => {
     //recuperando os valores das propriedades
    const { telefone, clienteId } = req.body;

    //insert no banco de dados
    Telefone.create({

        telefone: telefone,
        clienteId: clienteId

    })
    .then((telefone) => {
        if(telefone){
            res.status(status.OK).send(telefone);
        }else{
            res.status(status.NOT_FOUND).send();
        }
    })
    .catch(error => next(error));
};

//Select todos os telefone do cliente
exports.SelectAllPhone = (req, res, next) => {
    const { id } = req.params;
    Telefone.findAll({
        where: { clienteId: id }
    })
    .then(telefone => {
            if (telefone) {
                res.status(status.OK).send(telefone);
            }
        })
        .catch(error => next(error));
};

//Select um Telefone da empresa
exports.SelectOnPhone = (req, res, next) => {
    const { id } = req.params;
        Telefone.findByPk(id)
        .then(telefone => {
            if (telefone) {
                res.status(status.OK).send(telefone);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};


//Update Telefone
exports.Update = (req, res, next) => {
    const { id } = req.params;
    const { telefone, clienteId } = req.body;
    
    Telefone.findByPk(id)
        .then(updatePhone => {
            if(updatePhone){
                Telefone.update({
                    telefone: telefone,
                    clienteId: clienteId 
                }, { where: { id: id } })
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

//Delete Telefone
exports.Delete = ( req, res, next) => {
    const { id } = req.params;

    Telefone.findByPk(id)
        .then(deletePhone => {
            if(deletePhone){
                Telefone.destroy({
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