const express = require('express');
const router = express.Router();
const { getAllBlogs } = require('../lib/Database');

router.get('/blogs', async (_, res) => {
    const blogs = await getAllBlogs();
    // res.json({ blogs: blogs });
    res.json(blogs);
});

module.exports = router;
