/////////////////////DEPENDENCIES//////////////////////////////////////////////
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

mongoose.connect('mongodb://localhost/weconnect', function () {
    console.log('WeConnect connection established!!!');
});

const Employee = require('./models/employees.js');
const Employer = require('./models/employers.js');
const Project = require('./models/projects.js').Project;

app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname +'/node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//////////////////////////END OF DEPENDENCIES/////////////////////////////////
///////////////USER AUTHEN MIDDLEWARE/////////////////////
app.use(expressSession({
    secret: 'thisIsASecret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.use(new LocalStrategy(function (username, password, done) {
    if ((username === 'john') && (password === 'password')) {
        return done(null, {
            username: username,
            id: 1
        });
    } else {
        return done(null, false);
    }
}));
///////////////END OF USER AUTHEN MIDDLEWARE/////////////////////






//////////////////////////////ROUTES//////////////////////////////////////////
///////////////////EMPLOYEE ROUTES///////////////////
// Fetches all employees from the database
app.get('/employees', function (req, res, next) {
    Employee.find({}, handler(res, next));
});
// Adds an employee to the employees collection in the database
app.post('/employees', function (req, res, next) {
    Employee.create(req.body, handler(res, next));
});
// Deletes an employee from the database
// app.delete('/employee/:employeeId', function (req, res, next) {
//     let employeeId = req.params.employeeId;
//     Employee.findByIdAndRemove(employeeId, handler(res, next));
// });
// // Edits an employee in the database
// app.put('/employee/:employeeId/update', function (req, res, next) {
//     let employeeId = req.params.employeeId,
//         key = req.body.key,
//         val = req.body.val;
//     var updateObject = {};
//     updateObject[key] = val;

//     Employee.findByIdAndUpdate(employeeId, updateObject, {
//         new: true
//     }, handler(res, next));
// });
// // Gets one user from the database
// app.get('/employee/:employeeId', function (req, res, next) {
//     let employeeId = req.params.employeeId;

//     Employee.findById(employeeId, handler(res, next));
// });

/////////////////// END OF EMPLOYEE ROUTES////////////








///////////////////////////// EMPTY SPACE//////////////////////////////////////











///////////////////EMPLOYER ROUTES///////////////////
// Fetches all employers from the database
app.get('/employers', function (req, res, next) {
    Employer.find({}, handler(res, next));
});


// Adds an employer to the employers collection in the database
app.post('/employers', function (req, res, next) {
    Employer.create(req.body, handler(res, next));
});

// Deletes an employer from the database
app.delete('/employer/:employerId', function (req, res, next) {
    let employerId = req.params.employerId;
    Employer.findByIdAndRemove(employerId, handler(res, next));
});
// Edits an employer in the database
app.put('/employer/:employerId/update', function (req, res, next) {
    let employerId = req.params.employerId,
        key = req.body.key,
        val = req.body.val;
    var updateObject = {};
    updateObject[key] = val;

    Employer.findByIdAndUpdate(employerId, updateObject, {
        new: true
    }, handler(res, next));
});
// Gets one user from the database
app.get('/employer/:employerId', function (req, res, next) {
    let employerId = req.params.employerId;

    Employer.findById(employerId, handler(res, next));
});

/////////////////// END OF EMPLOYER ROUTES////////////







//////////////////////////EMPTY SPACE//////////////////////







///////////////////PROJECT ROUTES////////////
// Fetches all projects from the database
app.get('/projects', function (req, res, next) {
    Project.find({}, handler(res, next));
});
// Deletes an project from the database
app.delete('/project/:projectId', function (req, res, next) {
    let projectId = req.params.projectId;
    Project.findByIdAndRemove(projectId, handler(res, next));
});
// Edits an project in the database
app.put('/project/:projectId/update', function (req, res, next) {
    let projectId = req.params.projectId,
        key = req.body.key,
        val = req.body.val;
    let updateObject = {};
    updateObject[key] = val;

    Project.findByIdAndUpdate(projectId, updateObject, {
        new: true
    }, handler(res, next));
});
// Gets one project from the database
app.get('/project/:projectId', function (req, res, next) {
    let projectId = req.params.projectId;

    Project.findById(projectId, handler(res, next));
});
// Create new project and add it to employer allProjects array
app.post('/projects/employer/:employerId', function (req, res, next) {
    let employerId = req.params.employerId;
    Project.create(req.body, function(err, project) {
      console.log(project);
      let updateObj = { $push: { allProjects: project } };
      Employer.findByIdAndUpdate(employerId, updateObj, { new: true }, function() {
        console.log(project);
        res.send(project);
      });
    });
});
// Add project to employee allProjects array

app.post('/projects/employee/:employeeId/:projectId', function (req, res, next) {
    let employeeId = req.params.employeeId,
    projectId = req.params.projectId;
    Project.findById(projectId, function(err, project) {
      project.isTaken = true;
      project.save();
      let updateObj = {$push: {allProjects: project}};
      Employee.findByIdAndUpdate(employeeId, updateObj, {new: true}, function() {
        console.log(project);
        res.send(project);
      });
    });
});

/////////////////DEV ROUTES/////////
// Adds an project to the projects collection in the database
app.post('/projects', function (req, res, next) {
    Project.create(req.body, /*handler(res, next)*/ function(err, project) {
      console.log(project);
      res.send(project);
    });
});

app.delete('/employers', function(req, res, next) {
  // Employer.find({}, function(err, employers) {
  //   employers.remove();
  //   res.send(employers);
  // });
  mongoose.connection.db.dropCollection('employers', function(err, employers) {
    res.send(employers);
  });
});
app.delete('/employees', function(req, res, next) {
  // Employee.find({}, function(err, employees) {
  //   employees.remove();
  //   res.send(employees);
  // });
  mongoose.connection.db.dropCollection('employees', function(err, employees) {
    res.send(employees);
  });
});
app.delete('/projects', function(req, res, next) {
  // Project.find({}, function(err, projects) {
  //   projects.remove();
  //   res.send(projects);
  // });
  mongoose.connection.db.dropCollection('projects', function(err, projects) {
    res.send(projects);
  });
});

app.all('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
//////////////////END OF DEV ROUTES///////////

/////////////USER AUTHEN ROUTES//////////////
app.post('/login', passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/login'
    // session: false
}));

// app.post('/login', function (req, res) {
//     console.log(req.body);
//     res.send(req.body);
// });

app.get('/success', function (req, res) {
    if (req.isAuthenticated()) {
        res.send('Hey, ' + req.user + ', hello from the server!');
    } else {
        res.redirect('/login');
    }
});

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/logout', function (req, res) {
    req.logout();
    res.send('Logged out!');
});
////////////////END OF USER AUTHEN ROUTES////

///////////////////END OF PROJECT ROUTES////////////
////////////////////////////END OF ROUTES/////////////////////////////////////







///////////////////////////////HANDLERS///////////////////////////////////////
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});

function handler(res, next) {
    return function (err, data) {
        if (err) {
            return next(err);
        }
        // console.log(data);
        res.send(data);
    };
}
///////////////////////////////END OF HANDLERS////////////////////////////////







app.listen(8000, function () {
    console.log('yo yo yo, on 8000!!');
});
