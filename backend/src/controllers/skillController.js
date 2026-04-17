const Skill = require('../models/Skill');
const Resource = require('../models/Resource');

// @desc  Get all skills
// @route GET /api/skills
const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ order: 1, name: 1 });
    res.json({ success: true, count: skills.length, data: skills });
  } catch (err) {
    next(err);
  }
};

// @desc  Get single skill by slug
// @route GET /api/skills/:slug
const getSkillBySlug = async (req, res, next) => {
  try {
    const skill = await Skill.findOne({ slug: req.params.slug });
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.json({ success: true, data: skill });
  } catch (err) {
    next(err);
  }
};

// @desc  Create skill (admin)
// @route POST /api/admin/skills
const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (err) {
    next(err);
  }
};

// @desc  Update skill (admin)
// @route PUT /api/admin/skills/:id
const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, data: skill });
  } catch (err) {
    next(err);
  }
};

// @desc  Delete skill (admin)
// @route DELETE /api/admin/skills/:id
const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    // Also delete associated resources
    await Resource.deleteMany({ skillId: req.params.id });
    res.json({ success: true, message: 'Skill deleted.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getSkills, getSkillBySlug, createSkill, updateSkill, deleteSkill };
