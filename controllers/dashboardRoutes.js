const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', withAuth, (req, res) => {
    Blog.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
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
    }).then(dbBlogData => {
        const blogs = dbBlogData.map(blog => blog.get({ plain: true }));

        res.render('dashboard', { blogs, loggedIn: true });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
        ]
    }).then(dbBlogData => {
        if (!dbBlogData) {
            res.status(404).json({ message: 'No blog found with this id' });
            return;
        }

        const blog = dbBlogData.get({ plain: true });
        res.render('edit-blog', { blog, loggedIn: true });
    }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.get('/new', (req, res) => {
    res.render('new-blog');
});

module.exports = router;