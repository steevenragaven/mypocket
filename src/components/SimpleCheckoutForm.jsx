import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import styled from 'styled-components';

const SimpleCheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

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
            const response = await fetch('http://localhost:4242/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: 142500 }), // Example amount in cents (1425.00 MUR)
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
                setSuccess(true);
            } else {
                setError('Payment failed');
            }
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Section>
                <Label>Payment</Label>
                <CardElementContainer>
                    <CardElement options={CARD_OPTIONS} />
                </CardElementContainer>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </Section>
            <Button disabled={!stripe || loading} type="submit">
                {loading ? 'Processing...' : 'Pay Rs 1425.00'}
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

const CardElementContainer = styled.div`
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
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

export default SimpleCheckoutForm;
