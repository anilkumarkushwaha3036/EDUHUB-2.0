const Resource = require('../models/Resource');
const Skill = require('../models/Skill');

// Helper: sync resource count on skill
const syncResourceCount = async (skillId) => {
  const count = await Resource.countDocuments({ skillId, isApproved: true });
  await Skill.findByIdAndUpdate(skillId, { resourceCount: count });
};

// @desc  Get all resources with filtering & pagination
// @route GET /api/resources?skill=web-dev&type=youtube&level=beginner&page=1&limit=12
const getResources = async (req, res, next) => {
  try {
    const { skill, type, level, page = 1, limit = 12, featured } = req.query;
    const filter = { isApproved: true };

    if (skill) {
      const Skill = require('../models/Skill');
      const skillDoc = await Skill.findOne({ slug: skill });
      if (skillDoc) filter.skillId = skillDoc._id;
    }
    if (type) {
      const ResourceType = require('../models/ResourceType');
      const typeDoc = await ResourceType.findOne({ slug: type });
      if (typeDoc) filter.typeId = typeDoc._id;
    }
    if (level) filter.level = level;
    if (featured === 'true') filter.isFeatured = true;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Resource.countDocuments(filter);
    const resources = await Resource.find(filter)
      .populate('skillId', 'name slug icon color')
      .populate('typeId', 'name slug icon')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: resources.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: resources,
    });
  } catch (err) {
    next(err);
  }
};

// @desc  Get single resource by ID
// @route GET /api/resources/:id
const getResourceById = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('skillId', 'name slug icon color')
      .populate('typeId', 'name slug icon');
    if (!resource) return res.status(404).json({ success: false, message: 'Resource not found' });

    // Increment views
    resource.views += 1;
    await resource.save();

    res.json({ success: true, data: resource });
  } catch (err) {
    next(err);
  }
};

// @desc  Search resources
// @route GET /api/search?q=react
const searchResources = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 12 } = req.query;
    if (!q || q.trim() === '') {
      return res.json({ success: true, count: 0, total: 0, data: [] });
    }

    const filter = {
      isApproved: true,
      $text: { $search: q },
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Resource.countDocuments(filter);
    const resources = await Resource.find(filter, { score: { $meta: 'textScore' } })
      .populate('skillId', 'name slug icon color')
      .populate('typeId', 'name slug icon')
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: resources.length,
      total,
      data: resources,
    });
  } catch (err) {
    next(err);
  }
};

// @desc  Create resource (admin)
// @route POST /api/admin/resources
const createResource = async (req, res, next) => {
  try {
    const resource = await Resource.create(req.body);
    await syncResourceCount(resource.skillId);
    const populated = await resource.populate('skillId typeId');
    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    next(err);
  }
};

// @desc  Update resource (admin)
// @route PUT /api/admin/resources/:id
const updateResource = async (req, res, next) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('skillId typeId');
    if (!resource) return res.status(404).json({ success: false, message: 'Resource not found' });
    await syncResourceCount(resource.skillId._id);
    res.json({ success: true, data: resource });
  } catch (err) {
    next(err);
  }
};

// @desc  Delete resource (admin)
// @route DELETE /api/admin/resources/:id
const deleteResource = async (req, res, next) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ success: false, message: 'Resource not found' });
    await syncResourceCount(resource.skillId);
    res.json({ success: true, message: 'Resource deleted.' });
  } catch (err) {
    next(err);
  }
};

// @desc  Admin: get all resources (including unapproved)
// @route GET /api/admin/resources
const getAllResourcesAdmin = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Resource.countDocuments();
    const resources = await Resource.find()
      .populate('skillId', 'name slug icon')
      .populate('typeId', 'name slug icon')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({ success: true, count: resources.length, total, data: resources });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getResources,
  getResourceById,
  searchResources,
  createResource,
  updateResource,
  deleteResource,
  getAllResourcesAdmin,
};
