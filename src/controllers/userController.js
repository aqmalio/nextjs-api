const sequelize = require('../database/sequelize');
const datasetModel = require('../database/models/dataset.model');

const getUserDetail = async (req, res) => {
  let idUser = req.params.id
  const dataset = await datasetModel.findAll({
    where: {
      id: idUser
    }
  })
  res.json({"data": dataset});
}

const getUserByLocation = async (req, res) => {
  let location = req.query.location
  if(!location) res.json({"error": "location required"})
  const dataset = await datasetModel.findAll({
    where: {
      location: location
    },
    limit: 5
  })
  res.json({"data": dataset});
}

module.exports = {
  getUserDetail,
  getUserByLocation
}