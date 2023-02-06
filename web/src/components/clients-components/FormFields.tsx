import { FormFieldsInterface } from "../../interfaces/ClientsPageInterfaces"

export default function FormFields({ handleChange, clientData } : FormFieldsInterface) {
    return (
        <>
            <label htmlFor="name">Nome</label>
            <input type="text"
                id="name"
                name="name"
                onChange={handleChange}
                className="add_user_form--field"
                value={clientData.name} />

            <label htmlFor="email">E-mail</label>
            <input type="text"
                id="email"
                name="email"
                onChange={handleChange}
                className="add_user_form--field"
                value={clientData.email} />

            <label htmlFor="telephone">Telefone</label>
            <input type="tel"
                id="telephone"
                name="telephone"
                maxLength={15}
                onChange={handleChange}
                className="add_user_form--field"
                value={clientData.telephone} />

            <label htmlFor="cpf">CPF</label>
            <input type="text"
                id="cpf"
                name="cpf"
                maxLength={14}
                onChange={handleChange}
                className="add_user_form--field"
                value={clientData.cpf} />

            <label htmlFor="address">Endereço</label>
            <input type="text"
                id="address"
                name="address"
                onChange={handleChange}
                className="add_user_form--field"
                value={clientData.address} />
        </>
    )
}