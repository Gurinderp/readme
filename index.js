const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const api = require("./api");
const readMeGen = require("./genMd");

const questions = [
    inquirer.prompt([
        {
            message: "Enter your GitHub username:",
            name: "username"
        },
    ]).then(function (response){
        console.log(response.username);
        console.log(api.getUser(response.username));
        return api.getUser(response.username);
    }).then(function (val1){
        inquirer.prompt([
            {
                message: "Title of Project",
                name: "title"
            },
            {
                message: "What is the current version?",
                name: "version"
            },
            {
                message: "Description",
                name: "description"
            },
            {
                message: "Installation instructions",
                name: "installation"
            },
            {
                message: "How is this project used?",
                name: "usage"
            },
            {
                message: "Contributor names",
                name: "contributors"
            },
        ]).then(function (val2){
            fs.writeFile("README.md", readMeGen({ ...val1, ...val2}), function(err){
                if (err){
                    throw err;
                }
            })
        })
    })
];
