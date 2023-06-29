const router = require("express").Router();

const blog = require("../api/blog.json"); // See if this helps access database?

const fs = require("fs"); // I dont know any other way to do that.. even the internet says this

const fsPath = "./api/blog.json";

router.get("/", (req, res) => {
  try {
    res.status(200).json({
      results: blog,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Get by ID
// http://localhost:5001/routes/:id
router.get("/:id", (req, res) => {
  try {
    // Getting by ID
    const id = req.params.id;
    //
    let routes = blog.filter((obj) => obj.id == id);
    // A message for our mistakes
    res.status(200).json({
      status: `Author at id: ${id}`,
      routes,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// http://localhost:5001/routes/create
router.post("/create", (req, res) => {
  try {
    // Our body for what we want to write for the creation
    let { newTitle, author, body } = req.body;

    let newId = blog.length + 1;
    //
    const oneTitle = {
      id: newId,
      newTitle,
      author,
      body,
    };

    fs.readFile(fsPath, (err, data) => {
      const database = JSON.parse(data);

      // IDS for out database? I honestly don't remember...
      let currentIDs = [];
      database.forEach((obj) => {
        currentIDs.push(obj.id);
      });

      if (currentIDs.includes(newId)) {
        let maxValue = Math.max(...currentIDs);
        newId = maxValue + 1;
        oneTitle.id = newId;
      }
      database.push(oneTitle);

      fs.writeFile(fsPath, JSON.stringify(database), (err) => console.log(err));

      // Gives us a message
      res.status(200).json({
        status: `New Title ${oneTitle.name}.`,
        oneTitle,
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Patch without interesting stuff
router.put("/:id", (req, res) => {
  try {
    // Grabbing number from api
    const id = Number(req.params.id);
    // what we send to postman
    const postUpdate = req.body;
    // Reading from our api file
    fs.readFile("./api/blog.json", (err, data) => {
      if (err) throw err;
      // Getting from api so it can be used
      const db = JSON.parse(data);

      let result;

      db.forEach((postObj, i) => {
        if (postObj.id === id) {
          // Making an empty object
          let buildObj = {};
          // Looking at keys (auth, body, etc)
          for (key in postObj) {
            if (postUpdate[key]) {
              // Updating your key
              buildObj[key] = postUpdate[key];
            } else {
              buildObj[key] = postObj[key];
            }
          }
          db[i] = buildObj;
          result = buildObj;
          fs.writeFile("./api/blog.json", JSON.stringify(db), (err) => console.log(err))
        }
      });
      result
        ? res.status(200).json({
          status: "post updated", 
          result
        })
        : res.status(404).json({
          status: "No update"
        })
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// DELETE
router.delete("/:id", (req, res) => {
  try {
    // Getting our id by number
    const id = Number(req.params.id);

    // Reading our data
    fs.readFile("./api/blog.json", (err, data) => {
      if (err) throw err;
      const db = JSON.parse(data)

      // Filtering through the database
      filterDb = db.filter((post) => post.id !== id)
      // Reading our file, seeing if it gone
      fs.writeFile("./api/blog.json", JSON.stringify(filterDb), (err) => console.log(err))

      // Message to you
      res.status(200).json({
        status: "Gone"
      })
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
});
// ! Check out routes.controller, from toDoList

module.exports = router;
