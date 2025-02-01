# Bi-Cycle - ecommerce backend

The system provides APIs for managing bicycles (products) and handling customer orders. It enables functionality such as product creation, order placement, stock management, revenue calculations, and search with filtering.

## Developer

- [@Rana Arju](https://github.com/rana-arju)

## Live API url

<https://bi-cycle-backend.vercel.app>

# or

```
https://bi-cycle-backend.vercel.app

```

## Video Explaination:

[![BY-Cycle store](https://res.cloudinary.com/db8l1ulfq/image/upload/v1732376843/bi-cycle_l1wqwn.png)](https://youtu.be/UAo5M98yehk?si=JR22lwTtXNUUykbL)

## Tech Stack

**Server:** Node, Express, MongoDB, Mongoose, TypeScript

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
DATABASE_URL= <Your database URL>
PORT= <Port number>
```

## Installation

Install my-project with npm

### You will need to download Git and Node to run this project

- Node
- Git
- npm

### Also check this out if you are new to react.

```bash
node --version
git --version
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/rana-arju/bi-cycle-backend.git
```

Go to the project directory

```bash
  cd bi-cycle-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## API Endpoint

#### Get all Product with query

```http
  GET /api/products?searchTerm=
```

#### Post single product

```http
  POST /api/products/:productId
```

## Product example:

```
{
  "name": "Roadster 5000",
  "brand": "SpeedX",
  "price": 300,
  "type": "Road",
  "description": "A premium road bike designed for speed and performance.",
  "quantity": 20,
  "inStock": true
}

```

#### Get single product

```http
  GET /api/products/:productId
```

#### delete single product

```http
  DELETE /api/products/:productId
```

#### Update single product

```http
  PUT /api/products/:productId
```

#### Post a Order

```http
  POST /api/orders
```

### Order Example [totalPrice optional, functionality build for count totalPrice if totalPrice not provided]

```
{
    "email": "rana23@example.com",
    "product": "674057007c9f75443d09e463",
    "quantity": 1,
    "totalPrice": 950
}

```

#### Get all Order

```http
  GET /api/orders
```

#### Get Order single product

```http
  GET /api/orders/:orderId
```

#### delete single order

```http
  DELETE /api/orders/:orderId
```

#### Update single order

```http
  PUT /api/orders/:orderId
```

# Folder Structure 📂

```bash
├── README.md
├── tsconfig.json
├── .env
├── package-lock.json
├── package.json
├── src
│   ├── App.ts
│   ├── server.ts
│   └── app
│      ├── config
│      │    └── index.ts
│      └── modules
|         ├── globalError.ts
|         ├── notFoundError.ts
│         └── orders
|         |    ├── orders.controller.ts
|         |    ├── orders.model.ts
|         |    ├── orders.interface.ts
|         |    ├── orders.service.ts
|         |    ├── orders.route.ts
│         └── porducts
|               ├── products.controller.ts
|               ├── products.model.ts
|               ├── products.interface.ts
|               ├── products.service.ts
|               └── products.route.ts
│
├──  vercel.json
├──  eslint.config.mjs
├── .gitignore
├── .prettierigmore
└── .prettierrc

```

---

# Packages Used 📦

| Used Package List |
| :---------------: |
|    express js     |
|     mongoose      |
|    typescript     |
|       cors        |
|      dotenv       |
|     prettier      |
|   eslint\_\_js    |

---
