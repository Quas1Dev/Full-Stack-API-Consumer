import { Request, Response } from 'express';
import ModelForClient from '../models/ClientsData';

// Adds clients
async function add(req: Request, resp: Response) {
    const { name, email, telephone, cpf, address } = req.body;

    // Prevent duplicate client
    const client = await ModelForClient.findOne({ cpf });

    // Warn client already exists
    if (client) {
        return resp.status(409).json({
            error: "Duplicate client",
            message: "A client with the same CPF already exists."
        });
    }

    const newClient = new ModelForClient({
        name,
        cpf,
        email,
        telephone,
        address,
    });

    // Save doc if possible
    try {
        const savedDoc = await newClient.save();
        return resp.json({ userAdded: true });
    } catch (err: any) {
        return resp.status(500).json({
            err: "Failed to add client",
            message: err.message
        });
    }
}

// Load clients
async function read(req: Request, resp: Response) {
    try {
        const clients = await ModelForClient.find({});
        return resp.json(clients);
    } catch (err: any) {
        return resp.status(500).json({
            err: "Failed to load client.",
            message: err.message
        })
    }
}

// Delete client based on its ID
async function del(req: Request, resp: Response) {
    const id = req.params.id;

    try {
        const client = await ModelForClient.findOneAndDelete({ _id: id });
        if (!client) {
            return resp.status(404).json({
                message: "Client not found! There must exist one client matching the provided ID",
            })
        }
        return resp.json(client);
    } catch (err: any) {
        return resp.status(500).json({
            err: "Failed to delete client.",
            message: err.message,
        })
    }
}

// Update client based on its ID
async function update(req: Request, resp: Response) {
    const id = req.params.id;
    const { cpf, email, telephone, address, name } = req.body;
    try {
        const client = await ModelForClient.findById(id);

        if (!client) return resp.status(404).json({
            message: "Client not found! There must exist one client matching the provided ID",
        });

        // Update client data as required
        client.cpf = cpf || client.cpf;
        client.name = name || client.name;
        client.email = email || client.email;
        client.address = address || client.address;
        client.telephone = telephone || client.telephone;

        const updatedClient = await client.save();

        return resp.json(updatedClient);
    } catch (err: any) {
        return resp.status(500).json({
            err: "Coudnt find client to update.",
            message: err.message,
        })
    }
}

export default { add, read, del, update }