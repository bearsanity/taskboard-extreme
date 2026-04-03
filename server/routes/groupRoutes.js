const verifyToken = require('../middleware/auth');
const Group = require('../models/Group');
const router = require('express').Router()

//============================= Controllers =============================
const createGroup = async (req, res) => {
    try {
        const group = await Group.create({ ...req.body, userId: req.user.userId });
        return res
            .status(201)
            .json({ group });
    } catch (err) {
        return res
            .status(400)
            .json({ message: "Failed to create group" })
    }
};

const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find({ userId: req.user.userId });
        return res.json(groups);
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Failed to get groups', error: err.message });
    }
};

const getOneGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId);
        if (!group) {
            return res
                .status(404)
                .json({ message: "Can't find group with that ID" });
        }
        return res.json(group);
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Failed to fetch Group", error: err.message });
    }
};

const updateOneGroup = async (req, res) => {
    try {
        const group = await Group.findByIdAndUpdate(
            req.params.groupId,
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!group) {
            return res
                .status(404)
                .json({ message: "No group found with that id" })
        }
        return res.json(group);
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Failed to fetch Group", error: err.message });
    }
};

const deleteOneGroup = async (req, res) => {
    try {
        const group = await Group.findByIdAndDelete(req.params.groupId);
        if (!group) {
            return res
                .status(404)
                .json({ message: "No group found with that id" })
        }
        return res.json(group);
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Failed to fetch Group", error: err.message });
    }
};



//============================= Routes ============================= 
router.post('/', verifyToken, createGroup);
router.get('/', verifyToken, getAllGroups);
router.get('/:groupId', verifyToken, getOneGroup);
router.put('/:groupId', verifyToken, updateOneGroup);
router.delete('/:groupId', verifyToken, deleteOneGroup);
//router.delete('/', verifyToken, deleteAllGroups)

module.exports = router