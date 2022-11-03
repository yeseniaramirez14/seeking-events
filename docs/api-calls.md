# External APIs

[Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview)

<br>

# Internal APIs

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

* ### **List of all locations**
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
            createdBy {
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

* ### **List of all events**



* **Method**: `GET`
* **Path**: /api/convert

* ### **Create a new organization**
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

<br>

* ### **Create a new event**
    Input:
    ```text
    mutation {
        createEvent(eventInput: {
            name: "Event 1"
            dateTime: "2022-11-14T03:27:35.795Z",
            description: "Description for Event 1",
            createdBy: "6363534c8729f67db261e605"
        }) {
            _id
            name
            dateTime
            description
            createdAt
            updatedAt
            createdBy {
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
            "createdBy": {
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

<br>

* ### **Create a new event**
    Input:
    ```text
    mutation {
        createLocation(locationInput: {
            name: "Location 1"
            address: "1600 Amphitheatre Parkway, Mountain View, CA"
            createdBy: "6363534c8729f67db261e605"
        }) {
            name
            address
            latitude
            longitude
            createdAt
            updatedAt
            createdBy {
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
            "createdBy": {
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



