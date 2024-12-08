import jwt from 'jsonwebtoken'

const generateToken = (payload) => {
    const token = jwt.sign(payload, `${process.env.AUTH_SECRET}`)
    return token
}

export default generateToken