const mongodb = require('../db/client');
const ObjectId = require('mongodb').ObjectId;

const mongoCollection = () => {
  return mongodb.getDatabaseClient().db().collection('contacts');
};

const getAll = async (request, response) => {
  const result = await mongoCollection().find();
  result.toArray().then((lists) => {
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json(lists);
  });
};

const getById = async (request, response) => {
  const userId = new ObjectId(request.params.id);
  const result = await mongoCollection().find({ _id: userId });
  result.toArray().then((lists) => {
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json(lists[0]);
  });
};

module.exports = { getAll, getById };
