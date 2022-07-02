const Router = require("express");

const {
  addPet,
  getPets,
  updatePet,
  deletePet,
  uploadPetImage,
  getPet,
} = require("../controllers/PetController");

const router = Router();

const multer = require("multer");
const upload = multer({ dest: "." });

router.get("/", getPets);

router.post("/", addPet);

router.put("/:petId", updatePet);

router.delete("/:petId", deletePet);

router.post("/:petId/uploadImage", upload.single("file"), uploadPetImage);

router.get("/:petId", getPet);

module.exports = router;
