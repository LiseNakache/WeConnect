const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    dateStarted : Date,
    skills : [String],
    EmployerUserName: String,
    EmployeeUserName: String,
    isTaken:Boolean
});

const Project = mongoose.model('Project', projectSchema);

module.exports = {
    Project:Project,
    projectSchema:projectSchema
};
