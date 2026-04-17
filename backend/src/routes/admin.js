const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { login, getMe } = require('../controllers/adminController');
const { createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
const {
  createResource,
  updateResource,
  deleteResource,
  getAllResourcesAdmin,
} = require('../controllers/resourceController');
const {
  createResourceType,
  updateResourceType,
  deleteResourceType,
} = require('../controllers/resourceTypeController');

// Auth
router.post('/login', login);
router.get('/me', protect, getMe);

// Skills (protected)
router.post('/skills', protect, createSkill);
router.put('/skills/:id', protect, updateSkill);
router.delete('/skills/:id', protect, deleteSkill);

// Resource Types (protected)
router.post('/resource-types', protect, createResourceType);
router.put('/resource-types/:id', protect, updateResourceType);
router.delete('/resource-types/:id', protect, deleteResourceType);

// Resources (protected)
router.get('/resources', protect, getAllResourcesAdmin);
router.post('/resources', protect, createResource);
router.put('/resources/:id', protect, updateResource);
router.delete('/resources/:id', protect, deleteResource);

module.exports = router;
