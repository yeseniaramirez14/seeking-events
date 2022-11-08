## GraphQL Mutations

* ### **Create a location**
    Input:
    ```text
    mutation {
        createLocation(locationInput: {
            name: "Location 1"
            address: "1600 Amphitheatre Parkway, Mountain View, CA"
            organization: "6363534c8729f67db261e605"
        }) {
            name
            address
            latitude
            longitude
            createdAt
            updatedAt
            organization {
            _id
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
            "createLocation": {
                "name": "Location 1",
                "address": "1600 Amphitheatre Parkway, Mountain View, CA",
                "latitude": 37.4223878,
                "longitude": -122.0841877,
                "createdAt": "2022-11-03T06:10:27.235Z",
                "updatedAt": "2022-11-03T06:10:27.235Z",
                "organization": {
                    "_id": "6363534c8729f67db261e605",
                    "name": "Org 1",
                    "createdLocations": [
                    {
                        "name": "Location 1"
                    }
                    ],
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

* ### **Update a location**
    Input:
    ```text
    mutation {
        updateLocation(locationUpdateInput: {
            _id: "63635de98729f67db261e633",
            name: "Location 3 name updated"
            address:"901 12th Ave, Seattle, WA 98122"
        }) {
            _id
            name
            address
            latitude
            longitude
            createdAt
            updatedAt
            organization {
                name
            }
        }
    }
    ```

    Response:
    ```json
    {
        "data": {
            "updateLocation": {
                "_id": "63635de98729f67db261e633",
                "name": "Location 3 name updated",
                "address": "901 12th Ave, Seattle, WA 98122",
                "latitude": 47.6107522,
                "longitude": -122.318706,
                "createdAt": "2022-11-03T06:21:29.632Z",
                "updatedAt": "2022-11-03T23:27:44.908Z",
                "organization": {
                    "name": "Org 3"
                }
            }
        }
    }
    ```

* ### **Delete a location**
    Input:
    ```text
    mutation {
        deleteLocation(_id: "63635d298729f67db261e62d") {
            name
        }
    }
    ```

    Response:
    ```json
    {
        "data": {
            "deleteLocation": {
            "name": "Location 2"
            }
        }
    }
    ```


## GraphQL Queries

* ### **List of all locations**
    Input: 
    ```text
    query {
        locations {
            _id
            name
            address
            latitude
            longitude
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
            "locations": [
            {
                "_id": "63635b538729f67db261e619",
                "name": "Location 1",
                "address": "1600 Amphitheatre Parkway, Mountain View, CA",
                "latitude": 37.4223878,
                "longitude": -122.0841877,
                "createdAt": "2022-11-03T06:10:27.235Z",
                "updatedAt": "2022-11-03T06:10:27.235Z",
                "organization": {
                    "name": "Org 1",
                    "createdLocations": [
                        {
                        "name": "Location 1"
                        }
                    ],
                    "createdEvents": [
                        {
                        "name": "Event 1"
                        }
                    ]
                }
            },
            {
                "_id": "63635d298729f67db261e62d",
                "name": "Location 2",
                "address": "1100 Congress Ave., Austin, TX 78701",
                "latitude": 30.2747025,
                "longitude": -97.7403448,
                "createdAt": "2022-11-03T06:18:17.523Z",
                "updatedAt": "2022-11-03T06:18:17.523Z",
                "organization": {
                    "name": "Org 3",
                    "createdLocations": [
                        {
                        "name": "Location 2"
                        },
                        {
                        "name": "Location 3"
                        }
                    ],
                    "createdEvents": []
                }
            },
            {
                "_id": "63635de98729f67db261e633",
                "name": "Location 3",
                "address": "130 E 23rd St, New York, NY 10010",
                "latitude": 40.7394391,
                "longitude": -73.9850246,
                "createdAt": "2022-11-03T06:21:29.632Z",
                "updatedAt": "2022-11-03T06:21:29.632Z",
                "organization": {
                    "name": "Org 3",
                    "createdLocations": [
                        {
                        "name": "Location 2"
                        },
                        {
                        "name": "Location 3"
                        }
                    ],
                    "createdEvents": []
                }
            }
            ]
        }
    }
    ```

* ### **Single location**
    Input: 
    ```text
    query {
        singleLocation(_id: "63635de98729f67db261e633") {
            _id
            name
            address
            latitude
            longitude
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
            "singleLocation": {
                "_id": "63635de98729f67db261e633",
                "name": "Location 3",
                "address": "130 E 23rd St, New York, NY 10010",
                "latitude": 40.7394391,
                "longitude": -73.9850246,
                "createdAt": "2022-11-03T06:21:29.632Z",
                "updatedAt": "2022-11-03T06:21:29.632Z",
                "organization": {
                    "name": "Org 3",
                    "createdLocations": [
                    {
                        "name": "Location 2"
                    },
                    {
                        "name": "Location 3"
                    }
                    ],
                    "createdEvents": []
                }
            }
        }
    }
    ```