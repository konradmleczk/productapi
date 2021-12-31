# API product's

It's simple REST API which allow CREATE, READ, UPDATE, DELETE (CRUD) products.

Online project: [http://api.konradmleczko85.smallhost.pl/product](http://api.konradmleczko85.smallhost.pl/product)

# Apps works

You may test API with POSTMAN, INSOMNIA or other tool.

# Available routes:

- 'product/' method:GET -> get list all product
- 'product/:id' method:GET -> get one product
- 'product/' method:POST  + name and price send in body as JSON -> create product
- 'product/:id' method:UPDATE  + name and price send in body as JSON -> update product
- 'product/:id' method:DELETE  -> delete product

# Data:
- Name must have min 1 sign and max 100 sign
- Price must be greater 0

# Technology:

- Typescript
- Node.js
- Mysql



