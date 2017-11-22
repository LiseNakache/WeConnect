const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const projectSchema = require('./models/projects.js').projectSchema;
const imageSchema = new Schema({
  url: String,
  title: String,
  desc: String
});


const projectSchema = new Schema({
  title: String,
  type: String,
  images: [imageSchema],
  description: String,
  // currentProjects: [String],
  // finishedProjects: [String],
  dateJoined: Date,
  skills: [String]
});


// const companySchema = new Schema({});

const employerSchema = new Schema({
  username: String,
  name: String,
  comapanyName: String,
  location: String,
  image_url: String,
  description: String,
  allProjects: [projectSchema],
  // currentProject: String,
  // currentProjects: [String],
  // finishedProjects: [String],
  // dateJoined: Date,
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
