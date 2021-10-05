const creatingHTML = require('./jobs/src/generateHTML');
const Manager = require('./jobs/Manager');
const Engineer = require('./jobs/Enginner');
const Intern = require('./jobs/Intern.js');
const fs = require('fs');
const inquirer = require('inquirer');
const jobsArray = [];
const addManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'who is the manager?',
            validate: nameInput =>{
                if (nameInput) {
                    return true;
                }else{
                    console.log("Please enter the name of the manager")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the Manager ID',
            validate: nameInput =>{
                if (isNaN(nameInput)){
                    console.log("Please enter the manager ID")
                    return false;
                }else{
                    return true
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter email of the manager",
            validate: email =>{    
                valid  = test(email)
                if (valid) {
                    return true;
                } else {
                 console.log ('please enter the manager email')
                 return false;   
                }
            }
        },
        {
            type: 'input',
            name: 'phoneNumber',
            message: "please enter the manager office number",
            validate: nameInput => {
                if (isNaN(nameInput)){
                    console.log ('Please enter the manager number')
                    return false;
            } else {
                return true;
            }
            }
        }
    ])
    .then(inputManager =>{
        const { name, id, email, phoneNumber} = addManager;
        const manager = new Manager (name, id, email, phoneNumber);
    })
};
const addingEmployee = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: "please choose the employee role",
            choices:['Engineer', 'Intern']
        },
        {
            type: "input",
            name: 'name',
            message: "what is the employee name",
            validate: nameInput =>{
                if (nameInput) {
                    return true;
                }else{
                    return false;
                }
            }
        }, 
        {
            type: 'input',
            name: 'id',
            message: "please enter the employee ID",
            validate: nameInput => {
                if (isNaN(nameInput)){
                    console.log("please enter the employee ID")
                    return false;
                }else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter email of the employee",
            validate: email =>{    
                valid  = test(email)
                if (valid) {
                    return true;
                } else {
                 console.log ('please enter the employee email')
                 return false;   
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "Enter the employee github username",
            when:(input) => input.role === "Engineer",
            validate: nameInput =>{
                if (nameInput) {
                    return true;
                }else {
                    console.log ("please enter the employee github username")
                }
            }

        },
        {
            type: 'input',
            name: 'school',
            message: "Enter the intern school",
            when: (input) => input.role === "intern",
            validate: nameInput => {
                if (nameInput){
                    return true;
                }else{
                    console.log ("Please enter the intern school")
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmEmployee',
            message: "would you like to add any more about the team member",
            default: false
        }
    ])
    .then(employeeData => {
        let { name, id, email, github, school, confirmEmployee} = employeeData
        let employee;
        if (role ==="Engineer"){
            employee = new Engineer (name, id, email, github);
            console.log(employee);
        } else if (role === "Intern"){
            employee = new Intern (name, id, email, school);
            console.log(employee);
        }
        jobsArray.push(employee);
        if (confirmEmployee){
            return addingEmployee(jobsArray);
        }else {
            return jobsArray;
        }
    })
};