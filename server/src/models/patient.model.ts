'use strict';
import * as mongoose from 'mongoose';
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true},
  rasse: String,
  eigentuemer_vorname: String,
  eigentuemer_nachname: {type: String, required: true}
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;