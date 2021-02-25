## Documentation
API documentation is available under GET /api-docs
## Technologies used
* Node & Express
* Typescript
* Docker
* Jest
* Swagger

## Running on docker
****
**_Make sure you have Docker installed globally and you've createad .env file with the corresponding variables from .env.example_**

****
```
git clone https://github.com/PiotrBlachnio/Mistry.git
```

```
cd Mistry/
```

```
docker-compose build
```

```
docker-compose up
```
## Running on localhost in development environment
****
**_Make sure you have Typescript installed globally and you've createad .env file with the corresponding variables from .env.example_**

****

```
git clone https://github.com/PiotrBlachnio/Mistry.git
```

```
cd Mistry/
```

```
yarn install
```

```
yarn start:dev
```
## Running on localhost in production environment
****
**_Make sure you have Typescript installed globally and you've createad .env file with the corresponding variables from .env.example_**

****

```
git clone https://github.com/PiotrBlachnio/Mistry.git
```

```
cd Mistry/
```

```
yarn install
```

```
yarn build
```

```
yarn start:prod
```
