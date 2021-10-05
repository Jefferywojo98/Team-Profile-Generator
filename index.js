const creatingHTML = require('./src/generateHTML');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Enginner');
const Intern = require('./lib/Intern.js');
const fs = require('fs');
const inquirer = require('inquirer');
const jobsArray = [];
const addManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'who is the manager?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the Manager ID',
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter email of the manager",
        },
        {
            type: 'input',
            name: 'phoneNumber',
            message: "please enter the manager office number",
        }
    ])
    .then(inputManager =>{
        const { name, id, email, phoneNumber} = inputManager;
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
        }, 
        {
            type: 'input',
            name: 'id',
            message: "please enter the employee ID",
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter email of the employee",
        },
        {
            type: 'input',
            name: 'github',
            message: "Enter the employee github username",
            when:(input) => input.role === "Engineer",
        },
        {
            type: 'input',
            name: 'school',
            message: "Enter the intern school",
            when: (input) => input.role === "intern",
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
const writeFile = data => {
    fs.writeFile('./index.html', data, err => {
        if (err) {
            comsole.log(err)
            return
        } else {
            console.log("your profile was a success!")
        }
    })
};
addManager()
.then(jobsArray =>{
    return generateHTML(jobsArray);
})
.then(pageHTML => {
    return writeFile(pageHTML);
})
.catch(err => {
    console.log(err)
});