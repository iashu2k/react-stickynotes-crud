const router = require("express").Router();

const { default: Axios } = require("axios");
let Task = require("../models/todos.model");

const getUserId = async (auth) => {
  try {
    const response = await Axios.get(
      "https://dev-287e8vnj.us.auth0.com/userinfo",
      {
        headers: {
          Authorization: auth,
        },
      }
    );
    return response.data.sub;
  } catch (error) {
    console.log(error);
  }
};

router.route("/").get( async(req, res) => {
  const auth = req.headers.authorization;
  const id =  await getUserId(auth);  
  Task.find({user_id: id})
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(async(req, res) => {
  const auth = req.headers.authorization;
  const id =  await getUserId(auth);

  const heading = req.body.heading;
  const task = req.body.task;
  const user_id = id;
  const newTask = new Task({ heading, task, user_id });

  newTask
    .save()
    .then(() => res.json("Task Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Task.findById(req.params.id)
    .then((task) => res.json(task))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json("Deleted Successfully!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      task.task = req.body.task;
      task.heading = req.body.heading;
      task
        .save()
        .then(() => res.json("updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
