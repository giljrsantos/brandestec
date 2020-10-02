import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever, MdEmail } from 'react-icons/md';
import { GrFormPreviousLink } from 'react-icons/gr';
import { FiPhoneCall } from 'react-icons/fi';
import { FaMapSigns } from 'react-icons/fa';
import api from '../../services/api'
import './index.css';

class Detail extends Component {

    state = {
        client: {},
        adress: [],
        phone: [],
        email: [],
        cademail: {
            email: "",
            clienteId: ""
        },
        telefone: {
            telefone: "",
            clienteId: ""
        },
        redirect: false
    };

    async componentDidMount() {
        const { id } = this.props.match.params;

        //BUSCA O CLIENTE PASSADO PELO PROPS
        await api.get(`/cliente/${id}`).then(cli => {
            var dataCli = cli.data
            this.setState({ client: cli.data });
            console.log(dataCli);
        })
        .catch(error =>
            console.log(error)
        );

        //BUSCA TODOS OS ENDERECOS DO CLIENTE DO PROPS
        await api.get(`/endereco/${id}`).then(adress => {
            var dataAdress = adress.data;
            this.setState({ adress: adress.data });
            console.log(dataAdress);
        })
        .catch(error =>
            console.log(error)
        );

        //BUSCA TODOS OS TELEFONE DO CLIENTE DO PROPS
        await api.get(`/telefone/${id}`).then(phone => {
            var dataPhone = phone.data;
            this.setState({ phone: phone.data });
            console.log(dataPhone);
        })
        .catch(error =>
            console.log(error)
        );

        //BUSCA TODOS OS EMAIL DO CLIENTE DO PROPS
        await api.get(`/email/${id}`).then(email => {
            var dataEmail = email.data;
            this.setState({ email: email.data });
            console.log(dataEmail);
        })
        .catch(error =>
            console.log(error)
        );        


    }

    render() {
        const { client, adress, phone, email } = this.state;
        //const { redirect } = this.state;
        const { id } = this.props.match.params;
        this.state.telefone.clienteId = id;
        this.state.cademail.clienteId = id;

       
            return (
                <div className="client-info">
                    <article>
                        <div className="row">
                            <div className="col-md-3"><strong>Nome: </strong> <span>{client.nome}</span></div>
                            <div className="col-md-3"><strong>CNPJ/CPF: </strong> <span>{client.cnpj_cpf}</span></div>
                            <div className="col-md-3"><strong>IE/RG: </strong> <span>{client.ie_rg}</span></div>
                            <div className="col-md-3"><span>{client.ativo === true ? 'Ativo' : 'Desativado'}</span></div>
                        </div>
                        <div className="row observacao">
                            <div className="col w-100">{client.observacao}</div>
                        </div>

                        <div className="link">
                            <div className="col-md-4">
                                <Link to={`/cliente`}><GrFormPreviousLink size={35} color="green" />
                                    Voltar
                                </Link>
                                <Link to="" data-toggle="modal" data-target="#ModalCadastroTelefone"><FiPhoneCall size={35} color="green" />
                                    Telef.
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Link to={`/endereco/${client.id}`}><FaMapSigns size={35} color="green" />
                                    End.
                                </Link>
                                <Link to="" data-toggle="modal" data-target="#ModalCadastroEmail"><MdEmail size={35} color="green" />
                                    Email
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Link to={`/editar/${client.id}`}><FaEdit size={35} color="orange" />
                                    Editar
                                </Link>
                                <Link to={`/delete/${client.id}`}><MdDeleteForever size={35} color="f00" />
                                    Dastivar
                                </Link>
                            </div>
                        </div>
                        
                        {/*INICIO MODAL CADASTRO DE TELEFONE*/}
                        <div className="modal fade" id="ModalCadastroTelefone" tabindex="-1" role="dialog" aria-labelledby="ModalCadastroTelefoneTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenterTitle">Cadastrar Telefone</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                    <div className="modal-body">
                                        <form onSubmit={this.handleSubmitPhone}>
                                            <div className="form-group row">
                                                <label htmlFor="telefone" className="col-form-label">Telefone:</label>
                                                <div className="col-md-10">
                                                <input type="text" name="telefone" className="form-control" required minLength="10" id="telefone" value={this.state.telefone.telefone} onChange={this.handleInputChangePhone} />
                                                <input type="hidden" name="clienteId" className="form-control"  value={this.state.telefone.clienteId} onChange={this.handleInputChangePhone} />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                                <button type="submit" className="btn btn-success">Cadastrar</button>
                                            </div>                                        
                                        </form>                                
                                    </div>

                                </div>
                            </div>
                        </div>                    
                        {/*FIM MODAL CADASTRO DE TELEFONE*/}

                        {/*INICIO MODAL CADASTRO DE E-MAIL*/}
                        <div className="modal fade" id="ModalCadastroEmail" tabindex="-1" role="dialog" aria-labelledby="ModalCadastroEmailTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenterTitle">Cadastrar E-mail</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                    <div className="modal-body">
                                        <form onSubmit={this.handleSubmitEmail}>
                                            <div className="form-group row">
                                                <label htmlFor="email" className="col-form-label">E-mail:</label>
                                                <div className="col-md-10">
                                                <input type="text" name="email" className="form-control" required minLength="10" id="email" value={this.state.cademail.email} onChange={this.handleInputChangeEmail} />
                                                <input type="hidden" name="clienteId" className="form-control"  value={this.state.cademail.clienteId} onChange={this.handleInputChangeEmail} />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                                <button type="submit" className="btn btn-success">Cadastrar</button>
                                            </div>                                        
                                        </form>                                
                                    </div>

                                </div>
                            </div>
                        </div>                    
                        {/*FIM MODAL CADASTRO DE E-MAIL*/}                    

                    </article>

                        {/* //MAP ENDERCO */}
                        {adress.map(adres => (
                            <article key={adres.id}>
                                <div className="form-row endereco1">
                                    <div className="col-md-12">
                                        <p>{adres.cep} - {adres.endereco}, {adres.numero}</p>
                                    </div>
                                    <div className="col-md-12">
                                        <p>{adres.bairro}, {adres.cidade}, {adres.estado}</p>
                                    </div>                                                                       
                                    <div className="col-md-12">
                                        <p>{adres.complemento}</p>
                                    </div> 
                                    <div className="link">
                                        <Link to={`/editar/${adres.id}`}><FaEdit size={35} color="orange" /></Link>
                                        <Link to={`/enderecoone/${adres.id}`}><MdDeleteForever size={35} color="f00" /></Link>
                                    </div>                                                                                                            
                                </div>                          
                            </article>
                        ))}

                        {/* //MAP TELEFONE */}
                        
                            <article>
                            {phone.map(phon => (
                                <div key={phon.id} className="form-row telefone">
                                    {phon.telefone}
                                    <Link to={`/telefoneone/${phon.id}`}><MdDeleteForever size={25} color="f00" /></Link>
                                </div> 
                            ))}                            
                            </article>
                        

                        {/* //MAP EMAIL */}
                        
                            <article>
                            {email.map(emai => (
                                <div key={emai.id} className="form-row email">
                                    {emai.email}
                                    <Link to={`/emailone/${emai.id}`}><MdDeleteForever size={35} color="f00" /></Link>
                                </div>
                            ))}                                                             
                            </article>
                                                                 
                    
                </div>

            );

        
    }

    /*INICIO HANDLER CADASTRO TELEFONE*/
    handleInputChangePhone = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            telefone: { ...prevState.telefone, [name]: value }
        }));

    }

    handleSubmitPhone = event => {

        event.preventDefault();        
        fetch('http://192.168.1.102:3003/sistema/telefone', {
            method: 'post',
            body: JSON.stringify(this.state.telefone),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(data => {
                console.log(this.state.telefone)
                if (data.ok) {
                    this.setState({ redirect: true });
                    alert('TELEFONE CADASTRADO COM SUCESSO!');
                    const { id } = this.props.match.params;
                    window.location = `/cliente/${id}`
                }
        })
        .catch(error =>
                console.log(error)
        );

        
    }
     /*FIM HANDLER CADASTRO TELEFONE*/   

    /*INICIO HANDLER CADASTRO E-MAIL*/
    handleInputChangeEmail = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            cademail: { ...prevState.cademail, [name]: value }
        }));

    }

    handleSubmitEmail = event => {

        event.preventDefault();        
        fetch('http://192.168.1.105:3003/sistema/email', {
            method: 'post',
            body: JSON.stringify(this.state.cademail),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(data => {
                console.log(this.state.cademail)
                if (data.ok) {
                    this.setState({ redirect: true });
                    alert('E-MAIL CADASTRADO COM SUCESSO');
                    const { id } = this.props.match.params;
                    window.location = `/cliente/${id}`
                }
        })
        .catch(error =>
                console.log(error)
        );

        
    }
     /*FIM HANDLER CADASTRO EMAIL*/    

}

export default Detail;