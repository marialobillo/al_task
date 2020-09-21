const models = require("../database/models");
const cryto = require('crypto');


const createValue = async (req, res) => {
  try {
        const {id_value, encryption_key, value} = req.body;
          
        const id_hash = crypto.createHash('md5').update(name).digest('hex');
        const key_hash = crypto.createHash('md5').update(encryption_key).digest('hex');
        const value_hash = crypto.createHash('md5').update(value).digest('hex');

        const value = await models.Values.create({
            id_value: id_hash, 
            encryption_key: key_hash, 
            value: value_hash
        });

    return res.status(201).json({
      value
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getValueById = async (req, res) => {
    try {
      const { id_value, encryption_key } = req.body;

      const value = await models.Values.findOne({
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
  