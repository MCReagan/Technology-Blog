const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const sequelize = require('../config/connection');

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

router.get('/dashboard', async (req, res) => {
    res.render('dashboard');
});

router.get('/signup', async (req, res) => {
    res.render('signup');
});

router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/post/:id', async (req, res) => {
    try {
        const blogData = Blog.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'content',
                'title',
                'created_at'
            ],
            include: [{
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
            ]
        });
        if (blogData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const post = blogData.get({ plain: true });
        res.render('single-post', { post, loggedIn: req.session.loggedIn });

    } catch (err) {
        res.status(500).json(err);
    } 
});

module.exports = router;