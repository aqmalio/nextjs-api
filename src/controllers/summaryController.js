const sequelize = require('../database/sequelize');
// const datasetModel = require('../database/models/dataset.model');

const getUniqUsersDay = async (req, res) => {
  const dataset = await sequelize.query("SELECT date, COUNT(DISTINCT id) AS unique_users_per_day FROM dataset GROUP BY date", 
    {
      type: sequelize.QueryTypes.SELECT,
      raw: true,
    });
  res.send({ "data": dataset })
}

const getTotalUniqueUsers = async (req, res) => {
  const dataset = await sequelize.query("SELECT COUNT(DISTINCT email) AS total_unique_users FROM dataset", 
    {
      type: sequelize.QueryTypes.SELECT,
      raw: true,
    });
  res.send({ "data": dataset })
}

const getNewReturningUsers = async (req, res) => {
  const dataset = await sequelize.query("SELECT date, email, COUNT(distinct email) AS new_user, COUNT(email) AS returning_user FROM dataset GROUP BY date, email", 
    {
      type: sequelize.QueryTypes.SELECT,
      raw: true,
    });
  let byDay = {};
  dataset.forEach((row) => {
    if (byDay[row.date] === undefined) {
      byDay[row.date] = { new_user: 0, returning_user: 0}
    }
    byDay[row.date]["new_user"] += row.new_user;
    byDay[row.date]["returning_user"] += row.returning_user;
  })
  res.send({ "data": byDay })
}

const getTotalNewReturningUsers = async (req, res) => {
  const dataset = await sequelize.query("SELECT date, email, COUNT(distinct email) AS new_user, COUNT(email) AS returning_user FROM dataset GROUP BY date, email", 
    {
      type: sequelize.QueryTypes.SELECT,
      raw: true,
    });
  let total = { 'new_user': 0, 'returning_user': 0 };
  dataset.forEach((row) => {
    total.new_user += row.new_user
    total.returning_user += row.returning_user
  })
  res.send({ "data": total })
}

const getBusyDay = async (req, res) => {
  const dataset = await sequelize.query("SELECT DATE, COUNT(id) AS traffic FROM dataset GROUP BY DATE ORDER BY traffic DESC LIMIT 1", 
    {
      type: sequelize.QueryTypes.SELECT,
      raw: true,
    });
  res.send({ "data": dataset })
}

const getBusyHour = async (req, res) => {
  const dataset = await sequelize.query("SELECT hour(login_hour) as hour, COUNT(id) AS traffic FROM dataset GROUP BY hour(login_hour) ORDER BY traffic LIMIT 1", 
    {
      type: sequelize.QueryTypes.SELECT,
      raw: true,
    });
  res.send({ "data": dataset })
}

const getTotalData = async (req, res) => {
  const dataset = await sequelize.query("SELECT count(*) as total_data FROM dataset", 
    {
      type: sequelize.QueryTypes.SELECT,
      raw: true,
    });
  res.send({ "data": dataset })
}

module.exports = {
  getUniqUsersDay, 
  getTotalUniqueUsers, 
  getNewReturningUsers,
  getTotalNewReturningUsers,
  getBusyDay,
  getBusyHour,
  getTotalData
}