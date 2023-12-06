### Movie Lobby Service

## Prerequisities
- Add your own .env file with MongoDB connect URL

## To run the project execute the below commands
- `git clone `
- `npm i`
- `npm run build && npm start`
- (To run test) `npm test`


## Endpoints
- `/api/movies`
    - Method: GET
    - Sample response:
        ```
        [
            {
            "_id": "656f8c13a2cb3e6011b10255",
            "title": "Animal",
            "rating": 4,
            "genre": "action",
            "link": "youtube.com",
            "__v": 0
        },
        {
            "_id": "656f95dd31e0ba5b7bf3d60a",
            "title": "Animal park",
            "rating": 4,
            "genre": "action",
            "link": "youtube.com",
            "__v": 0
        }
        ]
        ```
- `/api/movies`
    - Method: POST
    - Sample response:
        ```
        { 'status': 'CREATED'}
        ```

- `/api/search?q={query}`
    - Method: GET
     - Sample response:
        ```
        [
            {
            "_id": "656f8c13a2cb3e6011b10255",
            "title": "Animal",
            "rating": 4,
            "genre": "action",
            "link": "youtube.com",
            "__v": 0
        },
        {
            "_id": "656f95dd31e0ba5b7bf3d60a",
            "title": "Animal park",
            "rating": 4,
            "genre": "action",
            "link": "youtube.com",
            "__v": 0
        }
        ]
        ```
- `/api/movies/:id`
    - Method: PUT
    - Sample response:
        ```
        {
        "status": "UPDATED"
        }
        ```

- `/api/movies/:id`
    - Method: DELETE
    - Sample response:
        ```
        {
        "status": "DELETED"
        }
        ```




