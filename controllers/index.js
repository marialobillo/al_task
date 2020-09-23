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
          const service_checked = await getOneServiceById(id);


          // Updating the service that already exists         **UPDATING**
          if(service_checked){
            //the service exists so we update the value
            const service_updated = await updateService(id, value_hashed);
            
            // return the service updated
            if(service_updated){

              const updated =  service_checked.dataValues;
              return res.status(201).json({ updated });
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

const getOneServiceById = async id => {
  return await models.Service.findOne({ where: { id } });
}

const updateService = async (id, value) => {
  try {
    const service_updated  = await models.Service.update(
      { id,value }, 
      { where: { id } });
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

      // Checking the wilcard characters in id
      if(id.includes('*')){
        const servicesMatches = await handleWildcardOption(id, encryption_key);
        
        return res.status(200).json(servicesMatches);
      } 

      // --------------------------------
        const service = await models.Service.findOne({
          where: { id },
        });
        const value = decrypt(service.value, encryption_key);

        if (service) {
          return res.status(200).json({
            id,
            value,
            createdAt: service.createdAt,
            updatedAt: service.updatedAt
          });
        }

      
      return res.status(404).send('Matches not found.');

    } catch (error) {
      return res.status(500).json([]);
    }
};

const handleWildcardOption = async (id, encryption_key) => {
  try {

    // Extracting the query
    const query = id.substring(0, id.length - 1);
    // Getting the services that matches with the query {id, value, createdAt, updatedAt}
    const servicesMatches = await checkWildcardQuery(query);

    const decrypted_matches = decryptMatches(servicesMatches, encryption_key);
    
    return decrypted_matches; 
  } catch (error) {
    return error.message;
  }
}


const checkWildcardQuery = async query => {
  // Get all Services
  const services = await getAllServices();

  // Select the rows that matches
  const matches = services.filter(service => service.id.includes(query));
  // return those rows
  return matches;
}

const decryptMatches = (matches, encryption_key) => {
  const decrypted_values= matches.map(service => {
    // decrypt the value attribute
    const hashed_value = decrypt(service.value, encryption_key);
    // returning the service, all attributes
    return {
      id: service.id,
      value: hashed_value,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt
    };

  });
  return decrypted_values;
}


const getAllServices = async () => {
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
  