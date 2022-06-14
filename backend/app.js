require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')

const connectDB = require('./database/connect')

const UserRouter = require('./router/UserRouter')

app.get('/', (req, res) => {
    res.send('Welcome to Banking Management System')
})

app.use('/api/user', UserRouter)

app.use(errorHandler)
app.use(notFound)

const PORT = process.env.PORT || 8989;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () =>
            console.log(`Server is listening on port ${PORT}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();

