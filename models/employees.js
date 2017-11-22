const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const projectSchema = require('/models/projects.js').projectSchema;
// const imageSchema = new Schema({
//   url: String,
//   title: String,
//   desc: String
// });

const projectSchema = new Schema({
  title: String,
  type: String,
  description: String,
  skills: [String]
  // currentProjects: [String],
  // finishedProjects: [String],
  // images: [imageSchema],
  // dateJoined: Date,
});



const employeeSchema = new Schema({
  username: String,
  name: String,
  location: String,
  image_url: String,
  description: String,
  currentProject: String,
  skills: [String],
  allProjects: [projectSchema],
  // isAvail: Boolean,
  // dateJoined: Date,
  // finishedProjects: [String],
  // rank: Number,

});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
