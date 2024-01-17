const sequelize = require('../database/sequelize');
// const datasetModel = require('../database/models/dataset.model');

const getSegmentAge = async (req, res) => {
  const dataset = await sequelize.query("SELECT YEAR(NOW()) - age AS age FROM dataset",
    {
      type: sequelize.QueryTypes.SELECT,
      raw: true,
    });
  const totalData = dataset.length
  let segmentAge = {
    "<17": 0,
    "18-24": 0,
    "25-34": 0,
    "35-44": 0,
    "45-64": 0,
    "65>": 0,
  }
  dataset.forEach((data) => {
    let age = data.age
    if (age <= 17) segmentAge['<17']++
    else if (age <= 24) segmentAge['18-24']++
    else if (age <= 34) segmentAge['25-34']++
    else if (age <= 44) segmentAge['35-44']++
    else if (age <= 64) segmentAge['45-64']++
    else if (age <= 65) segmentAge["65>"]++
  })
  segmentAge['<17'] = (100 * segmentAge['<17']) / totalData;
  segmentAge['18-24'] = (100 * segmentAge['18-24']) / totalData;
  segmentAge['25-34'] = (100 * segmentAge['25-34']) / totalData;
  segmentAge['35-44'] = (100 * segmentAge['35-44']) / totalData;
  segmentAge['45-64'] = (100 * segmentAge['45-64']) / totalData;
  segmentAge['65>'] = (100 * segmentAge['65>']) / totalData;
  res.send({ "data": segmentAge })
}

const getSegmentGender = async (req, res) => {
  const dataset = await sequelize.query("SELECT gender, count(id) as total FROM dataset GROUP BY gender",
    {
      type: sequelize.QueryTypes.SELECT,
      raw: true,
    });
  let totalData = 0;
  dataset.map((gender) => totalData = totalData + gender.total)
  dataset.map((gender) => gender.percent = (100 * gender.total) / totalData)
  res.send({ "data": dataset })
}

const getSegmentBrandDevice = async (req, res) => {
  const dataset = await sequelize.query("SELECT brand_device, count(id) as total FROM dataset GROUP BY brand_device",
    {
      type: sequelize.QueryTypes.SELECT,
      raw: true,
    });
  let totalData = 0;
  dataset.map((brand_device) => totalData = totalData + brand_device.total)
  dataset.map((brand_device) => brand_device.percent = (100 * brand_device.total) / totalData)
  res.send({ "data": dataset })
}

const getSegmentDigitalInterest = async (req, res) => {
  const dataset = await sequelize.query("SELECT digital_interest, count(id) as total FROM dataset GROUP BY digital_interest",
    {
      type: sequelize.QueryTypes.SELECT,
      raw: true,
    });
  let totalData = 0;
  dataset.map((digital_interest) => totalData = totalData + digital_interest.total)
  dataset.map((digital_interest) => digital_interest.percent = Math.round((100 * digital_interest.total) / totalData))
  res.send({ "data": dataset })
}

module.exports = {
  getSegmentAge,
  getSegmentGender,
  getSegmentBrandDevice,
  getSegmentDigitalInterest
}