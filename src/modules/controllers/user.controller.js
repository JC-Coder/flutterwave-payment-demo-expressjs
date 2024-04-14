import axios from 'axios'
import { catchAsync } from '../../common/utils/errorHandler.js'
import { ENVIRONMENT } from '../../common/config/environment.js'

const FLUTTERWAVE_URLS = {
    createPayment: 'https://api.flutterwave.com/v3/payments',
}

const baseAxiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ENVIRONMENT.FLUTTERWAVE.SECRET_KEY}`,
    },
})

const user = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
}

const transaction = {
    id: 'txnId',
    amount: 100,
    currency: 'NGN',
    description: 'Sample transaction',
}

const product = {
    id: 1,
    name: 'Pied Piper',
    description: 'Pied Piper',
    price: 100,
    currency: 'NGN',
    image: 'http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png',
}

const createUniqueReference = () => {
    const timestamp = Date.now()
    const randomSuffix = Math.floor(Math.random() * 10000)
    return `txn_${timestamp}_${randomSuffix}`
}

export const createPaymentLink = catchAsync(async (req, res) => {
    console.log('request start')

    try {
        const paymentUrl = await baseAxiosInstance.post(
            FLUTTERWAVE_URLS.createPayment,
            {
                tx_ref: createUniqueReference(),
                amount: transaction.amount,
                currency: transaction.currency,
                redirect_url: 'http://localhost:3000/user/flutter-callback',
                meta: {
                    userId: user.id,
                    transactionId: transaction.id,
                    product,
                },
                customer: {
                    email: user.email,
                },
                customizations: {
                    title: 'JC CODER - THE INDABOSKI BAHOSE',
                    logo: 'https://iili.io/Jv7HBpf.jpg',
                },
            }
        )

        console.log('response', paymentUrl)

        return res.status(200).json({
            message: 'success',
            data: paymentUrl.data,
        })
    } catch (error) {
        console.log('error', error)
    }
})

export const flutterCallback = catchAsync(async (req, res) => {
    try {
        console.log('request headers', req.headers)
        console.log('request body', req.body)
        console.log('request query', req.query)

        const result = await verifyTransaction(req.query.transaction_id)

        return res.status(200).json({
            message:'success',
            data: result,
        })
    } catch (error) {
        console.log('error', error)
    }
})

export const flutterWebhook = catchAsync(async (req, res) => {
    try {
        console.log('================ webhook request start ================')
        console.log('request headers', req.headers)
        console.log('request body', req.body)
        console.log('request query', req.query)

        await verifyTransaction(req.body.data.id)

        return res.status(200).json('success')
    } catch (error) {
        console.log('error', error)
    }
})

async function verifyTransaction(id) {
    try {
        console.log(`===== verifying transaction started id: ${id}====`)
        const response = await baseAxiosInstance.get(
            `https://api.flutterwave.com/v3/transactions/${id}/verify`
        )

        console.log('response', response.data)

        console.log(`===== verifying transaction finished id: ${id}====`)

        return response.data
    } catch (error) {
        console.log('error', error)
    }
}

