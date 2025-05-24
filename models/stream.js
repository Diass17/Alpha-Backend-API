const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Stream = sequelize.define('Stream', {
  streamName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 255],
    },
  },
  numberOfStudents: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

module.exports = Stream;
