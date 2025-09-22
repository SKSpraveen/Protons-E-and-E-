const express = require("express");
const router = express.Router();
const controller = require("./controller2");



router.get('/vehicle', controller.getvehicle);
router.post('/createvehicle', controller.addvehicle);
router.put('/updatevehicle', controller.updatevehicle);
router.delete('/deletevehicle', controller.deletevehicle);


module.exports = router;
