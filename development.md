# Getting Started Manual installation

to get started with the project, you need to have the following installed on your machine:

- Node.js
- npm
- git
  Next, you can clone the repository and install the dependencies by running the following commands:
- `cd dashboard`
- `npm install` to install project dependencies
- `npm run dev` using Vite to start the development server
- `npm run build` to build the project for production

You should have the backend project up and running, please refer to the guide in the [backend repository](https://github.com/projectsveltos/ui-backend) to get started.

### Configure the backend port

`set VITE_BACKEND_PORT={port}` before running `npm run dev`
the default backend port is `9000`

##### Example :

`set VITE_BACKEND_PORT=8000`

### Configure the backend IP / NAME

name could be the IP address or the cluster name

`set VITE_BACKEND_NAME ` before running `npm run dev`

default : `localhost`

##### Example :

`set VITE_BACKEND_NAME= ui-backend`


### Configure the protocol

to change the protocol to `https` set the following environment variable
`set VITE_BACKEND_PROTOCOL= https`

default : `http`

### Configure the frontend port

`npm run dev -- --port {port}` to run the project on a different port
if the port is not available , it will automatically switch to the next available port.

##### Example :

`npm run dev -- --port 3000`

