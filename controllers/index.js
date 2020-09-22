const models = require("../database/models");
const { encrypt, decrypt } = require('../config/crypto');


const setService = async (req, res) => {
  try {
        const {id, encryption_key, value} = req.body;
        // validate the value , must be a json
        if(typeof value != 'object'){
          return res.status(500).json([]);
        } 

          const value_hashed = encrypt(JSON.stringify(value), encryption_key);

          // Check out if the id_service already exists     
          const service_checked = await models.Service.findOne({
            where: { id }
          });
  
          // Updating the service that already exists         **UPDATING**
          if(service_checked){
            //update the value
            const service_updated = updateService(id, value_hashed);
            
            // return the service updated
            if(service_updated){
              const updated =  service_checked.dataValues;
              return res.status(201).json({
                updated
              });
            }
            
          }
  
          // Creating a new service                           **CREATING **
          const service = await models.Service.create({
              id, 
              value: value_hashed
          });
          return res.status(201).json({ service });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateService = async (id, value) => {
  try {
    const service_updated  = await models.Service.update(
      {id,value}, 
      {
        where: { id }
      });
    if(service_updated){
      return service_updated;
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const getServiceById = async (req, res) => {
    try {
      const { id, encryption_key } = req.body;

      // if(id_service == '*'){
      //   const services = await getServices();
      //   services.foreach(service => {
      //     const content = decrypt(service.value, encryption_key);
      //     console.log('+',content);
      //   })
      // }

      const service = await models.Service.findOne({
        where: { id },
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

const getServices = async () => {
  try {
    const services = await models.Service.findAll({ raw: true });
   
    return services;
  } catch (error) {
    return res.status(500).send(error.message);
  }
}



module.exports = {
    setService, 
    getServiceById
}
  