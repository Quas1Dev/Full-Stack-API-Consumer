import FormFields from "./FormFields";
import { ChangeEvent, FormEvent, useState } from "react";
import { UpdateUserFormInterface, ClientInterface } from "../../interfaces/ClientsPageInterfaces";
import api from "../../axiosInstance";

export default function UpdateUserForm({ fetchClients, setIsUpdOpen, clientToUpdate }: UpdateUserFormInterface) {
    const [clientData, setClientData] = useState<ClientInterface>({ ...clientToUpdate });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target;

        setClientData(prevClientData => ({
            ...prevClientData,
            [name]: value
        }))
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("Submitting");
        const updateClient = async () => {
            console.log("id: ",clientData._id)
            await api.put("/update/" + clientData._id, {
                ...clientData
            });

            fetchClients()
            setIsUpdOpen(false);
        }

        updateClient();
    }

    return (
        <>
            <form action="" className="modal_add_user--update_user_form" onSubmit={handleSubmit}>
                <FormFields handleChange={handleChange} clientData={clientData} />
                <button className="add_user_form--submit">Atualizar</button>
            </form>
        </>

    )
}