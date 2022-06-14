const express = require('express');
const router = express.Router();

const {
    CreateUser,
    GetAllUsers,
    getSingleUser,
    TransferMoney
} = require('../controllers/UserController')

router.post('/', CreateUser)
router.get('/all', GetAllUsers)
router.get('/:id', getSingleUser)
router.post('/transfer/:id', TransferMoney)

module.exports = router;