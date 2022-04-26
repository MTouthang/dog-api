const express = require("express");
const router = express.Router();

const {
  createDog,
  getAllDogs,
  getDogId,
  getDogById,
  updateDog,
  deleteDog,
} = require("../controller/dog");

//param router
router.param("dogId", getDogId);

router.post("/dog", createDog);
router.get("/dogs", getAllDogs);
router.get("/dog/:dogId", getDogById);

router.put("/dog/:dogId", updateDog);

router.delete("/dog/:dogId", deleteDog);

module.exports = router;
