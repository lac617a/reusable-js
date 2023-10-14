# reusable-js

![npm version](https://img.shields.io/badge/npm-v0.1.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Downloads](https://img.shields.io/npm/dt/reusable-js)
![GitHub stars](https://img.shields.io/github/stars/lac617a/reusable-js)
![GitHub forks](https://img.shields.io/github/forks/lac617a/reusable-js)
![GitHub issues](https://img.shields.io/github/issues/lac617a/reusable-js)
![GitHub pull requests](https://img.shields.io/github/issues-pr/lac617a/reusable-js)
![Maintenance](https://img.shields.io/maintenance/yes/2023)

## JavaScript Validator and utils Functions - light weight library

A lightweight library offering essential JavaScript validation and utility functions. Simplify your code with this versatile npm package.

## Installation and Usage

### To integrate this library:

Install the library with `npm install reusable-js`

### Tree-Shakeable ES Imports

For seamless integration into your project, employ tree-shakeable ES imports:

```javascript
import { Utils, Validartors, RegExPattern, Numerics, Strings } from 'reusable-js'
```

## Validator functions

Here is a list of the validators functions currently available and how to use them in your code base.

### 1. isPasswordMatched()

```javascript
// Import the necessary function from the library.
import { Validartors } from 'reusable-js'

// Example usage:
const password = 'mySecretPassword123'
const confirmPassword = 'mySecretPassword123'
const minLength = 8

// Call the function with the required arguments.
const error = new Validartors().isPasswordMatched(password, confirmPassword, minLength)

// Check the error object for validation results.
if (error.isTooShort) {
  console.error('Password is too short.') // Handle the error accordingly.
}

if (!error.isMatched) {
  // isMatched will be false if booth password are not equal.
  console.error('Passwords do not match.') // Handle the error accordingly.
}

// If there are no errors, the passwords are valid and matched.
```

### 2. isStrongPassword()

```javascript
// Import the necessary function from the library.
import { Validartors } from 'reusable-js'

// Example usage:
const password = 'MyStrongPassword123!'
const minChars = 2
const minSymbols = 2
const minNumbers = 2

// Call the function with the required arguments (and optional ones if needed).
const error = new Validartors().isStrongPassword(password, minChars, minSymbols, minNumbers)

// Check the error object for validation results.
if (!error.hasChar) {
  console.error('Password should contain at least 2 characters.') // Handle the error accordingly.
}

if (!error.hasSymble) {
  console.error('Password should contain at least 2 symbols.') // Handle the error accordingly.
}

if (!error.hasNumber) {
  console.error('Password should contain at least 2 numbers.') // Handle the error accordingly.
}

if (!error.hasUppercase) {
  console.error('Password should contain at least one uppercase letter.') // Handle the error accordingly.
}

// If there are no errors, the password is considered strong based on the provided criteria.
```

### 3. isValidEmail()

```javascript
// Import the necessary function from the 'reusable-js' package.
import { Validartors } from 'reusable-js'

// Example usage:
const emailToValidate = 'example@email.com'

// Call the function with the email address to validate.
const isEmailValid = new Validartors().isValidEmail(emailToValidate)

// Check the result to determine if the email address is valid.
if (isEmailValid) {
  console.log('The email address is valid.') // Handle the valid email case.
} else {
  console.error('Invalid email format. Please provide a valid email address.') // Handle the invalid email case.
}
```

### 4. isValidPhoneNumber()

```javascript
// Import the necessary functions and data from the library.
import { Validartors } from 'reusable-js'

// Example usage:
const phoneNumberToValidate = '01740000000' // Replace with the phone number you want to validate.
const locale = 'bn-BD' // Replace with the desired locale.

// Call the function with the phone number and locale.
const isPhoneNumberValid = new Validartors().isValidPhoneNumber(phoneNumberToValidate, locale)

// Check the result to determine if the phone number is valid.
if (isPhoneNumberValid) {
  console.log('The phone number is valid.') // Handle the valid phone number case.
} else {
  // Handle the invalid phone number case.
  console.error(
    'Invalid phone number format. Please provide a valid phone number'
  )
}
```

## Util function / Helper functions

Here is a list of the Util functions / Helper functions currently available and how to use them in your code base.

### 1. capitalize() - String manipulation

```javascript
// Import the necessary functions from the library.
import { Strings } from 'reusable-js'

// Example use case:
const inputString = 'hello world' // Replace with the string you want to capitalize.

// Call the function with the input string
const capitalizedString = new Strings().capitalize(inputString)

// Print the capitalized string
console.log('Capitalized String:', capitalizedString) // output 'Hello world';
```

### 2. capitalizeAll() - String manipulation

```javascript
// Import the necessary functions from the library.
import { Strings } from 'reusable-js'

// Example use case:
const inputString = 'hello world' // Replace with the string you want to capitalize.

// Call the function with the input string
const capitalizedString = new Strings().capitalizeAll(inputString)

// Print the capitalized string
console.log('Capitalized String:', capitalizedString) // output 'Hello World';
```

### 3. truncatedString() - String manipulation

```javascript
// Import the necessary functions from the library.
import { Strings } from 'reusable-js'

// Example use case:
const inputString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

// Optional: Define start and end positions for truncation (these are the default values used in this example).
const startPosition = 0 // Start position for truncation (default is 0)
const endPosition = 30 // End position for truncation (default is 30)

// Call the function with the input string and optional start and end positions.
const truncated = new Strings().truncatedString(inputString, startPosition, endPosition)

// Print the truncated string
console.log('Original String:', inputString)
console.log('Truncated String:', truncated) // Expected Output: Lorem ipsum dolor sit amet...
```

## How to Contribute to `reusable-js`

Thank you for considering contributing to `reusable-js` I welcome your contributions and have outlined the following steps to help you get started.

## Prerequisites

Before you start contributing, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/): - (v16.16.0) To run JavaScript/TypeScript code and manage dependencies using npm.
- [Git](https://git-scm.com/): To clone the repository and create branches for your contributions.

## Fork the Repository

[GitHub repository](https://github.com/lac617a/reusable-js)

## Clone the Repository

Open your terminal and run the following command to clone the repository to your local machine.

```bash
git clone git@github.com:lac617a/reusable-js.git
```

### Install Dependencies

Navigate to the project directory and install the project dependencies:

```bash
cd reusable-js
npm install
```

### Create a Branch

```bash
git checkout -b feature/add-new-functionality
```

### Make Changes

Make your desired changes or improvements to the library code. Ensure that your code follows the project's coding style and guidelines.

### Code Formatting and Linting

I have used Prettier and ESLint to maintain code consistency. Before committing your changes, run the following commands to format and lint your code:

```bash
npm run prettier   # Format code with Prettier
npm run lint     # Lint code with ESLint
```

### Test Your Changes

Before submitting a pull request, it's crucial to test your changes thoroughly. Run any provided tests and create new ones if necessary.<br> Make sure that the existing tests pass and that your new code doesn't introduce any regressions.

```bash
#Test command
npm run test
```

### Commit Your Changes

Once your changes are complete and tested, commit your changes with a clear and concise commit message:

```bash
git commit -m "feat: description of your changes"
```

### Push Your Changes

Push your changes to your forked repository on GitHub:

```bash
git push -u origin feature/add-new-functionality
```

### Create a Pull Request

Provide a detailed description of your changes in the pull request.

### Merge Your Pull Request

Once your pull request is approved, it will be merged into the main project. Congratulations, you've successfully contributed to `reusable-js`!

### Thank You

Thank you for your contribution to `reusable-js`! Your efforts help improve the library.