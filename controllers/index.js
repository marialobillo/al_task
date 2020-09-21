const models = require("../database/models");
const { encrypt, decrypt } = require('../config/crypto');


const setValue = async (req, res) => {
  try {
        const {id_service, encryption_key, value} = req.body;
        const value_hashed = encrypt(value, encryption_key);

        // Check out if the id_service already exists     **UPDATING**
        const service_checked = await models.Service.findOne({
          where: { id_service }
        });

        // Updating the service that already exists       **UPDATING**
        if(service_checked){
          //update the value
          const service_updated = updateService(id_service, value_hashed);
          
          // return the service updated
          if(service_updated){
            const updated =  service_checked.dataValues;
            return res.status(201).json({
              updated
            });
          }
          
        }

        // Creating a new service            **CREATING A NEW SERVICE**
        const service = await models.Service.create({
            id_service, 
            value: value_hashed
        });
        return res.status(201).json({
          service
        });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateService = async (id_service, value) => {
  try {
    const service_updated  = await models.Service.update(
      {id_service,value}, 
      {
        where: { id_service}
      });
    if(service_updated){
      return service_updated;
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const getValueById = async (req, res) => {
    try {
      const { id_service, encryption_key } = req.body;

      const service = await models.Service.findOne({
        where: { id_service },
      });
      
      const value = decrypt(service.value, encryption_key);

      if (service) {
        return res.status(200).json(value);
      }
      return res.status(404).send([]);
    } catch (error) {
      return res.status(500).json([]);
    }
  };



module.exports = {
    setValue, 
    getValueById
}
  