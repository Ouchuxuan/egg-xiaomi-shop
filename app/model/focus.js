'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const date = new Date();

  const FocusSchema = new Schema({
    title: {
      type: String,
    },
    type: {
      type: Number,
    },
    focus_img: {
      type: String,
    },
    link: {
      type: String,
    },
    sort: {
      type: Number,
    },
    status: {
      type: Number,
      default: 1,
    },
    add_time: {
      type: Number,
      default: date.getTime(),
    },
  });
  return mongoose.model('Focus', FocusSchema, 'focus');
};
