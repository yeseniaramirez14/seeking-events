<h1 align="center">Seeking Events</h1>

<h2 align="center"> Yesenia Ramirez </h2>

<p align="center">Seeking Events is an event booking website where employees from an organization can create events for users to sign up for. Users will be able to search for events depending on location or category and view all their past and upcoming events. <br> <i>*a work in progress*</i></p>

<br>
<hr>
<br>

## Table of Contents 
- [Technologies Used](#technologies-used)
- [Design](#design)
    - [API design](docs/api-calls/api-calls.md)
        - [Organization design](docs/api-calls/organization.md)
        - [Location design](docs/api-calls/location.md)
        - [Event design](docs/api-calls/event.md)
        - [User design](docs/api-calls/user.md)
    - [Data collections](docs/data-collections.md)
- [Directory Tree](#directory-tree)
- [Installation/Setup](#installationsetup)
- [Author](#author)

<br>
<hr>
<br>

## Technologies Used 
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"> <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"> <img src="https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white"> 

<br>
<hr>
<br>

## Design
- [API design](docs/api-calls/api-calls.md)
    - [Organization design](docs/api-calls/organization.md)
    - [Location design](docs/api-calls/location.md)
    - [Event design](docs/api-calls/event.md)
    - [User design](docs/api-calls//user.md)
- [Data collections](docs/data-collections.md)

<br>
<hr>
<br>

## Directory Tree
* [collections/](./collections/)
    * [event.js](./collections/event.js)
    * [location.js](./collections/location.js)
    * [organization.js](./collections/organization.js)
    * [user.js](./collections/user.js)
* [docs/](./docs)
    * [api-calls/](./docs/api-calls/)
        * [api-calls.md](./docs/api-calls/api-calls.md)
        * [event.md](./docs/api-calls/event.md)
        * [external-apis.md](./docs/api-calls/external-apis.md)
        * [location.md](./docs/api-calls/location.md)
        * [organization.md](./docs/api-calls/organization.md)
        * [user.md](./docs/api-calls/user.md)
    * [data-collections.md](./docs/data-collections.md)
* [graphql/](./graphql)
    * [resolvers/](./graphql/resolvers)
        * [event.js](./graphql/resolvers/event.js)
        * [index.js](./graphql/resolvers/index.js)
        * [location.js](./graphql/resolvers/location.js)
        * [merge.js](./graphql/resolvers/merge.js)
        * [organization.js](./graphql/resolvers/organization.js)
        * [user.js](./graphql/resolvers/user.js)
    * [schema/](./graphql/schema)
        * [index.js](./graphql/schema/index.js)
* [helpers/](./helpers)
    * [date.js](./helpers/date.js)
    * [errorHandling.js](./helpers/errorHandling.js)
    * [googleGeocode.js](./helpers/googleGeocode.js)
* [.env](.env)
* [.gitignore](.gitignore)
* [app.js](./app.js)
* [README.md](./README.md)z

<br>
<hr>
<br>

## Installation/Setup
1. Git fork and clone this repo and navigate into the ```/seeking-events``` directory
```sh
cd seeking-events
```
2. Install dependencies 
```sh
npm install
```
3. Create a [MongoDB Atlas cluster](https://www.mongodb.com/cloud/atlas/register) and complete the Security Quickstart section.
4. Create a [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key).
5. Create an ```.env``` file and set your environment variables
```sh
MONGO_USER=""
MONGO_PASSWORD=""
MONGO_DB=""

GOOGLE_MAPS_API_KEY=""
```
6. Run server 
```sh
npm start
```

7. Access GraphiQL on [http://localhost:3000/graphql](http://localhost:3000/graphql)

<br>
<hr>
<br>

## Author

👤 **Yesenia Ramirez**

* Portfolio Website: [yeseniar.dev](https://www.yeseniar.dev)
* Github: [@yeseniaramirez14](https://github.com/yeseniaramirez14)
* LinkedIn: [@yeseniaramirez14](https://linkedin.com/in/yeseniaramirez14)
