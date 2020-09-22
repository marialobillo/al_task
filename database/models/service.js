module.exports = (sequelize, DataTypes) => {

  const Service = sequelize.define('Service', {
    id: DataTypes.STRING,
    value: DataTypes.STRING
  }, {});

  Service.associate = function(models) {
  };
  
  return Service;
};
