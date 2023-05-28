const User = require('./User.js');
const Blog = require('./Blog.js');
const Comment = require('./Comment.js')

// User.hasMany(Blog, {
//     foreignKey: 'user_id',
// });

Blog.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

// Comment.belongsTo(Blog, {
//     foreignKey: 'blog_id',
//     onDelete: "cascade"
// });

// User.hasMany(Comment, {
//     foreignKey: 'user_id',
//     onDelete: "cascade"
// });

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: "cascade"
});

module.exports = { User, Blog, Comment }