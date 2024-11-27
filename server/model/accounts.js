import { DataTypes, sql } from '@sequelize/core';
import sequelize from '../config/dbConnection.js';
import 'dotenv/config'
import Cryptr from 'cryptr';

const Accounts = sequelize.define('Accounts', {
    uuid: {
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID.V4,
        defaultValue: sql.uuidV4,
        allowNull: false,

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'John Doe'
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        defaultValue: 'notfake@email.com'
    },
    sortCode: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '123456'
    },
    accountNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '12345678'
    },
},
    {
        hooks: {
            beforeCreate: (user) => {
                const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
                user.sortCode = cryptr.encrypt(user.sortCode);
                user.accountNumber = cryptr.encrypt(user.accountNumber);
            }
        }

    },
)

export default Accounts;