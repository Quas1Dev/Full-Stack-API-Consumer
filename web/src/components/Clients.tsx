import api from "../axiosInstance";
import { useState, useEffect } from 'react';

import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

import Navigation from "./global-components/Navigation"
import AddUserForm from "./clients-components/AddClientForm";
import UpdateUserForm from "./clients-components/UpdateUserForm";
import { Pencil, XCircle } from "phosphor-react";
import { ClientInterface } from "../interfaces/ClientsPageInterfaces";

export default function Clients() {
    const [clients, setClients] = useState<ClientInterface[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isUpdOpen, setIsUpdOpen] = useState<boolean>(false);
    const [isDelConfirmOpen, setIsDelConfirmOpen] = useState<boolean>(false);
    const [userToDelete, setUserToDelete] = useState<string>("")

    const [clientToUpdate, setClientToUpdate] = useState<ClientInterface>({
        name: "",
        email: "",
        address: "",
        telephone: "",
        cpf: "",
        _id: ""
    });

    const fetchClients = async () => {
        const response = await api.get("/read");
        setClients(response.data);
    }

    useEffect(() => {
        fetchClients()
    }, []);

    // Prevent deleting clieng by accident
    function handleClickDelete(_id: string) {
        setIsDelConfirmOpen(previsDelConfirmOpen => !previsDelConfirmOpen)
        setUserToDelete(_id);
    }

    // Delete the user on confirmation
    function handleClickConfirm() {
        const deleteClient = async () => {
            await api.delete("/delete/" + userToDelete);
            fetchClients();
        }
        deleteClient();
        setIsDelConfirmOpen(false);
    }

    // Pass client's info to fill in form that should be changed
    function handleClickUpdate(clientData: ClientInterface) {
        setClientToUpdate(clientData);
        setIsUpdOpen(prevIsUpdOpen => !prevIsUpdOpen);
    }

    // Controles the opening and closing of the 'delete' modal
    function handleOpenCloseModal() {
        setIsOpen(prevOpenModal => !prevOpenModal);
    }

    // Controles the opening and closing of the 'update' modal
    function handleOpenCloseUpd() {
        setIsUpdOpen(prevIsUpdOpen => !prevIsUpdOpen);
    }

    // Controles the opening and closing of the 'delete confirmation' modal
    function handleCloseConfirm() {
        setIsDelConfirmOpen(prevIsDelConfirmOpen => !prevIsDelConfirmOpen);
    }

    return (
        <div className="page_container--clients_page">
            <Navigation />
            <main className=" clients_page--main_content u-page_body">
                <h1 className="main_content--clients_page_title u-title">Clientes</h1>
                <p className="page_content--page_description u-description">A tabela abaixo mostra os dados de clientes que cadastramos em nosso banco de dados hospedado na núvem. Caso nenhum cliente esteja cadastrado, um botão
                    apenas adicione um novo cliente.</p>
                <button className="clients_page--add_user" onClick={handleOpenCloseModal}>Adicionar cliente</button>

                <ReactModal
                    className="clients_page--modal"
                    isOpen={isDelConfirmOpen}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    onRequestClose={handleCloseConfirm}>
                    <p>Tem certeza de que quer deletar esse cliente?</p>
                    <button className="modal--conform_delete" onClick={handleClickConfirm} >Confirmar</button>
                </ReactModal>

                <ReactModal
                    className="clients_page--modal"
                    isOpen={isUpdOpen}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    onRequestClose={handleOpenCloseUpd}>
                    <UpdateUserForm setIsUpdOpen={setIsUpdOpen} fetchClients={fetchClients} clientToUpdate={clientToUpdate} />
                </ReactModal>

                <ReactModal
                    className="clients_page--modal"
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    isOpen={isOpen}
                    onRequestClose={handleOpenCloseModal}
                >
                    <AddUserForm setIsOpen={setIsOpen} fetchClients={fetchClients} />
                </ReactModal>

                <div className="table_wrapper">
                    {clients.length > 0 &&
                        <table className="clients_page--table_clients">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Telefone</th>
                                    <th>E-mail</th>
                                    <th>CPF</th>
                                    <th>Endereço</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map(client => {
                                    return (
                                        <tr key={client.cpf}>
                                            <td>{client.name}</td>
                                            <td>{client.telephone}</td>
                                            <td>{client.email}</td>
                                            <td>{client.cpf}</td>
                                            <td>{client.address}</td>
                                            <td>
                                                <Pencil className="table_clients--edit_btn" onClick={(e) => handleClickUpdate({ ...client })} />
                                                <XCircle className="table_clients--del_btn" onClick={(e) => handleClickDelete(client._id)} />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </main>
        </div>
    )
}