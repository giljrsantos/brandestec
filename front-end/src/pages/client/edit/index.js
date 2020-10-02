import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { GrFormPreviousLink } from 'react-icons/gr';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import './index.css';
import api from '../../services/api';

class Edit extends Component {

    state = {
        cliente: {
            nome: "",
            cnpj_cpf: "",
            ie_rg: "",
            observacao: ""            
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

        if (redirect) {
            return <Redirect to="/cliente" />
        } else {
            return (
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>Atualizar Cliente</h2>
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
                                                minLength="5"
                                                maxLength="100"
                                                autoComplete="off"
                                                required
                                                value={this.state.cliente.nome}
                                                onChange={this.handleInputChange}
                                            />                                       
                                    </div>   
                                </div>

                                <div className="row" >
                                    <div className="col">
                                        <label htmlFor="cnpj_cpf">CNPJ/CPF:</label>
                                        <input
                                            type="text"
                                            name="cnpj_cpf"
                                            id="cnpj_cpf"
                                            className="form-control"
                                            placeholder="Informe o CNPJ/CPF"
                                            minLength="11"
                                            maxLength="14"
                                            autoComplete="off"
                                            required
                                            value={this.state.cliente.cnpj_cpf}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                    </div>
                                    <div className="row" >
                                    <div className="col">
                                        <label htmlFor="ie_rg">IE/RG:</label>
                                        <input
                                            type="text"
                                            name="ie_rg"
                                            id="ie_rg"
                                            className="form-control"
                                            placeholder="Informe o CNPJ/CPF"
                                            minLength="3"
                                            maxLength="14"
                                            autoComplete="off"
                                            required
                                            value={this.state.cliente.ie_rg}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>                                    
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="observacao">Observação:</label>
                                        <textarea
                                            name="observacao"
                                            id="observacao"
                                            className="form-control"
                                            placeholder="Informe uma observação do cliente"
                                            onChange={this.handleInputChange}
                                            value={this.state.cliente.observacao}
                                        >
                                            
                                        </textarea>                                        
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <Link to={`/cliente`} className="btn btn-secondary btn-sm">
                                            <GrFormPreviousLink color="fff" /> Voltar
                                        </Link>                                        
                                        <button type="submit" className="btn btn-success btn-sm">
                                         <AiOutlineCheckCircle /> ATUALIZAR
                                        </button>
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
                    this.setState({ redirect: true });
                }
            })
            .catch(error =>
                console.log(error)
            );

        event.preventDefault();
    }


}

export default Edit;