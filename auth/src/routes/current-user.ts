import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();
//checking if the user is signed in via cookie.
router.get('/api/users/currentuser', (req, res) => {
    if (!req.session || !req.session.jwt) {
        return res.send({ currentUser: null });
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
        res.send({ currentUser: payload });
    }
    catch (err) {
        res.send({ currentUser: null });
    }
});

export { router as currentUserRouter };