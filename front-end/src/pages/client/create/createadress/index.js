import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { GrFormPreviousLink } from 'react-icons/gr';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import './index.css';
import api from '../../../services/api'

class CreateAdress extends Component {

    state = {
        client: {},
        endereco: {
            cep: "",
            endereco: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            estado: "",
            clienteId: ""
        },
        redirect: false
    }

    async componentDidMount(){
        const { id } = this.props.match.params;
        await api.get(`/cliente/${id}`).then(res => {
            var dados = res.data;
            this.setState({ client: res.data });
            console.log(dados);
        })
        .catch(error => 
            console.log(error)    
        )
    }

    render(){
        const { redirect } = this.state;
        const { id } = this.props.match.params;
        
        this.state.endereco.clienteId = id;
        //this.setState({ state.endereco.clienteId: id });
        //this.setState({ endereco.clienteId: id});
        // Correto
   
        
        if(redirect){
            return <Redirect to={`/cliente/${id}`} />
        }else{
            return (
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            Endereço Para: { this.state.client.nome }
                        </div>
                        <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-row">
                                
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputcep">CEP:</label>
                                    <input 
                                        name="cep"
                                        type="text"  
                                        className="form-control" 
                                        id="inputcep" 
                                        placeholder="Ex: 36254562" 
                                        autoComplete="off"
                                        required
                                        value={this.state.endereco.cep}
                                        onChange={this.handleInputChange}                                        
                                    
                                    />
                                    
                                </div> 

                                <div className="form-group col-md-8">
                                    <label htmlFor="inputendereco">Endereço:</label>
                                    <input 
                                        type="text" 
                                        name="endereco"
                                        className="form-control" 
                                        id="inputendereco" 
                                        placeholder="Ex: Rua das Gaivotas" 
                                        autoComplete="off"
                                        required
                                        value={this.state.endereco.endereco}
                                        onChange={this.handleInputChange}                                        
                                        
                                    />
                                </div>

                                <div className="form-group col-md-2">
                                    <label htmlFor="inputnumero">Número:</label>
                                    <input 
                                        type="text"  
                                        name="numero"
                                        className="form-control" 
                                        id="inputnumero" 
                                        autoComplete="off"
                                        placeholder="Ex: 89" 
                                        value={this.state.endereco.numero}
                                        onChange={this.handleInputChange}                                        
                                    
                                    />
                                    <input 
                                        type="hidden" 
                                        name="clienteId" 
                                        className="form-control" 
                                        value={this.state.endereco.clienteId}
                                        onChange={this.handleInputChange}                                       
                                    />
                                </div> 

                            </div>

                            <div className="form-row">

                                <div className="form-group col-md-3">
                                    <label htmlFor="inputcidade">Cidade:</label>
                                    <input 
                                        type="text" 
                                        name="cidade"
                                        className="form-control" 
                                        id="inputcidade" 
                                        autoComplete="off"
                                        placeholder="Ex: Vitória" 
                                        required
                                        value={this.state.endereco.cidade}
                                        onChange={this.handleInputChange}                                        
                                    
                                    />
                                </div> 

                                <div className="form-group col-md-3">
                                    <label htmlFor="inputbairro">Bairro:</label>
                                    <input 
                                        type="text" 
                                        name="bairro"
                                        className="form-control" 
                                        id="inputbairro" 
                                        autoComplete="off"
                                        placeholder="Ex: Santa Lucia" 
                                        required
                                        value={this.state.endereco.bairro}
                                        onChange={this.handleInputChange}                                        
                                    
                                    />
                                </div> 

                                <div className="form-group col-md-3">
                                    <label htmlFor="inputEstado">Estado:</label>
                                    <input 
                                        type="text" 
                                        name="estado"
                                        autoComplete="off"
                                        className="form-control" 
                                        id="inputEstado" 
                                        placeholder="Ex: RJ" 
                                        required
                                        value={this.state.endereco.estado}
                                        onChange={this.handleInputChange}                                        
                                        
                                    />
                                </div>                                                       
                                
                                <div className="form-group col-md-3">
                                    <label htmlFor="inputcomplemento">Complemento:</label>
                                    <input 
                                        type="text" 
                                        name="complemento"
                                        autoComplete="off"
                                        className="form-control" 
                                        id="inputcomplemento" 
                                        placeholder="Ex: Próximo a rotatoria" 
                                        value={this.state.endereco.complemento}
                                        onChange={this.handleInputChange}                                        
                                    
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <Link to={`/cliente`} className="btn btn-secondary">
                                        <GrFormPreviousLink color="fff" /> Voltar
                                    </Link>
                                    <button type="submit" className="btn btn-success float-right">
                                        <AiOutlineCheckCircle /> CADASTRAR
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
            endereco: { ...prevState.endereco, [name]: value }
        }));

    }

    handleSubmit = event => {

        event.preventDefault();        
        fetch('http://192.168.1.105:3003/sistema/endereco', {
            method: 'post',
            body: JSON.stringify(this.state.endereco),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(data => {
                console.log(this.state.endereco)
                if (data.ok) {
                    this.setState({ redirect: true });
                }
        })
        .catch(error =>
                console.log(error)
        );

        
    }


}

export default CreateAdress;