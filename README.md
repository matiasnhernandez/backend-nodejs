# Practitioner Backend App - NodeJS

## Aplicacion contruida en nodeJs con Express 4, MongoDB y JWT.

### Funcionalidades:

* **Alta de usuario** Se realiza Alta de usuario
* **Consulta y modificacion de usuarios** Se realiza consulta de los datos del usuario y modificacion de los mismos.
* **Login** Se realiza login con usuario y clave
* **Alta de cuentas** Se realiza Alta de cuentas en base a tipo de cuenta, moneda y sucursal.
* **Consulta de cuentas** Se consultan las cuentas del usuario
* **Trasferencias** Se realizan transferencias entre cuentas
* **Consulta de transferencias** Se consultan las transferencias realizadas

### 


### Repo Github

<https://github.com/matiasnhernandez/backend-polymer>

### Build

    npm install

### Start

    npm run start:dev
    npm run start:prod


### Variables de entorno

- development.env
- production.env


```
PORT=3000
MONGO_URL='mongodb://localhost/backend-nodejs'
JWT_SECRET='JWT SECRET PASSWORD'
JWT_EXPIRES='1d'
```
    
### Swagger docs

<http://localhost:3000/api-docs/>

### Deploy automatico e integracion continua

Esta app se deploya automaticamente en Heroku

<https://backend-polymer.herokuapp.com/>
