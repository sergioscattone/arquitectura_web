module.exports = (sequelize, DataTypes) => {
    var Points = sequelize.define('points', { quantity: DataTypes.INTEGER });
    return Points;
}