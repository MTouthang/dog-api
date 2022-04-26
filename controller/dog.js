const Dog = require("../model/Dog");

// middle ware to get id
exports.getDogId = (req, res, next, id) => {
  Dog.findById(id).exec((err, dog) => {
    if (err) {
      return res.status(400).json({
        err: "dog item not found in db",
      });
    }
    req.dog = dog;
    console.log(dog);
    next();
  });
};

// create or give dog details
exports.createDog = (req, res) => {
  const dog = new Dog(req.body);
  dog.save((err, dog) => {
    if (err) {
      return res.status(404).json({
        error: "Not able to save in the Database",
      });
    }
    res.json({ dog });
    console.log(dog);
  });
};

// get all the dogs available
exports.getAllDogs = (req, res) => {
  Dog.find().exec((err, dogs) => {
    if (err) {
      return res.status(404).json({
        message: "Not dog data base available",
      });
    }
    res.json(dogs);
  });
};

// get dog by id
exports.getDogById = (req, res) => {
  return res.json(req.dog);
};

// update by id
exports.updateDog = (req, res) => {
  Dog.findByIdAndUpdate(
    { _id: req.dog._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, dog) => {
      if (err) {
        res.status(400).json({
          err: "Unable to update it",
        });
      }
      res.json(dog);
    }
  );
};

//Delete dog
exports.deleteDog = (req, res) => {
  Dog.findByIdAndDelete(
    {
      _id: req.dog._id,
    },
    (err, dog) => {
      if (err) {
        return res.status(400).json({
          err: "Dog unable to delete",
        });
      }
      res.json({
        message: "dog data deleted successfully",
      });
    }
  );
};
