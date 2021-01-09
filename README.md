## Technologies used
* Node & Express
* Typescript
* Docker
* Jest

## Running on docker
****
**_Make sure you have Docker installed globally and you've createad .env file with the corresponding variables from .env.example_**

****
```
git clone https://github.com/PiotrBlachnio/Node-API-Romin.git
```

```
cd Node-API-Romin/
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
git clone https://github.com/PiotrBlachnio/Node-API-Romin.git
```

```
cd Node-API-Romin/
```

```
npm install
```

```
npm run start:dev
```
## Running on localhost in production environment
****
**_Make sure you have Typescript installed globally and you've createad .env file with the corresponding variables from .env.example_**

****

```
git clone https://github.com/PiotrBlachnio/Node-API-Romin.git
```

```
cd Node-API-Romin/
```

```
npm install
```

```
npm run build
```

```
npm run start:prod
```