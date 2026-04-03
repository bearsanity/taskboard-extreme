const router = require("express").Router();

const groupRoutes = require("./groupRoutes");
const taskRoutes = require("./taskRoutes");
const authRoutes = require("./authRoutes");

router.use("/api/groups", groupRoutes);
router.use("/api/tasks", taskRoutes);
router.use("/api/auth", authRoutes)

module.exports = router;