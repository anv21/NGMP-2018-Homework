'use strict';
import mongoose from 'mongoose';
import db from '../database/connect';
import {USER_DATA} from "../constants/const";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  lastModifiedDate: Date
});

UserSchema.pre('save', function(next) {
  if (!this.lastModifiedDate) this.lastModifiedDate = new Date;
  next();
});

const User = db.model("User", UserSchema);

User.collection.insertMany(USER_DATA, (err, r) => {
  console.log(err)
});

module.exports = User;