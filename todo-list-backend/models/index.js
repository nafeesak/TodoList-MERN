const {Sequelize,DataTypes}=require('sequelize');
const config=require('../config/database')

const env=process.env.NODE_ENV || 'development';

const sequelize=new Sequelize(config[env].database,config[env].username,config[env].password,{
    host:config[env].host,
    dialect:config[env].dialect,
})

const db={};

db.sequelize=sequelize;
db.Sequelize=sequelize;

//Import Modules

db.Todo=require('./Todo')(sequelize,DataTypes)

module.exports=db;