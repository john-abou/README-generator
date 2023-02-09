// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// Define the license options -- arrays with licence names and badge URLs. Populated by looping through array of objects.
const licenseNames = [];
const badgeURLs = [];
const licenseOptions = [
    {
      name: 'MIT License',
      value: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
    },
    {
      name: 'Apache License 2.0',
      value: '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
    },
    {
      name: 'GNU General Public License v3.0',
      value: '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
    },
    {
      name: 'None',
      value: ''
    }
  ];
licenseOptions.forEach( (array) => {
    licenseNames.push(array.name);
    badgeURLs.push(array.value);
});

// Define the questions asked to the user
const questions = [
    "Please enter the title of your project.", // Title
    "Please enter the description of your project.", // description
    "Please tell the user how to install your project.", // installation
    "Please tell the user how to use your project.", // usage
    "Please enter the license you'd like to use on your project.", // license
    "Please tell the user how to contribute to your project.", // Contributing
    "Please tell the user what tests need to be performed on their code", // tests
    "Please enter your github username", // questions
    "Please enter your email for further questions" // questions
];


// Create a function to initialize app
function init() {

    // Prompt user for input to generate README
    inquirer
    .prompt([{
        type: 'input',
        message: questions[0],
        name: 'title',
        },{
        type: 'input',
        message: questions[1],
        name: 'description',
        },{
        type: 'input',
        message: questions[2],
        name: 'installation',
        },{
        type: 'input',
        message: questions[3],
        name: 'usage',
        },{
        type: 'list',
        message: questions[4],
        name: 'license',
        choices: licenseNames,
        },{
        type: 'input',
        message: questions[5],
        name: 'contributing',
        },{
        type: 'input',
        message: questions[6],
        name: 'tests',
        },{
        type: 'input',
        message: questions[7],
        name: 'github',
        },{
        type: 'input',
        message: questions[8],
        name: 'email',
    }])
    .then((response) => {
        // store user input in variables to use in the markdown variable
        const {title, description, installation, usage, license, contributing, tests, github, email} = response;
        let licenseBadge = "";

        // Create a function that returns a license badge based on which license is selected
        // If there is no license, return an empty string
        function renderLicenseBadge(licenseInput) {
            if (licenseInput === 'MIT License') {
                licenseBadge = badgeURLs[0];
            } else if (licenseInput === 'Apache License 2.0') {
                licenseBadge = badgeURLs[1];
            } else if (licenseInput === 'GNU General Public License v3.0') {
                licenseBadge = badgeURLs[2];
            } else {
                licenseBadge = '';
            }
        }

        // Call the function to create the license badge
        renderLicenseBadge(license);

        // Use template literal to create a readme doc that updates with the user input
        const readME = `# ${title}

${licenseBadge}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Description
${description}

## Installation
${installation}

## Usage
${usage}

## License
This project is licensed under the ${license}.

## Tests
${tests}

## Contributing
${contributing}

## Questions
If you have any questions, please contact me at ${email} or visit my github page at https://github.com/${github} .

`                
        // Create README file using the fs module
        fs.writeFile('README.md', readME, (err) => err ? console.error(err) : console.log('Success!') )
    }); 
}

// Function call to initialize app
init();