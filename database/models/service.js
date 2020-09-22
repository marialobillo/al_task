module.exports = (sequelize, DataTypes) => {

  const Service = sequelize.define('Service', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    value: DataTypes.JSON
  }, {});

  Service.associate = function(models) {
  };

  return Service;
};
