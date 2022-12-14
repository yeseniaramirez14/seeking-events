# Data Collections
<br>

## Organization
| Name             | Type    | Required | 
|------------------|---------|----------|
| name             | String  | true     |
| employees        | Object  | true     |
| createdLocations | Object  | false    |
| createdEvents    | Object  | false    |
| createdAt        | Date    | true     |
| updatedAt        | Date    | true     |

```employees``` contains all the users belonging to the organization. <br>
```createdLocations``` contains all the locations the organization created. <br>
```createdEvents``` contains all the events the organization created. <br>
```createdAt``` and ```updatedAt``` are set by Mongoose when the organization is first created. <br>
```updatedAt``` is updated by Mongoose when the organization is updated. 

<br>

## Location
| Name             | Type    | Required | 
|------------------|---------|----------|
| name             | String  | true     |
| address          | String  | true     |
| latitude         | Number  | true     |
| longitude        | Number  | true     |
| organization     | Object  | true     |
| createdAt        | Date    | true     |
| updatedAt        | Date    | true     |

```latitude``` and ```longitude``` are automatically populated via Google Maps Geocoding API. <br>
```organization``` holds the organization that created the location. <br>
```createdAt``` and ```updatedAt``` are set by Mongoose when the location is first created. <br>
```updatedAt``` is updated by Mongoose when the location is updated. 

<br>

## Event
| Name             | Type    | Required | 
|------------------|---------|----------|
| name             | String  | true     |
| dateTime         | Date    | true     |
| description      | String  | true     |
| organization     | Object  | true     |
| createdAt        | Date    | true     |
| updatedAt        | Date    | true     |

```organization``` holds the organization that created the event. <br>
```createdAt``` and ```updatedAt``` are set by Mongoose when the event is first created. <br>
```updatedAt``` is updated by Mongoose when the event is updated. 

## User
| Name             | Type    | Required | 
|------------------|---------|----------|
| name             | String  | true     |
| username         | String  | true     |
| email            | String  | true     |
| password         | String  | true     |
| organization     | Object  | true     |
| createdAt        | Date    | true     |
| updatedAt        | Date    | true     |

```organization``` is the organization the user works for. <br>
```createdAt``` and ```updatedAt``` are set by Mongoose when the user is first created. <br>
```updatedAt``` is updated by Mongoose when the user is updated. 