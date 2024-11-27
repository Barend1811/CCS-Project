import sequelize from './dbConnection.js';
import Users from '../model/users.js';
import Accounts from '../model/accounts.js';

async function popDb() {

    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });

    await Users
        .sync()
        .then(() => {
            console.log("User table succesfully added to database.")
        })
        .catch((err) => {
            console.log(err)
        });

    try {
        await Users.create({ name: 'testCompany', email: 'test@company.com', password: 'testing.123' });
        console.log("User table succesfully populated.")
    }
    catch (err) {
        console.log(err)
    }

    await Accounts
        .sync()
        .then(() => {
            console.log("Accounts table succesfully added to database.")
        })
        .catch((err) => {
            console.log(err)
        });

    try {
        await Accounts.create({ name: 'testCompany', email: 'test@company.com', sortCode: "123456", accountNumber: "12345678" });
        console.log("Accounts table succesfully populated.")
    }
    catch (err) {
        console.log(err)
    }

}

export default popDb;
