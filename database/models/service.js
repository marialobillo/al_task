module.exports = (sequelize, DataTypes) => {

  const Service = sequelize.define('Service', {
    id_service: DataTypes.STRING,
    value: DataTypes.JSON
  }, {});

  Service.associate = function(models) {
  };
  return Service;
};