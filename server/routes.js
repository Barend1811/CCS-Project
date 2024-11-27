import express from 'express'
const app = express()
import createDb from './config/createDb.js';
import popDb from './config/populateDb.js';
import Users from './model/users.js';
import 'dotenv/config'
import bcrypt from 'bcrypt'
import Cryptr from 'cryptr';
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
import jwt from 'jsonwebtoken'
import Accounts from './model/accounts.js';
import sequelize from './config/dbConnection.js';
//import modulr from '@api/modulr';
import sendgrid from "@sendgrid/mail"
const template_id = process.env.SENDGRID_TEMPLATE_ID;
sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

/*const authorization = (req, res) => {
    //Checks value of the coockie token
    const token = req.cookies.access_token;
    //Checks if token exists
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }
    try {
        //Verify whether token is authentic
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.email = data.email;
        return next()
    } catch {
        return res.status(403).json({ error: 'Invalid token' });
    }
};*/

app.get("/api/setup", async (req, res) => {
    try {
        //Creates Database if it doesn't exists
        await createDb();
        //Create table and populate it if it doesn't exists
        await popDb();
        res.status(200).json({ message: "Database is working" })
    }
    catch (err) {
        res.status(500).send(err);
    }
})

app.post("/api/login", async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        //Verify email
        const emailValid = await Users.findOne({ where: { email: email } });
        if (!emailValid) {
            // Error thrown when email is not found
            return res.status(404).json('Email not found');
        }
        const userData = await Users.findOne({ raw: true, where: { email: email } })
        const hashedPassword = userData.password

        // Verify password
        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (err) {
                //Error thrown when bcrypt error coccurs
                return res.status(404).json('Error comparing passwords');
            }
            if (result) {
                const userEmail = userData.email
                // Passwords match, authentication successful
                // Authenticate user with JSON Web Token
                const token = jwt.sign({ email: userEmail }, process.env.JWT_SECRET, { expiresIn: '10m' });
                //Should store JSON Web Token as an HTTP Same Site only coockie for security, however can't because using localhost causes issues.
                res.cookie("access_token", token, {
                    httpOnly: false,
                    sameSite: 'none',
                    secure: true,
                    maxAge: 300000
                    //secure: process.env.NODE_ENV === "production",
                })
                    .status(200)
                    .json({ email, token })

            } else {
                // Error thown when passwords don't match, authentication failed
                return res.status(500).json('Incorrect email and password combination');
            }
        });

    } catch (err) {
        // Handle general error
        return res.status(500).json('Sign in error: ' + err);
    }
})

app.get("/api/user", async (req, res) => {
    //Gets value of the cookie accees_token, will be null if it does not exist
    const token = req.cookies.access_token;
    //Checks if token has value, if it is null this code executes
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }
    try {
        //Verify token to get user email
        const data = jwt.verify(token, process.env.JWT_SECRET)
        const userEmail = data.email;
        //Use email to get data from database
        const account = await Accounts.findOne({ raw: true, where: { email: userEmail } })
        const userName = account.name
        const email = account.email
        //decrypt sort code and account number before return to frontend
        const sortcode = cryptr.decrypt(account.sortCode)
        const accountNumber = cryptr.decrypt(account.accountNumber)
        //return data to frontend with OK status code
        return res.status(200).send({ name: userName, email: email, sortcode: sortcode, accountNumber: accountNumber })
    } catch {
        //If token has value but is invalid and error is thrown wich is caught here
        return res.status(403).json({ error: 'Invalid token' });
    }
})

app.post("/api/user/edit", async (req, res) => {
    //Get sort code and account number values from frontend.
    //Use unincrypted values for API calls and verifications
    const code = req.body.sortCode
    const number = req.body.accountNumber
    //Store encryted values in database
    const cryptCode = cryptr.encrypt(code)
    const cryptNumber = cryptr.encrypt(number)
    const token = req.cookies.access_token;
    //Checks if token exists
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }
    try {
        //Verify token, just to get user email
        const data = jwt.verify(token, process.env.JWT_SECRET)
        const userEmail = data.email;
        //Use email to get data from database
        const account = await Accounts.findOne({ where: { email: userEmail } })
        const company = account.name
        //Both functions should work according to their documentaion
        //checkSortCode(code, number) <-----Function does not work, since API key is fake
        //checkCOP(code, number, company) <-----Function does not work, since account details and Authorisation Headers are fake
        //Run the above functions to make sure the information entered was correct before updating the database.
        //UPDATES the tabel with the new values  
        await sequelize.query(`UPDATE "Accounts" SET "sortCode" = '${cryptCode}', "accountNumber" = '${cryptNumber}' WHERE "email" = '${userEmail}'`)
        //Sends an automated email to the email adress registered with the account
        sendEmail(userEmail, company)
        return res.status(200).json({ message: "Account succesfully updated" })
    }
    catch (err) {
        // Handle general error
        return res.status(500).json('Account was not updated: ' + err);
    }
})

export default app;

async function sendEmail(
    email,
    name
) {

    await sendgrid.send({
        from: {
            email: "viljoenbarend001@gmail.com"
        },
        personalizations: [
            {
                to: [
                    {
                        "email": email
                    },
                ],
                dynamic_template_data:
                {
                    "companyName": name,
                }
            }
        ],
        "template_id": template_id
    })
}

/*
async function checkSortCode(sortCode, accountNumber) {
    var request = require('request');

    var headers = {
        'User-Agent': 'IBAN API Client/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    var options = {
        url: 'https://api.iban.com/clients/api/v4/sort/',
        method: 'POST',
        headers: headers,
        form: { 'api_key': process.env.SORTCODE_API_KEY, 'format': 'json', 'sortcode': sortCode, 'account': accountNumber }
    }


    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var data = JSON.parse(body);

            console.log(data.errors);

            console.log("Bank Name: " + data.bank_data.bank);
            console.log("Bank BIC: " + data.bank_data.bic);
            console.log("Bank City: " + data.bank_data.city);
            console.log("Bank Address: " + data.bank_data.address);
            console.log("Bank Zip: " + data.bank_data.zip);
            console.log("Bank Phone: " + data.bank_data.phone);
            console.log("Bank Country Name: " + data.bank_data.country);
            console.log("IBAN: " + data.account_data.iban);

        }
        else {
            return res.status(500).json({ error: 'Account and Sort Code combination is invalid' });
        }
    })

}

async function CheckCOP(sort, number, company) {

    modulr.auth('AuthorisationHeader')
    modulr.createOutboundCop({
        accountType: 'BUSINESS',
        paymentAccountId: 'A123AAA4',
        sortCode: sort,
        accountNumber: number,
        name: company
    })
        .then(({ data }) => console.log(data))
        .catch(err => console.error(err));
}*/
