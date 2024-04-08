const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');


router.post('/', locationController.createLocation);
router.get('/', locationController.getAllLocations);
router.get('/:id', locationController.getLocationById);
router.put('/:id', locationController.updateLocationById);
router.delete('/:id', locationController.deleteLocationById);

module.exports = router;
