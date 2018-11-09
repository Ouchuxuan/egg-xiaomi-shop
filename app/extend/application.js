'use strict';
const ObjectId = require('mongodb').ObjectID;
module.exports = {
  getObjectId(params) {
    return ObjectId(params);
  },
};

