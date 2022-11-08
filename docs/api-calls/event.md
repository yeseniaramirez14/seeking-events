## GraphQL Mutations

* ### **Create an event**
    Input:
    ```text
    mutation {
        createEvent(eventInput: {
            name: "Event 1"
            dateTime: "2022-11-14T03:27:35.795Z",
            description: "Description for Event 1",
            organization: "6363534c8729f67db261e605"
        }) {
            _id
            name
            dateTime
            description
            createdAt
            updatedAt
            organization {
            name
            createdLocations {
                name
            }
            createdEvents {
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
            "createEvent": {
                "_id": "636357c28729f67db261e613",
                "name": "Event 1",
                "dateTime": "2022-11-14T03:27:35.795Z",
                "description": "Description for Event 1",
                "createdAt": "2022-11-03T05:55:14.249Z",
                "updatedAt": "2022-11-03T05:55:14.249Z",
                "organization": {
                    "name": "Org 1",
                    "createdLocations": [],
                    "createdEvents": [
                    {
                        "name": "Event 1"
                    }
                    ]
                }
            }
        }
    }
    ```

## GraphQL Queries

* ### **List of all events**
    Input: 
    ```text
    query {
        events {
            _id
            name
            dateTime
            description
            createdAt
            updatedAt
            organization {
                _id
                name
                createdEvents {
                    name
                }
                createdLocations {
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
            "events": [
            {
                "_id": "636357c28729f67db261e613",
                "name": "Event 1",
                "dateTime": "2022-11-14T03:27:35.795Z",
                "description": "Description for Event 1",
                "createdAt": "2022-11-03T05:55:14.249Z",
                "updatedAt": "2022-11-03T05:55:14.249Z",
                "organization": {
                    "_id": "6363534c8729f67db261e605",
                    "name": "Org 1",
                    "createdEvents": [
                        {
                        "name": "Event 1"
                        }
                    ],
                    "createdLocations": [
                        {
                        "name": "Location 1"
                        }
                    ]
                }
            },
            {
                "_id": "63635c178729f67db261e620",
                "name": "Event 2",
                "dateTime": "2022-11-29T03:27:35.795Z",
                "description": "Description for Event 2",
                "createdAt": "2022-11-03T06:13:43.786Z",
                "updatedAt": "2022-11-03T06:13:43.786Z",
                "organization": {
                    "_id": "636356be8729f67db261e608",
                    "name": "Org 2",
                    "createdEvents": [
                        {
                        "name": "Event 2"
                        },
                        {
                        "name": "Event 3"
                        }
                    ],
                    "createdLocations": []
                }
            },
            {
                "_id": "63635c1e8729f67db261e626",
                "name": "Event 3",
                "dateTime": "2022-11-29T03:27:35.795Z",
                "description": "Description for Event 3",
                "createdAt": "2022-11-03T06:13:50.903Z",
                "updatedAt": "2022-11-03T06:13:50.903Z",
                "organization": {
                    "_id": "636356be8729f67db261e608",
                    "name": "Org 2",
                    "createdEvents": [
                        {
                        "name": "Event 2"
                        },
                        {
                        "name": "Event 3"
                        }
                    ],
                    "createdLocations": []
                }
            }
            ]
        }
    }
    ```

    * ### **Single event**
    Input: 
    ```text
    query {
        singleEvent(_id: "63635c178729f67db261e620") {
            _id
            name
            dateTime
            description
            createdAt
            updatedAt
            organization {
            name
            createdLocations {
                name
            }
            createdEvents {
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
            "singleEvent": {
                "_id": "63635c178729f67db261e620",
                "name": "Event 2",
                "dateTime": "2022-11-29T03:27:35.795Z",
                "description": "Description for Event 2",
                "createdAt": "2022-11-03T06:13:43.786Z",
                "updatedAt": "2022-11-03T06:13:43.786Z",
                "organization": {
                    "name": "Org 2",
                    "createdLocations": [],
                    "createdEvents": [
                    {
                        "name": "Event 2"
                    },
                    {
                        "name": "Event 3"
                    }
                    ]
                }
            }
        }
    }
    ```