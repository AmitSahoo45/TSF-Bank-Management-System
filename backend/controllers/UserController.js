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
            success: true,
            nBHits: users.length,
            users
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
    const {
        body: { amount, sender },
        params: { id: reciever }
    } = req

    try {
        const user = await UserModel.findById(sender);
        const recieverUser = await UserModel.findById(reciever);
        if (user._id == recieverUser._id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'You can not transfer money to yourself',
                success: false
            })
        } else if (user.currentBalance < amount) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Insufficient Balance',
                success: false
            })
        } else {
            user.currentBalance -= Number(amount);
            recieverUser.currentBalance += Number(amount);
            await user.save();
            await recieverUser.save();

            return res.status(StatusCodes.OK).json({
                message: 'Money transferred successfully',
                success: true
            })
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            success: false
        })
    }
}

module.exports = {
    CreateUser,
    GetAllUsers,
    getSingleUser,
    TransferMoney
}


