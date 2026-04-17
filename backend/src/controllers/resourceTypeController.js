const ResourceType = require('../models/ResourceType');

// @desc  Get all resource types
// @route GET /api/resource-types
const getResourceTypes = async (req, res, next) => {
  try {
    const types = await ResourceType.find().sort({ name: 1 });
    res.json({ success: true, count: types.length, data: types });
  } catch (err) {
    next(err);
  }
};

const createResourceType = async (req, res, next) => {
  try {
    const type = await ResourceType.create(req.body);
    res.status(201).json({ success: true, data: type });
  } catch (err) {
    next(err);
  }
};

const updateResourceType = async (req, res, next) => {
  try {
    const type = await ResourceType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!type) return res.status(404).json({ success: false, message: 'Resource type not found' });
    res.json({ success: true, data: type });
  } catch (err) {
    next(err);
  }
};

const deleteResourceType = async (req, res, next) => {
  try {
    const type = await ResourceType.findByIdAndDelete(req.params.id);
    if (!type) return res.status(404).json({ success: false, message: 'Resource type not found' });
    res.json({ success: true, message: 'Resource type deleted.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getResourceTypes, createResourceType, updateResourceType, deleteResourceType };
