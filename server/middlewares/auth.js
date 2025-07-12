import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.id) {
            return res.json({ success: false, message: 'Invalid Token. Please Login Again' });
        }

        req.body.userId = decoded.id;
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export default userAuth;
