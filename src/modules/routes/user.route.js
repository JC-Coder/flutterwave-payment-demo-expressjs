import { Router } from 'express'
import {
    createPaymentLink,
    flutterCallback,
    flutterWebhook,
} from '../controllers/user.controller.js'

const router = Router()

export const userRoutes = () => {
    /**
     * get user
     */
    router.get('/payment-link', createPaymentLink)

    router.get('/flutter-callback', flutterCallback)

    router.post('/flutter-webhook', flutterWebhook)

    return router
}
