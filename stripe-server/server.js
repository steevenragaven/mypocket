const express = require('express');
const stripe = require('stripe')('sk_test_51PWIxYRx1RunhJ8tTjTfzWO7YIDD0CbsHiNot0hA8UsNIGjoO5F290VFsN3GmM7QxfLVCiYirHjWngNNvM6qW0Xr00rzpUVN5C'); // Replace with your Stripe secret key
const cors = require('cors');
const pool = require('./db'); // Ensure this points to your database connection setup

const app = express();

app.use(express.static('.'));
app.use(express.json());
app.use(cors());

app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in cents
            currency: 'mur',
            automatic_payment_methods: { enabled: true }
        });

        res.send({
            client_secret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.post('/checkout', async (req, res) => {
    const { userId, cartItems, paymentMethodId, action } = req.body;

    console.log('Received request at /checkout endpoint');
    console.log('Request body:', req.body);

    if (!userId || !Array.isArray(cartItems) || cartItems.length === 0 || !paymentMethodId || !action) {
        console.log('Invalid payload:', {
            userId,
            cartItems,
            paymentMethodId,
            action,
        });
        return res.status(400).json({ message: 'Invalid payload' });
    }

    let client;
    try {
        client = await pool.connect();

        // Calculate the total amount
        let totalAmount = 0;
        const cartItemsWithPrices = [];

        for (const cartItem of cartItems) {
            console.log('Processing cart item:', cartItem);
            for (const item of cartItem.items) {
                console.log('Processing product item:', item);
                const productResult = await client.query('SELECT * FROM products WHERE productid = $1', [item.product_id]);
                const product = productResult.rows[0];
                console.log('Product details:', product);

                if (!product || product.stockquantity < item.quantity) {
                    console.log('Product out of stock or does not exist:', product);
                    client.release();
                    return res.status(400).json({ message: 'Some items are out of stock' });
                }

                const itemTotal = item.quantity * product.price;
                totalAmount += itemTotal;

                cartItemsWithPrices.push({
                    ...item,
                    price: product.price,
                });
            }
        }

        console.log('Total amount calculated:', totalAmount);

        // Create order
        const orderResult = await client.query(
            'INSERT INTO orders (userid, totalprice, status, action) VALUES ($1, $2, $3, $4) RETURNING orderid',
            [userId, totalAmount, 'Pending', action]
        );

        const orderId = orderResult.rows[0].orderid;
        console.log('Order created with ID:', orderId);

        // Insert order items
        for (const item of cartItemsWithPrices) {
            await client.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
                [orderId, item.product_id, item.quantity, item.price]
            );

            // Update product stock
            await client.query(
                'UPDATE products SET stockquantity = stockquantity - $1 WHERE productid = $2',
                [item.quantity, item.product_id]
            );
        }

        console.log('Order items inserted and stock updated');

        // Clear cart
        await client.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);

        client.release();
        res.status(200).json({ message: 'Order placed successfully', orderId });
    } catch (error) {
        if (client) client.release();
        console.error('Error completing order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(4243, () => console.log('Node server listening on port 4243!'));
