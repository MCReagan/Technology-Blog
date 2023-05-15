const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            // where: {
            //     user_id: req.session.user_id
            // },
            // include: [
            //     {
            //         model: Comment,
            //         attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            //         include: {
            //             model: User,
            //             attributes: ['username']
            //         }
            //     },
            //     {
            //         model: User,
            //         attributes: ['username']
            //     }
            // ]
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('dashboard', { blogs, loggedIn: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;