import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { GrFormPreviousLink } from 'react-icons/gr';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import './index.css';

class CreateClient extends Component {

    state = {
        cliente: {
            nome: "",
            cnpj_cpf: "",
            ie_rg: "",
            ativo: "true",
            observacao: ""
        },
        redirect: false
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
                            <h2>Cadastrado Cliente</h2>
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
                                            placeholder="Informe o IE/RG"
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
                                            value={this.state.cliente.observacao}
                                            onChange={this.handleInputChange}
                                        >
                                            {this.state.cliente.observacao}
                                        </textarea>                                        
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <Link to={`/cliente`} className="btn btn-secondary btn-sm">
                                            <GrFormPreviousLink color="fff" /> Voltar
                                        </Link>                                        
                                        <button type="submit" className="btn btn-success btn-sm">
                                        <AiOutlineCheckCircle /> CADASTRAR
                                        </button>
                                    </div>                                    
                                </div>
                                
                                
{/*                                 <div className="client-insert">
                                    <label>
                                        <input
                                            type="radio"
                                            name="ativo"
                                            value="true"
                                            checked={this.state.cliente.ativo === "true"}
                                            onChange={this.handleInputChange}
                                        />
                                        Ativo
                                    </label>

                                    <label>
                                        <input
                                            type="radio"
                                            name="ativo"
                                            value="false"
                                            checked={this.state.cliente.ativo === "false"}
                                            onChange={this.handleInputChange}
                                        />
                                        Inativo
                                    </label>

                                </div> */}

                            
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
        fetch('http://192.168.1.105:3003/sistema/cliente', {
            method: 'post',
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


export default CreateClient;