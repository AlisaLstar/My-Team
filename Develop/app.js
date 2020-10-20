const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { deflateSync } = require("zlib");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
const employee = [];
const stopPromt= [{
    type: "confirm", 
    
    name: "stop",
    message: "Would you like ot exist?"
}];
const typeOfEmployee = [
    {
        type: "list", 
        choices: ["Manager", "Engineer", "Intern"],
        name: "role",
        message: "What is your role?"
    
    }, 
];
const managerQuestions = [
    {
        type: "input", 
        name: "name",
        message: "What is your name?"
    
    }, 
    {
        type: "input", 
        name: "id",
        message: "What is your id?"
    
    }, 
    {
        type: "input", 
        name: "email",
        message: "What is your email?"
    
    }, 
    {
        type: "input", 
        name: "officeNumber",
        message: "What is your office number?"
    
    }, 
];

const engineerQuestions = [
    {
        type: "input", 
        name: "name",
        message: "What is your name?"
    
    }, 
    {
        type: "input", 
        name: "id",
        message: "What is your id?"
    
    }, 
    {
        type: "input", 
        name: "email",
        message: "What is your email?"
    
    }, 
    {
        type: "input", 
        name: "github",
        message: "What is your github username?"
    
    }, 
];

const internQuestions = [
    {
        type: "input", 
        name: "name",
        message: "What is your name?"
    
    }, 
    {
        type: "input", 
        name: "id",
        message: "What is your id?"
    
    }, 
    {
        type: "input", 
        name: "email",
        message: "What is your email?"
    
    }, 
    {
        type: "input", 
        name: "school",
        message: "What is your school?"
    
    }, 
];

// collect input
const collectInput = (input = []) => {
    let role;

    return inquirer.prompt(typeOfEmployee)
    
    .then(function(answer){
        role = answer.role;
       if(answer.role === "Manager"){
           return inquirer.prompt(managerQuestions);
       }
       if(answer.role === "Engineer"){
        return inquirer.prompt(engineerQuestions);
    }
     if(answer.role === "Intern"){
        return inquirer.prompt(internQuestions);
    }
    
    console.log(answer);
    })
    .then(function(answer){
        let employee;
        if(role === "Manager"){
            employee = new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
        } else if (role === "Engineer"){
            employee = new Engineer(answer.name, answer.id, answer.email,answer.github);
        } else {
            employee = new Intern(answer.name, answer.id, answer.email, answer.school)
        }
        input.push(employee);
        return inquirer.prompt(stopPromt);
    })
    .then(function(answer){
        if(answer.stop){
            return;
        }
        return collectInput(input);
    })
    .then(function(){
        console.log(input);
        return render(input);
    })
    .catch(function(error){
        console.log(error)
    });

}

collectInput();