# Initializing `object database server`

Live demo of this service: <https://jsonbackendserver.herokuapp.com/>

```js
const jsonbackend = require("jsonbackend");
jsonbackend.listen();  // This would run the endpoint on port 3000.
//or you can specify custom port i.e., `jsonbackend.listen(4000)` would have run the database endpoint @ 4000 port.

```

## Usage of db's endpoint from frontend with `axios`

You can create a express server that can act as a reliable 'object database server'. So you might be wondering what could a 'object database server' which would behave in a manner that you can directly post the data to the endpoint or use a `$partial` property to send partial data to be updated in the existing data in the database. For e.g.,

### 1. **Put data in database** like -

```js
let dataToPost = {
  cars: 200,
  bikes: 400,
  ships: {
    big: true,
    small: ['rem', 'bem', 'tem']
  }
}

let {data} = await axios.post("https://localhost:3000/foo", dataToPost)
```

would just save this object to file `foo.json` and you can see it directly in the `mydbs` directory.

### 1.1 After saving you can **fetch** the data with post request, e.g

```js
let {data} = await axios.post("https://localhost:3000/foo")
```

### 2. Also, you can update a particular property in the json database via sending a post request like -

```js
let dataToPost = {
  $partial: {
    ships: "Cool",
    kicks: 200
  }
}
let {data} = await axios.post("https://localhost:3000/foo", dataToPost)
```

would just alter the property of `ships` in the database(`db.json`), so our final database state would look like:

```js
let dataToPost = {
  cars: 200,
  bikes: 400,
  ships: "Cool",
  kicks: 200
}
let {data} = await axios.post("https://localhost:3000/foo", dataToPost)
```

## Author's Resources

- Nodemon faq's : [Excluding watch files from nodemon](https://stackoverflow.com/questions/24120004/nodemon-exclusion-of-files).
- This command/script works too for excluding watch files for nodemon - `"start2": "nodemon --ignore mydb.json -q index.js"`.
