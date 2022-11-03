<h1 align="center">Econify Take Home Project</h1>

<h2 align="center"> Yesenia Ramirez </h2>

<p align="center">This project showcases 3 models (Organization, Location, and Event) where an Organization has the ability to Create, Read, Update and Delete Locations & Events. As well as query to find all the locations and events created by an organization and to query which organization a location or event belongs to.</p>

<br>
<hr>
<br>

## Table of Contents 
- [Technologies Used](#technologies-used)
- [Installation/Setup](#installationsetup)
- [Directory Tree](#directory-tree)
- [File Code Explanation](#file-code-explanation)
- [Author](#author)

<br>
<hr>
<br>

## Technologies Used 
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"> <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"> <img src="https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white"> 
<br>
<hr>
<br>

## Installation/Setup
1. Git fork and clone this repo and navigate into the ```/econify-project``` directory
```sh
cd econify-project
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
<br>

7. Access GraphiQL on [http://localhost:3000/graphql](http://localhost:3000/graphql)


<br>
<hr>
<br>

## Directory Tree
* [collections/](./collections/)
    * [event.js](./collections/visualization_imgs/event.js)
    * [location.js](./collections/visualization_imgs/location.js)
    * [organization.js](./collections/visualization_imgs/organization.js)
* [docs/](./docs)
    * [data-collections.md](./docs/data-collections.md)
* [graphql/](./graphql)
    * [resolvers/](./graphql/resolvers)
        * [event.js](./graphql/resolvers/event.js)
        * [index.js](./graphql/resolvers/index.js)
        * [location.js](./graphql/resolvers/location.js)
        * [merge.js](./graphql/resolvers/merge.js)
        * [organization.js](./graphql/resolvers/organization.js)
    * [schema/](./graphql/schema)
        * [index.js](./graphql/schema/index.js)
* [helpers/](./helpers)
    * [date.js](./helpers/date.js)
    * [googleGeocode.js](./helpers/googleGeocode.js)
* [.env](.env)
* [.gitignore](.gitignore)
* [app.js](./app.js)
* [README.md](./README.md)

<br>
<hr>
<br>

## File Code Explanation

[<h2>```submissions/```</h2>](.) 

[<h3>```d1_tables.py```</h3>](./data_code/d1_tables.py)
- This python file is where I created all my tables necessary for my database
    - artist
    - album
    - track
    - track_feature
- It also holds my create_connection function, which creates a connection to the SQLite database 

You can run this file to create the tables or create the tables at the same time as insertion. 
```sh
python data_code/d1_tables.py
```
<br>

[<h3>```d2_db.py```</h3>](./data_code/d2_db.py)
- This python file contains my ETL code using ```Spotipy```, ```Pandas```, ```SQL```, and ```Python```. 
- ```check_if_valid_data``` checks the data frame for any null values and if the data frame is empty
- There are 4 functions that are specific to one table in the database
    - ```insert_artists``` creates the artist table, searches for all my favorite artists in the ```fav_artists``` list, pulls the data, and inserts it into the database. 
    - ```insert_albums``` creates the album table, searches for the artist's albums with the artist_id, pulls the data, and inserts it into the database. 
        - I filtered out duplicate albums by identifying if they had the same album_name and were both by the same artist. 
        - I filtered out Deluxe Editions by looking for a couple of different variations of 'Deluxe Edition', without the possibility of filtering out albums with the word 'Deluxe' in the name. 
            - This removed majority of the Deluxe albums, but there were some outliers that weren't removed. 
    - ```insert_tracks``` creates the track table, searches for the album's tracks with the album_id, pulls the data, and inserts it into the database. 
    - ```insert_feature``` creates the track_feature table, searches for the track's audio features with a list of a maximum of 100 track_ids to reduce the number of API calls, pulls the data, and inserts it into the database. 

You can run this file to create the tables, pull, transform, and insert the data into the database. 
```sh
python data_code/d2_db.py
```
<br>

[<h3>```d3_views.py```</h3>](./data_code/d3_views.py)

*Jupyter version available at [```jupyter_notebooks/views.ipynb```](./jupyter_notebooks/views.ipynb)*

- This python file is where I created all my SQLite views so the data can be analyzed. 
- There are a variety of 17 different views 
    - Top 10 songs per artist in terms of duration_ms
    - Top 20 artists by the number of followers
    - Top 10 songs per artist in terms of tempo
    - Artists listed by the number of albums and songs
    - Albums released in the 90s
    - Top 20 songs with the highest danceability
    - Average energy of all the artists
    - Artists who have more than 20 albums
    - Average audio features of all the songs in each genre
    - Loudness vs energy by genre
    - Average audio features by artist
    - Correlation of certain audio features
    - The audio features for Jack Harlow's album, Come Home The Kids Miss You
    - Popularity and genre of artists
    - Tempos of songs by genre 
    - Valence vs popularity by genre    
    - Valence vs popularity by artist 

You can run this file to create the views and insert them into the database. They also print in the terminal via ```prettytable```. 
```sh
python data_code/d3_views.py
```

<br>

[<h3>```d4_visualizations.py```</h3>](./data_code/d4_visualizations.py)

*Jupyter version available at [```jupyter_notebooks/visualizations.ipynb```](./jupyter_notebooks/visualizations.ipynb)*

- This python file contains the code to create 7 data visualizations using ```matplotlib``` and ```seaborn```. 
- There are 7 different visualizations 
    - Bar plot: top 20 artists by followers 
    - Violin plot: tempos based on genre
    - Strip plot: tempos based on genre 
    - LM plot: valence vs popularity based on artist
    - LM plot: valence vs popularity based on genre 
    - Heat map: track audio feature correlations
    - Pair plot: track audio features relationship

### *[visualizations.pdf](./visualizations.pdf) goes into more detail about the graphs*

You can run this file to create the visualizations
```sh
python data_code/visualizations.py
```


<br>
<hr>
<br>

## Author

👤 **Yesenia Ramirez**

* Portfolio Website: [yeseniar.dev](https://www.yeseniar.dev)
* Github: [@yeseniaramirez14](https://github.com/yeseniaramirez14)
* LinkedIn: [@yeseniaramirez14](https://linkedin.com/in/yeseniaramirez14)
