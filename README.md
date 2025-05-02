
## recursos instalado para API TypeScript + PostGreSql

```bash
    npm i pg ts-node-dev
    npm install --save-dev @types/node @types/pg
    npm install dotenv typeorm --save
    npm install reflect-metadata --save
    npm install uuid
    npm install -D @types/uuid
```

## Criando a entidade (Model) no TypeORM CLI

```bash
    npx typeorm entity:create src/entities/product.entity
```

## Criar a migração

```bash
    npx typeorm migration:generate src/migrations/CreateProductTable -d ./dist/database/data-source.js
```

## Executar a migration


```bash
    npx typeorm migration:run -d ./dist/database/data-source.js
```
