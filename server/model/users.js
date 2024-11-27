import { DataTypes, sql } from '@sequelize/core';
import sequelize from '../config/dbConnection.js';
import bcrypt from 'bcrypt';

const Users = sequelize.define('Users', {
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
        validate: {
            isEmail: {
                msg: "Must be a valid email address",
            }
        },
        allowNull: false,
        defaultValue: 'notfake@email.com'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Password.123'
    },
},
    {
        hooks: {
            beforeCreate: async (user) => {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt)
            }
        }


    },
)


export default Users;