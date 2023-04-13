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

router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    let routes = blog.filter((obj) => obj.id == id);
    res.status(200).json({
      status: `Author at id: ${id}`, routes,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/title/:title", (req, res) => {
  try {
    const newTitle = req.params.class;

    let titleResults = blog.filter ((obj) => obj.titleType.toUpperCase() === newTitle.toUpperCase());

    if (titleResults === 0) {
      res.status(401).json({
        message: `No title ${newTitle}`,
      });
    }
    res.status(200).json({
      title: titleResults,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// http://localhost:5001/title/create
router.post("/create", (req, res) => {
  try {
    let { newTitle, author, body} = req.body;

    let newId = blog.length + 1;

    const oneTitle = {
      id: newId,
      newTitle,
      author,
      body
    };

    fs.readFile(fsPath, (err, data) => {
      const database = JSON.parse(data);

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

// Giving in for now, finally debugged whatever I had done to Nodemon to make it run in a continuos loop. Now my issue is postman.. Im getting "404 - not found" errors. So it's still pulling, just not the information. This is about where Im at with servers.. Im going to dive back in tomorrow to see if I can figure this one out.

  module.exports = router;