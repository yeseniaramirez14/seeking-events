

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
            organization {
                name
            }
            }
            createdEvents {
            name
            organization {
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
                    "organization": {
                    "name": "Org 1"
                    }
                }
                ],
                "createdEvents": [
                {
                    "name": "Event 1",
                    "organization": {
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
                    "organization": {
                    "name": "Org 2"
                    }
                },
                {
                    "name": "Event 3",
                    "organization": {
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
                    "organization": {
                    "name": "Org 3"
                    }
                },
                {
                    "name": "Location 3",
                    "organization": {
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
                organization {
                    name
            }
            }
            createdEvents {
                name
                organization {
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
            "singleOrganization": {
                "_id": "6363534c8729f67db261e605",
                "name": "Org 1",
                "createdAt": "2022-11-03T05:36:12.763Z",
                "updatedAt": "2022-11-03T06:10:27.353Z",
                "createdLocations": [
                    {
                    "name": "Location 1",
                    "organization": {
                        "name": "Org 1"
                    }
                    }
                ],
                "createdEvents": [
                    {
                    "name": "Event 1",
                    "organization": {
                        "name": "Org 1"
                    }
                    }
                ]
            }
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

<br>

## GraphQL Mutations

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
                organization {
                    name
                }
            }
            createdEvents {
                name
                organization {
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

<br>

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

* ### **Update an event**
    Input:
    ```text
    mutation {
        updateEvent(eventUpdateInput: {
            _id: "63635c178729f67db261e620",
            name: "Event 2 name updated",
            dateTime: "2022-11-30T08:00:08.761Z"
            description: "Description for Event 2 updated"
        }) {
            _id
            name
            dateTime
            description
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
            "updateEvent": {
                "_id": "63635c178729f67db261e620",
                "name": "Event 2 name updated",
                "dateTime": "2022-11-30T08:00:08.761Z",
                "description": "Description for Event 2 updated",
                "createdAt": "2022-11-03T06:13:43.786Z",
                "updatedAt": "2022-11-03T23:40:28.598Z",
                "organization": {
                    "name": "Org 2"
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

* ### **Delete an event**
    Input:
    ```text
    mutation {
        deleteEvent(_id: "63635c1e8729f67db261e626") {
            name
        }
    }
    ```

    Response:
    ```json
    {
        "data": {
            "deleteEvent": {
            "name": "Event 3"
            }
        }
    }
    ```