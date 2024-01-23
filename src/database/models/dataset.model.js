const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Dataset = sequelize.define('Dataset', {
  id: {
    type: DataTypes.BIGINT(20),
    allowNull: false,
    defaultValue: 0,
    primaryKey: true,
    unsigned: true,
  },
  number: {
    type: DataTypes.BIGINT(20),
    allowNull: false,
    defaultValue: 0,
    unsigned: true,
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: '0',
    
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  login_hour: {
    type: DataTypes.TIME,
    allowNull: true,
    defaultValue: '00:00:00',
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    
  },
  age: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: 2000,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female'),
    allowNull: true,
    
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: true,
    
  },
  telp: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: '0',
    
  },
  brand_device: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: '0',
    
  },
  digital_interest: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: '0',
    
  },
  location_type: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: '0',
    
  },
}, {
  tableName: 'dataset',
  
  engine: 'InnoDB',
});

module.exports = Dataset;