const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbPostgres');
const User = require('./User');

const Favorite = sequelize.define('Favorite', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    movieId: {
        type: DataTypes.STRING, // Movie ID from MongoDB
        allowNull: false
    },
    movieTitle: {
        type: DataTypes.STRING
    },
    movieThumbnail: {
        type: DataTypes.STRING
    }
});

// Relationships
User.hasMany(Favorite);
Favorite.belongsTo(User);

module.exports = Favorite;
