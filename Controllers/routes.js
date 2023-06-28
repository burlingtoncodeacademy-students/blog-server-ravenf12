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
      status: `Author at id: ${id}`, routes,
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
      body
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
router.put(":/id", (req, res) => {
  try{
    const id = Number(req.params.id);

    fs.readFile("./api/blog.json", (err, data) => {
      if (err) throw err;

      let results;
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

// DELETE
router.delete(":/id", (req, res) => {
  try {
    const id = Number(req.params.id)

    fs.readFile("./api/blog.json", (err, data) => {
      
    })
  } catch (err) {
    err
  }
})
// ! Check out routes.controller, from toDoList


  module.exports = router;