## GraphQL Mutations

* ### **Create a user**
    Input:
    ```text
    mutation {
        createUser(userInput: {
            name: "Yesenia Ramirez",
            username:"yeseniaramirez",
            email:"test@test.com",
            password:"password",
            organization: "6363534c8729f67db261e605"
        }) {
            name
            _id
            username
            email
            password
            createdAt
            updatedAt
            organization {
                name
                employees {
                    name
                }
            }
        }
    }
    ```

    Response: 
    ```json
    {
        "data": {
            "createUser": {
            "name": "Yesenia Ramirez",
            "_id": "636b6385a7f812e682d97129",
            "username": "yeseniaramirez",
            "email": "test@test.com",
            "password": null,
            "createdAt": "2022-11-09T08:23:33.953Z",
            "updatedAt": "2022-11-09T08:23:33.953Z",
            "organization": {
                "name": "Org 1",
                "employees": [
                {
                    "name": "Yesenia Ramirez"
                }
                ]
            }
            }
        }
    }
    ```

* ### **Update a user**
    Input:
    ```text
    mutation {
        updateUser(userUpdateInput: {
            _id: "636b6385a7f812e682d97129",
            name:"Yesenia Middle Ramirez",
            password: "new-password"
        }) {
            name
            createdAt
            updatedAt
            username
            password
            organization {
            name
            employees {
                name
                username
            }
            }
        }
    }
    ```

    Response:
    ```json
    {
        "data": {
            "updateUser": {
            "name": "Yesenia Middle Ramirez",
            "createdAt": "2022-11-09T08:23:33.953Z",
            "updatedAt": "2022-11-09T08:28:27.199Z",
            "username": "yeseniaramirez",
            "password": null,
            "organization": {
                "name": "Org 1",
                "employees": [
                {
                    "name": "Yesenia Middle Ramirez",
                    "username": "yeseniaramirez"
                }
                ]
            }
            }
        }
    }
    ```

* ### **Delete a user**
    Input:
    ```text
    mutation {
        deleteUser(_id: "636b6385a7f812e682d97129") {
            name
        }
    }
    ```

    Response:
    ```json
    {
        "data": {
            "deleteUser": {
                "name": "Yesenia Middle Ramirez"
            }
        }
    }
    ```

## GraphQL Queries

* ### **List of all users**
    Input: 
    ```text
    query {
        users {
            name
            _id
            password
            organization {
                name
                employees{
                    name
                }
            }
        }
    }
    ```

    Response:
    ```json
    {
        "data": {
            "users": [
                {
                    "name": "Yesenia Middle Ramirez",
                    "_id": "636b6385a7f812e682d97129",
                    "password": null,
                    "organization": {
                        "name": "Org 1",
                        "employees": [
                            {
                            "name": "Yesenia Middle Ramirez"
                            },
                            {
                            "name": "Rachel Green"
                            },
                            {
                            "name": "Ross Geller"
                            }
                        ]
                    }
                },
                {
                    "name": "Rachel Green",
                    "_id": "636b6641a7f812e682d97138",
                    "password": null,
                    "organization": {
                        "name": "Org 1",
                        "employees": [
                            {
                            "name": "Yesenia Middle Ramirez"
                            },
                            {
                            "name": "Rachel Green"
                            },
                            {
                            "name": "Ross Geller"
                            }
                        ]
                    }
                },
                {
                    "name": "Ross Geller",
                    "_id": "636b664fa7f812e682d97140",
                    "password": null,
                    "organization": {
                        "name": "Org 1",
                        "employees": [
                            {
                            "name": "Yesenia Middle Ramirez"
                            },
                            {
                            "name": "Rachel Green"
                            },
                            {
                            "name": "Ross Geller"
                            }
                        ]
                    }
                }
            ]
        }
    }
    ```

    * ### **Single user**
    Input: 
    ```text
    query {
        singleUser(_id: "636b6385a7f812e682d97129") {
            name
            username
            password
            email
            createdAt
            updatedAt
            organization {
            _id
            name
            employees {
                name      }
            
            }
        }
    }
    ```

    Response:
    ```json
    {
        "data": {
            "singleUser": {
                "name": "Yesenia Middle Ramirez",
                "username": "yeseniaramirez",
                "password": null,
                "email": "test@test.com",
                "createdAt": "2022-11-09T08:23:33.953Z",
                "updatedAt": "2022-11-09T08:28:27.199Z",
                "organization": {
                    "_id": "6363534c8729f67db261e605",
                    "name": "Org 1",
                    "createdAt": "2022-11-03T05:36:12.763Z"
                }
            }
        }
    }
    ```