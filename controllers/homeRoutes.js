const router = require('express').Router();
const isLoggedIn = require('../utils/auth');
const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
            ]
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('all', { blogs });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;