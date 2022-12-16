const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const bp = require("body-parser")
const cors = require('cors')
const { ObjectId } = require('mongodb')
dotenv.config()

const { getDb, connectToDb } = require('./db')

const { urlencoded } = bp

const app = express()

app.use(cors({
    methods: ['GET', 'PATCH', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

let db

connectToDb((err) => {
    if (!err) {
        app.listen('5000', () => {
            console.log('App Listening on port 5000')
        })
        db = getDb()
    }
})

app.post('/', async (req, res) => {
    try {
        const { zipCode } = req.body
        console.log('req.body', req.body)
        const seller_zip_code_prefix = zipCode
        if (!seller_zip_code_prefix) return res.status(400).json({ errorMessage: 'Please enter all required fields ' })

        const existingUser = await db.collection('olist_sellers_dataset').findOne({ seller_zip_code_prefix })
        if (!existingUser) {
            return res.status(401).json({ errorMessage: "User doesn't exist" })
        }
        res.json({ token: existingUser })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})

app.put('/account/:id', async (req, res) => {
    const updates = req.body
    try {
        if (ObjectId.isValid(req.params.id)) {
            const result = await db.collection('olist_sellers_dataset')
                .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
            res.status(200).json(result)
        } else {
            res.status(500).json({ error: 'Could not update the sellers info' })
        }

    } catch (error) {
        res.status(500).json({ error: 'Could not update the sellers info' })

    }
})

app.get('/order_items', async (req, res) => {
    let orders = []

    let offset = +req.query?.offset;
    const defaultLimit = 20;

    let limit = +req.query?.limit;
    if (limit > 100 || limit < 20) {
        limit = defaultLimit;
    }

    try {
        // order_item_id: "1"
        // order_products: [{… }]
        // price: "199.00"
        // product_id: "c777355d18b72b67abbeef9df44fd0fd"
        // shipping_limit_date: "2018-01-18 14:48:30"
        // _id: "6398cc3e3a624c005eb20872"

        

        await db.collection('olist_order_items_dataset')
            .aggregate([
                {
                    $lookup: {
                        from: 'olist_products_dataset',
                        localField: 'product_id',
                        foreignField: 'product_id',
                        as: 'order_products'
                    },
                },
                {
                    $project: {
                        "order_item_id": 1,
                        "product_id": 1,
                        "order_products.product_category_name": 1,
                        "price": 1,
                        "shipping_limit_date": 1
                    }
                }

            ])
            .skip(offset > 0 ? ((offset - 1) * limit) : 0)
            .limit(limit).forEach((order) => {
                orders.push(order);
            });
        const totalDb = await db.collection('olist_order_items_dataset').count();

        res.status(200).json({
            data: orders,
            total: totalDb,
            limit: limit,
            offset: offset
        });
    }
    catch (err) {
        res.status(500).json({ error: 'Could not fetch the document', err })
    }
})

app.delete('/order_items/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        if (ObjectId.isValid(req.params.id)) {
            const result = await db.collection('olist_order_items_dataset')
                .deleteOne({ _id: new ObjectId(req.params.id) })
            res.status(200).json(result)
        } else {
            res.status(500).json({ error: 'Could not delete sellers details' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not delete sellers details' })
    }
})

module.exports = app
// {zipCode: '04195'}