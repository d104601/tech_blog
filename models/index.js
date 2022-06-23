const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
    foreignKey: "userId"
});

User.hasMany(Comment, {
    foreignKey: "userId"
});

Post.belongsTo(User, {
    foreignKey: "userId"
});

Post.hasMany(Comment, {
    foreignKey: "postId"
});

Comment.belongsTo(Post, {
    foreignKey: "postId",
    onDelete: "SET NULL"
});

Comment.belongsTo(User, {
    foreignKey: "userId"
});

module.exports = { User , Post, Comment };