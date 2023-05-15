const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Blog.findAll({
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
    }).then(dbBlogData => res.json(dbBlogData.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
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
    })
        .then(dbblogData => {
            if (!dbblogData) {
                res.status(404).json({ message: 'No blog found with this id' });
                return;
            }
            res.json(dbblogData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    Blog.create({
        title: req.body.title,
        text: req.body.text,
        user_id: req.session.user_id
    })
        .then(dbblogData => res.json(dbblogData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', withAuth, (req, res) => {
    Blog.update({
        title: req.body.title,
        text: req.body.text
    }, {
        where: {
            id: req.params.id
        }
    }).then(dbblogData => {
        if (!dbblogData) {
            res.status(404).json({ message: 'No blog found with this id' });
            return;
        }
        res.json(dbblogData);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Blog.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbblogData => {
        if (!dbblogData) {
            res.status(404).json({ message: 'No blog found with this id' });
            return;
        }
        res.json(dbblogData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;