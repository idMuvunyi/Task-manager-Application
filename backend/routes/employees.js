const router = require("express").Router();
let Employee = require("../models/employee.model");


router.route("/").get((req, res) => {
  Employee.find()
    .then((employees) => res.json(employees))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newEmployee = new Employee({ username });

  newEmployee
    .save()
    .then(() => res.json("Employee added !"))
    .catch((err) => res.status(400).json("Error : " + err));
});

// find id to delete or update if available

router.route("/:id").get((req, res) => {
  Employee.findById(req.params.id)
    .then((employee) => res.json(employee))
    .catch((err) => res.status(400).json("Error : " + err));
});

// delete a diven document in exercise corresponding to id

router.route("/:id").delete((req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(() => res.json("Employee Deleted !"))
    .catch((err) => res.status(400).json("Error : " + err));
});

module.exports = router;
