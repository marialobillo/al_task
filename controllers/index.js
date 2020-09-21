const models = require("../database/models");
const crypto = require('crypto');


const createValue = async (req, res) => {
  try {
        const {id_service, encryption_key, value} = req.body;

       
          
        const id_hashed = crypto.createHash('md5').update(id_service).digest('hex');
        const key_hashed = crypto.createHash('md5').update(encryption_key).digest('hex');
        const value_hashed = crypto.createHash('md5').update(value).digest('hex');

        console.log("id: ", id_hashed);
        console.log("key: ", key_hashed);
        console.log("value: ", value_hashed);

        const service = await models.Service.create({
            id_service: id_hashed, 
            encryption_key: key_hashed, 
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
      const { id_value, encryption_key } = req.body;

      const value = await models.Services.findOne({
        where: { id_value: id_value, encryption_key: encryption_key },
      });
      
      if (value) {
        return res.status(200).json({ value });
      }
      return res.status(404).send([]);
    } catch (error) {
      return res.status(500).send([]);
    }
  };

module.exports = {
    createValue, 
    getValueById
}
  