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

const createContact = async (request, response) => {
  const contact = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    favoriteColor: request.body.favoriteColor,
    birthday: request.body.birthday
  };
  const dbResponse = await mongoCollection().insertOne(contact);
  if (dbResponse.acknowledged) {
    response.status(201).json(dbResponse);
  } else {
    response
      .status(500)
      .json(dbResponse.error || 'Some error occurred while creating the contact.');
  }
};

const updateContact = async (request, response) => {
  const userId = new ObjectId(request.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    favoriteColor: request.body.favoriteColor,
    birthday: request.body.birthday
  };
  const dbResponse = await mongoCollection().replaceOne({ _id: userId }, contact);
  console.log(dbResponse);
  if (dbResponse.modifiedCount > 0) {
    response.status(204).send();
  } else {
    response
      .status(500)
      .json(dbResponse.error || 'Some error occurred while updating the contact.');
  }
};

const deleteContact = async (request, response) => {
  const userId = new ObjectId(request.params.id);
  const dbResponse = await mongoCollection().deleteOne({ _id: userId }, true);
  console.log(dbResponse);
  if (dbResponse.deletedCount > 0) {
    response.status(204).send();
  } else {
    response
      .status(500)
      .json(dbResponse.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = { getAll, getById, createContact, updateContact, deleteContact };
