import express from 'express'
import pg from "pg";
import cors from 'cors'
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import verifyToken from './middleware/verifyToken.js';
import generateToken from './utils/generateToken.js'
import { getSession } from '@auth/express'

config()

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(cookieParser())

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'experimental',
    password: 'tejasnanoti1406',
    port: 5432,
})

const connectDB = async () => {
    await db
        .connect()
        .then(() => console.log("Database Connected"))
        .catch(err => console.log(err))
}

app.listen(5000, async () => {
    await connectDB();
    console.log('Server started on port 5000');
})

app.post('/new', async (req, res) => {
    try {
        console.log(req.body);
        
        const { user: { name, id, email, image } } = req.body

        const searchQuery = 'SELECT * FROM users WHERE email = $1'
        const searchResult = await db.query(searchQuery, [email])

        const payload = req.body.user

        const token = generateToken(payload)

        if (searchResult.rowCount > 0) {
            return res
                .status(200)
                .cookie('token', token, {
                    secure: true,
                    httpOnly: true,
                    sameSite: 'none'
                })
                .json({ user: payload })
        }

        const insertQuery = 'INSERT INTO users (name, id, email, image) VALUES ($1, $2, $3, $4)'
        const response = await db.query(insertQuery, [name, id, email, image])

        const newUser = response.rows[0]

        res
            .status(200)
            .cookie('token', token, {
                secure: true,
                httpOnly: true,
                sameSite: 'none'
            })
            .json({ user: newUser })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: 'Internal Server Error' })
    }
})

app.get('/auth/resource', async (req, res) => {
    try {
        const session = await getSession(req, {
            providers: []
        })

        // console.log(session.user);

        if (!session) {
            return res
                .status(401)
                .json({ message: "Unauthenticated" })
        }

        res
            .status(200)
            .json({ message: "Secret Message" })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
})

app.post('/logout', verifyToken, (req, res) => {
    res
        .clearCookie('token')
        .status(200)
        .json({ message: "Logged out successfully" })
})