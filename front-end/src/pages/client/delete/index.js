import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { GrFormPreviousLink } from 'react-icons/gr';
import { MdDeleteForever } from 'react-icons/md';
import { ImUserCheck } from 'react-icons/im';
import './index.css';
import api from '../../services/api';

class InativarCliente extends Component {

    state = {
        cliente: {
            ativo: ""
        },
        redirect: false
    }

    async componentDidMount(){

        const { id } = this.props.match.params;

            await api.get(`/cliente/${id}`)
                .then( resp => {
                    var dataClient = resp.data;
                    console.log(dataClient);
                    this.setState({ cliente: resp.data });
                })
                .catch(error => 
                    console.log(error)
                )

    }
    
    render() {
        const { redirect } = this.state;
    
        if(redirect){
            return <Redirect to="/cliente" />
        } else {
            return (

                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <h3>Desativar Cliente</h3> 
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                            
                                <div className="row">
                                    <div className="col">
                                            <label htmlFor="nome">Nome:</label>
                                            <input
                                                type="text"
                                                name="nome"
                                                id="nome"
                                                className="form-control"
                                                placeholder="Nome Completo"
                                                required
                                                readOnly
                                                value={this.state.cliente.nome}
                                                onChange={this.handleInputChange}
                                            /> 

                                            <input
                                                type="hidden"
                                                name="id"
                                                required
                                                value={this.state.cliente.id}
                                                onChange={this.handleInputChange}
                                            />

                                    </div>
                                       
                                </div>

                                <div className="row">
                                    <div className="col">
                                            <label htmlFor="ativo">Situação:</label>
                                            <select name="ativo" id="ativo" className="form-control" required onChange={this.handleInputChange}>
                                                <option value="#">Selecione a Situação</option>
                                                <option value="0">Desativado</option>
                                                <option value="1">Ativo</option>                                              
                                            </select>                                      
                                    </div>   
                                </div>                                

                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        
                                        <Link to={`/cliente`} className="btn btn-secondary btn-sm">
                                            <GrFormPreviousLink color="fff" /> Voltar
                                        </Link>
                                        {this.state.cliente.ativo === true ?<button type="submit" className="btn btn-warning btn-sm"><MdDeleteForever color="fff" /> Desativar</button> : <button type="submit" className="btn btn-success btn-sm"><ImUserCheck color="fff" /> Ativar</button>}
                                    </div>                                    
                                </div>
                            
                        </form>

                        </div>
                    </div>

                </div>                


            );
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            cliente: { ...prevState.cliente, [name]: value }
        }));
    }

    handleSubmit = event => {

        event.preventDefault();

        const { id } = this.props.match.params;
        fetch(`http://192.168.1.105:3003/sistema/cliente/${id}`, {
            method: 'put',
            body: JSON.stringify(this.state.cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                if (data.ok) {
                    console.log(this.state.cliente.ativo);
                    this.setState({ redirect: true });
                }
            })
            .catch(error =>
                console.log(error)
            );

        
    }    
    

}

export default InativarCliente;