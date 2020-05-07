## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



## Using Mocked API with JSON Server

### Start server

```bash
$ yarn start-mocked-server
```

### Get all tasks

**URL:** `http://localhost:8000/tasks`

**Method:** GET

**Response example:**

```json
[
  {
    "id": "1",
    "name": "Learn about React",
    "category": "Study",
    "started_at": "2020-05-04T10:14:35+07:00",
    "ended_at": "2020-05-04T13:14:35+07:00"
  },
  {
    "id": "2",
    "name": "Go to gym",
    "category": "Workout",
    "started_at": "2020-05-04T12:14:35+07:00",
    "ended_at": "2020-05-04T13:14:35+07:00"
  }
]
```

### Create a task

**URL:** `http://localhost:8000/tasks`

**Method:** POST

**Request payload**:

```json
{
  "id": "18",
  "name": "Attend yoga class",
  "category": "Workout",
  "started_at": "2020-05-03T07:10:35+07:00",
  "ended_at": "2020-05-03T08:10:35+07:00"
}
```

**Response example:**

```json
{
  "id": "18",
  "name": "Attend yoga class",
  "category": "Workout",
  "started_at": "2020-05-03T07:10:35+07:00",
  "ended_at": "2020-05-03T08:10:35+07:00"
}
```

### Remove a task

**URL:** `http://localhost:8000/tasks/<id>`

**Method:** DELETE