import { ChangeEventHandler } from "react";

export interface AddClientFormPropsInterface {
    setIsOpen: Function;
    fetchClients: Function;
}

export interface ClientInterface {
    name: string,
    cpf: string,
    address: string,
    email: string,
    telephone: string,
    _id: string,
    [key: string]: string;
}

export interface UpdateUserFormInterface {
    fetchClients: Function;
    setIsUpdOpen: Function;
    clientToUpdate: ClientInterface;
}

export interface FormFieldsInterface {
    handleChange: ChangeEventHandler<HTMLInputElement>
    clientData: ClientInterface;
}