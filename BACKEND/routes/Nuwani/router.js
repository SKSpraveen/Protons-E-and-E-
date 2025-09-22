const express = require('express');
const router = express.Router();
const controller = require('../../routes/Nuwani/controller');

router.get('/users', controller.getUsers);
router.post('/createuser', controller.addUser);
router.post('/updateuser', controller.updateUser);
router.post('/deleteuser', controller.deleteUser);

router.get('/faqs', controller.getFaqs);
router.post('/createfaqs', controller.addFaqs);
router.post('/updatefaqs', controller.updateFaqs);
router.post('/deletefaqs', controller.deleteFaqs);

router.get('/complaints', controller.getComps);
router.post('/createcomps', controller.addComps);
router.post('/updatecomps', controller.updateComps);
router.post('/deletecomps', controller.deleteComps);


module.exports = router;
