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

// http://localhost:5001/routes/edit
router.patch("/edit", async (req, res) => {
  try {
    let Route;
      // Pulling the values from the url & req.body 
      const { id } = req.params;
      const { body } = req.body; // only want the user to be able to change what they said, not who said it, or where they said it

      // Make a filter
      const filter = {_id: id};

      // Check for only what the user wants to change about the message (new stuff)
      const returnOption = {new: true};

      // Passing in new info!!
      const updateRoute = await Route.findOneAndUpdate(
          filter,
          { body }, // needs to be an object to work properly
          returnOption
      );

      // Check to see if we were able to update
      updateRoute ?
          res.status(200).json({
              // if the message was found and updated
              message: `Updated!`, updateRoute,
          })
          : res.status(404).json({
              // if the message was not found and/or did not belong to the user
              message: `Can't find..`
          });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// http://localhost:5001/routes/title
router.delete('/title', async (req,res) => {
  try {
      // Pulling some value
      const { id } = req.params;
      // Delete the route 
      const deleteRoutes = await routes.deleteOne({_id: id, owner_id: req.user._id});

      // Send the response based on whether we deleted something
      deleteRoutes.deletedCount === 1 ?
          res.status(200).json({
              // if deleted
              message: "Deleted!"
          })
          : res.status(404).json({
              // if not deleted
              message: "I can't find that.."
          });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}); 


  module.exports = router;