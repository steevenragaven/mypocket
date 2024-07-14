import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTotalPrice = async () => {
            try {
                const response = await axios.get('http://localhost:3000/cart-total', {
                    params: { userId: 1 } // Replace with actual user ID
                });
                setTotalPrice(response.data.totalAmount);
            } catch (error) {
                console.error('Error fetching total price:', error);
                setError(error.message);
            }
        };
        fetchTotalPrice();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        const cardElement = elements.getElement(CardElement);

        try {
            // Create payment method
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }

            // Create payment intent on the server
            const response = await fetch('http://localhost:4243/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: totalPrice * 100 }), // Convert to cents
            });

            const responseData = await response.json();

            if (responseData.error) {
                setError(responseData.error);
                setLoading(false);
                return;
            }

            // Confirm payment with the client secret from the payment intent
            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(responseData.client_secret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                setError(confirmError.message);
                setLoading(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                // Submit order
                await handleActionSubmit(paymentMethod.id);
            } else {
                setError('Payment failed');
            }
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    };

    const handleActionSubmit = async (paymentMethodId) => {
        try {
            const cartItemsResponse = await axios.get('http://localhost:3000/cart', {
                params: { userId: 1 } // Replace with actual user ID
            });

            const completeOrderResponse = await axios.post('http://localhost:3000/checkout', {
                userId: 1, // Replace with actual user ID
                cartItems: cartItemsResponse.data,
                paymentMethodId: paymentMethodId,
                action: "Leave at the door"
            });

            if (completeOrderResponse.data.message === 'Order placed successfully') {
                setSuccess(true);
                navigate('/order-confirmation'); // Redirect to order confirmation page
            } else {
                setError('Order processing failed');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Section>
                <Label>Contact</Label>
                <Input placeholder="Eg: John Doe" />
            </Section>
            <Section>
                <Label>Payment</Label>
                <CardElementContainer>
                    <CardElement options={CARD_OPTIONS} />
                </CardElementContainer>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </Section>
            <Section>
                <Label>Billing Address</Label>
                <Input placeholder="1024 Bella Road Avenue, Quatre Bornes" />
                <Row>
                    <Input placeholder="Eg: 74257" />
                    <Input placeholder="Eg: Quatre Bornes" />
                </Row>
            </Section>
            <CheckboxContainer>
                <input type="checkbox" id="sameAsDelivery" />
                <label htmlFor="sameAsDelivery">Billing address is same as delivery</label>
            </CheckboxContainer>
            <Button disabled={!stripe || loading} type="submit">
                {loading ? 'Processing...' : `Pay Rs ${totalPrice.toFixed(2)}`}
            </Button>
            {success && <SuccessMessage>Payment Successful!</SuccessMessage>}
        </Form>
    );
};

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#c4f0ff',
            color: '#000',
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            '::placeholder': {
                color: '#87bbfd',
            },
        },
        invalid: {
            iconColor: '#FFC7EE',
            color: '#FFC7EE',
        },
    },
};

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Section = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    color: #333;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
`;

const Row = styled.div`
    display: flex;
    gap: 10px;

    ${Input} {
        flex: 1;
    }
`;

const CardElementContainer = styled.div`
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const CheckboxContainer = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    input {
        margin-right: 10px;
    }
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-size: 16px;

    &:disabled {
        background-color: #ccc;
    }
`;

const ErrorMessage = styled.div`
    margin-bottom: 20px;
    color: red;
    font-weight: bold;
`;

const SuccessMessage = styled.div`
    margin-top: 20px;
    color: green;
    font-weight: bold;
`;

export default CheckoutForm;