## GraphQL Mutations

* ### **Create an organization**
    Input:
    ```text
    mutation {
        createOrganization(name: "Org 1") {
            _id
            name
            createdAt
            updatedAt
            createdLocations {
                name
                createdBy {
                    name
                }
            }
            createdEvents {
                name
                createdBy {
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
            "createOrganization": {
                "_id": "6363534c8729f67db261e605",
                "name": "Org 1",
                "createdAt": "2022-11-03T05:36:12.763Z",
                "updatedAt": "2022-11-03T05:36:12.763Z",
                "createdLocations": [],
                "createdEvents": []
            }
        }
    }
    ```


## GraphQL Queries

* ### **List of all organizations**
    Input: 
    ```text
    query {
        organizations {
            _id
            name
            createdAt
            updatedAt
            createdLocations {
            name
            createdBy {
                name
            }
            }
            createdEvents {
            name
            createdBy {
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
            "organizations": [
            {
                "_id": "6363534c8729f67db261e605",
                "name": "Org 1",
                "createdAt": "2022-11-03T05:36:12.763Z",
                "updatedAt": "2022-11-03T06:10:27.353Z",
                "createdLocations": [
                {
                    "name": "Location 1",
                    "createdBy": {
                    "name": "Org 1"
                    }
                }
                ],
                "createdEvents": [
                {
                    "name": "Event 1",
                    "createdBy": {
                    "name": "Org 1"
                    }
                }
                ]
            },
            {
                "_id": "636356be8729f67db261e608",
                "name": "Org 2",
                "createdAt": "2022-11-03T05:50:54.558Z",
                "updatedAt": "2022-11-03T06:13:50.951Z",
                "createdLocations": [],
                "createdEvents": [
                {
                    "name": "Event 2",
                    "createdBy": {
                    "name": "Org 2"
                    }
                },
                {
                    "name": "Event 3",
                    "createdBy": {
                    "name": "Org 2"
                    }
                }
                ]
            },
            {
                "_id": "636356c18729f67db261e60b",
                "name": "Org 3",
                "createdAt": "2022-11-03T05:50:57.274Z",
                "updatedAt": "2022-11-03T06:21:29.683Z",
                "createdLocations": [
                {
                    "name": "Location 2",
                    "createdBy": {
                    "name": "Org 3"
                    }
                },
                {
                    "name": "Location 3",
                    "createdBy": {
                    "name": "Org 3"
                    }
                }
                ],
                "createdEvents": []
            }
            ]
        }
    }
    ```

* ### **Single organization**
    Input: 
    ```text
    query {
        singleOrganization(_id: "6363534c8729f67db261e605") {
            _id
            name
            createdAt
            updatedAt
            createdLocations {
                name
                createdBy {
                    name
            }
            }
            createdEvents {
                name
                createdBy {
                    name
            }
            }
        }
    }
    ```