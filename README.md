# Full-Stack API Consumer

This project I built for a challange. It consists of an web app with 5 distinct pages containing:

- A login form for the user login.
- A list of random users generated by the [Random Users Generator](https://randomuser.me/documentation).
- A cat image generated by the [HTTP cat API](https://http.cat/), which returns a cat image for a given HTTP status code.
- A random dog image generated by the [Random Dog](https://random.dog/) API.
- A list of clients retrieved from a MongoDB Atlas database I keep online. We may add new clients, delete a few others, and edit their data.

I used Vite to bootsrap a ReactJS + Typescript web app. Pure CSS has been used to style the pages. This app consumes some commonly used packages, like axios, phosphor-react, react-modal.

For the backend, I set a NodeJS server built with the Express package. This server is used to communicate to a MongoDB database, which is a task accomplished using the mongoose package.

The front-end is deployed in Netlify, and the backend is on Azure.

[Acesse a aplicação](https://fullstackapiconsumer.netlify.app/) e use as credenciais

Usuário: user 

Senha: pass
