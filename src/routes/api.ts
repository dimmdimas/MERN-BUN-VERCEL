import express, { Router } from 'express'
import authController from '../controller/auth.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

router.get('/tes', (req, res) => {
    res.status(200).json({
        massage: Bun.env.PORT
    })
})

router.post('/register', authController.Register)
router.post('/login', authController.Login)
router.get('/me', authMiddleware, authController.Me)

export default router;