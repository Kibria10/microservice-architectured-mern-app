import express from 'express';

const router = express.Router();

router.get('/api/users/signup', (req, res) =>{
    res.send('Hello Peter.');
});

export {router as signupRouter};