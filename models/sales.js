const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    
    const Sales = sequelize.define("sales", {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: Sequelize.STRING(300),
        date: Sequelize.DATE,
        amount: Sequelize.DECIMAL(10,2),
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE   
    });

    return Sales;
};