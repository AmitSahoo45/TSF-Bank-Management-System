const UserModel = require('../models/UserModel');
const { StatusCodes } = require('http-status-codes');

const CreateUser = async (req, res) => {
    try {
        await UserModel.create(req.body);
        res.status(StatusCodes.CREATED).json({
            message: 'User created successfully'
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            success: false
        })
    }
}

const GetAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(StatusCodes.OK).json({
            users,
            success: true
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            success: false
        })
    }
}

const getSingleUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(StatusCodes.OK).json({
            user,
            success: true
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            success: false
        })
    }
}

const TransferMoney = async (req, res) => {
    
}

module.exports = {
    CreateUser,
    GetAllUsers,
    getSingleUser,
    TransferMoney
}


