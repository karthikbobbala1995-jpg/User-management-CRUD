const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    employeeName:{
        type:String
    },
    employeeRole:{
        type:String
    },
    employeeGender:{
        type:String
    },
    employeeSalary:{
        type:String
    },
    employeeDob:{
        type:String
    },
    employeePhno:{
      type:String
    }
});

const User = mongoose.model('Employee',employeeSchema);

module.exports = User
