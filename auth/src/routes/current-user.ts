import express from 'express';
import { currentUser } from '@kibria10/common';
const router = express.Router();
//checking if the user is signed in via cookie.
router.get('/api/users/currentuser', currentUser, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };