import FormFields from "./FormFields";
import { FormEvent, ChangeEvent, useState } from 'react';
import { maskCpf, maskTelephone } from "../../utils/masks";
import { AddClientFormPropsInterface, ClientInterface } from "../../interfaces/ClientsPageInterfaces";
import validate, { isEmpty } from "../../utils/validation";
import api from "../../axiosInstance";

export default function AddClientForm({ setIsOpen, fetchClients }: AddClientFormPropsInterface) {

    const [clientFormData, setClientFormData] = useState<ClientInterface>({
        name: "",
        email: "",
        address: "",
        telephone: "",
        cpf: "",
        _id: ""
    })

    const [imcorrectForm, setIncorrectForm] = useState<boolean>(false)

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const empty: boolean = isEmpty(clientFormData);
        const isValid = validate(clientFormData);

        if (!empty && isValid) {
            const addUser = async () => {
                const response = await api.post("/add", clientFormData);
                setIsOpen(false);
                fetchClients()
            }

            addUser();
        } else {
            setIncorrectForm(true);
        }
    }


    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let { name, value } = e.target;

        if (name == "telephone") {
            value = maskTelephone(value);
        } else if (name == "cpf") {
            value = maskCpf(value);
        }

        setClientFormData(prevClientFormData => {
            return {
                ...prevClientFormData,
                [name]: value
            }
        })

    }

    return (
        <>
            <span className="modal_add_user--add_user_form_warning" style={{
                display: imcorrectForm ? "block" : "none"
            }}>Por favor, preencha todos os campos com dados válidos!</span>

            <form action="" className="modal_add_user--add_user_form" onSubmit={handleSubmit}>
                <FormFields handleChange={handleChange} clientData={clientFormData} />
                <button className="add_user_form--submit">Adicionar</button>
            </form>
        </>
    )
}