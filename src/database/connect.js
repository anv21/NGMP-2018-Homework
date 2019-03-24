'use strict';
import mongoose from 'mongoose';

const db = mongoose.createConnection('mongodb://localhost/myAppDB');

db.on('error', console.error);
db.once('open', function() {});

module.exports = db;