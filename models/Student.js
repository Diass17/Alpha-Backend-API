const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Stream = require('./stream');

const Student = sequelize.define('Student', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 255],
    },
  },
  iin: {
    type: DataTypes.STRING(12),
    allowNull: false,
    unique: true,
    validate: {
      len: [12, 12],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  funding: {
    type: DataTypes.ENUM('full', 'TechOrda', 'discount'),
    allowNull: false,
  },
  amountPaid: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: false,
  },
  amountRemaining: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('student', 'graduate'),
    allowNull: false,
    defaultValue: 'student',
  },
});

Student.belongsTo(Stream, { foreignKey: 'streamId' });
Stream.hasMany(Student, { foreignKey: 'streamId' });

module.exports = Student;
