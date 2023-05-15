const router = require('express').Router();
const { Blog } = require('../models');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('dashboard', { blogs });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;