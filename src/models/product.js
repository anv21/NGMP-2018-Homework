'use strict';
import mongoose from 'mongoose';
import db from '../database/connect';
import {PRODUCT_DATA} from "../constants/const";

const ProductSchema = new mongoose.Schema({
  name: String,
  lastModifiedDate: Date
});

ProductSchema.pre('save', function(next) {
  if (!this.lastModifiedDate) this.lastModifiedDate = new Date;
  next();
});

const Product = db.model("Product", ProductSchema);

Product.collection.insertMany(PRODUCT_DATA, (err, res) => {
  console.log(err)
});

module.exports = Product;