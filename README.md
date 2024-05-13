# Srun_Checker

This software is designed to batch validate stored account credentials to ensure they are still valid. It processes a list of account-password pairs, formatted as "account:password" per line, to verify their validity. Work better for Srun 深澜 campus WIFI login. Can also work on other targets.

## Prerequisites

- Node.js installed on your machine.
- Basic knowledge of JavaScript and Node.js environment.
- Familiarity with `node-fetch`, `fs`, and `readline` modules, as they are used extensively.
- Your accounts and passwords have to be like this, in this form.
```bash
R2055:8anwkh
R2056:2uio1u
R2077:dnawwa12
R2081:iopjaiow
```

## Installation

1. **Clone this repository**:
   Download or clone this repository to your local machine.

2. **Download node.js**:
    Make sure you download the latest version(https://nodejs.org/en/download)

3. **Install Dependencies**:
   Navigate to the project directory and run the following command to install all required dependencies:

   ```bash
   npm install node-fetch figlet
   ```
## Usage
    node TC1.0.js
## Steps to Modify and Run the Program
If you're unfamiliar with how to modify the program for your environment or retrieve the necessary URL for requests:

Refer to the Srun_Hunter README.md, which includes detailed instructions on obtaining your required URL and modifying the program to run on your computer.

## Customization
Modify the URL and request body in the tryPasswords function to match your specific environment requirements. Detailed comments are included in the script from 'From here' to 'To there' indicating where to make changes.

## Features
Reads account and password pairs: From a file named data.csv(you can change it).
Automates validation: Uses HTTP POST requests to validate credentials.
Identifies valid accounts: Based on the server's response to the reset requests.
## FAQ
1. What if it fails to validate a password?

It might be due to network issues, incorrect account details, or server-side changes. Check the account details and try again.

2. How to resolve script errors?

Make sure all dependencies are installed, and Node.js is correctly set up. Check the console for specific error messages.

## License

Under Apache2 license. Copyright 2024 JasonL111.

Use figlet.js, which is licensed under MIT license. See detail in License file.
