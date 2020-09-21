const models = require("../database/models");
const { encrypt, decrypt } = require('../config/crypto');


const createValue = async (req, res) => {
  try {
        const {id_service, encryption_key, value} = req.body;

        console.log('value', value);
        const value_hashed = encrypt(value, encryption_key);
        console.log('value hashed', value_hashed);

        const service = await models.Service.create({
            id_service, 
            value: value_hashed
        });
        console.log('The value created', service.toJSON());
    return res.status(201).json({
      service
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getValueById = async (req, res) => {
    try {
      const { id_service, encryption_key } = req.body;

      const service = await models.Service.findOne({
        where: { id_service },
      });
      console.log('id_service', id_service);
      console.log('encryption_key', encryption_key);
      console.log('LO DEVUELTO', service.value);
      
      const value = decrypt(service.value, encryption_key);
      console.log('THE CONTENT', typeof value);
      if (service) {
        return res.status(200).json(value);
      }
      return res.status(404).send([]);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    createValue, 
    getValueById
}
  