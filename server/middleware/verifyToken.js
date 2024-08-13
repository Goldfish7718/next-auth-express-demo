import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const cookie = req.cookies['token']; 

    if (!cookie) {
        return res
            .status(401)
            .json({ message: "Unauthenticated" });
    }

    jwt.verify(cookie, `${process.env.AUTH_SECRET}`, (err, user) => {
        if (err) {
            console.log(err);
            
            return res
                .status(403)
                .json({ message: "Forbidden" });
        }

        req.user = user;
        next();
    });
};

export default verifyToken
