# Mistry
Rest API created using Node and Typescript. It fetches the data from Google Books API and allows user to search and paginate it. It's free to use and does not require any authentication to interact.
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

## Contributing
1. Fork it (https://github.com/PiotrBlachnio/Mistry/fork)
1. Create your feature branch (git checkout -b feature/fooBar)
1. Commit your changes (git commit -am 'Add some fooBar')
1. Push to the branch (git push origin feature/fooBar)
1. Create a new Pull Request
