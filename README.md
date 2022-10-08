# <p align = "center"> Born Instituto de Idiomas </p>

Check project frontend [here](https://github.com/williameiji/born-frontend)

## :clipboard: Descrição

Application for the company to be able to register students, post payments, see payments made, generate receipt, generate statement.

---

## :computer: Technologies and Concepts

- REST APIs
- Node.js
- TypeScript
- MongoDB
- Joi
- JsonWebToken
- Jest
- Supertest
- Nodemon

---

## :rocket: Routes

```yml
POST /login
    - Route to signin
    - headers: {}
    - body: {
        "name": "Lorem Ips",
        "password": "SuperSecrectPassword",
      }
```

```yml
POST /signup
    - Route to signup a admin
    - headers: {}
    - body: {
        "name": "Lorem Ips",
        "password": "SuperSecrectPassword",
        "key": 40302010,
      }
```

```yml
POST /students (authenticated)
    - Route to add a new student
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "date": "10/10/2022",
        "value": "150",
        "name": "Ips Lorem",
        "cpfStudent": "12345678912",
        "rgStudent": "12345678",
        "nameResp": "", (allow empty)
        "cpfResp": "", (allow empty)
        "rgResp": "", (allow empty)
        "adress": "QE 11 Área Especial C",
        "number": "123",
        "district": "Guará I",
        "city": "Brasília",
        "phone": "149999999999,
        "email": "ipslorem@gmail.com",
    }
```

```yml
GET /students/search/:name
    - Route to list all students or by name
```

```yml
PUT /students/edit (authenticated)
    - Route to edit student information
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "date": "10/10/2022",
        "value": "120",
        "name": "Ips Lorem",
        "cpfStudent": "12345678912",
        "rgStudent": "87654321",
        "nameResp": "", (allow empty)
        "cpfResp": "", (allow empty)
        "rgResp": "", (allow empty)
        "adress": "Rua das Fiandeiras",
        "number": "321",
        "district": "Vila Olímpia",
        "city": "São Paulo",
        "phone": "149999999999,
        "email": "ipslorem@gmail.com",
    }
```

```yml
DELETE /students/:id (authenticated)
    - Route to delete a student
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
POST /payments (authenticated)
    - Route to add a new payment
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "id": "123456",
        "name": "Lorem Ips",
        "value": "150",
        "date": "05/10/2022",
        "reference": "November",
    }
```

```yml
GET /payments/:id
    - Route to list all payments by student id
```

```yml
POST /e2e/cleardb 
    - Route to clear database (only for tests)
    - headers: {}
    - body: {}
```

## 🏁 Running the application

This project was started with the [Express](https://www.npmjs.com/package/express), so make sure you have the latest stable version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running locally.

First, clone this repository on your machine:

```
git clone https://github.com/williameiji/born-backend
```

Then, inside the folder, run the following command to install the dependencies.

```
npm install
```

Finished the process, just start the server

```
npm run dev
```
