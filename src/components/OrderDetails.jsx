import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const OrderDetails = ({ userId, orderId, onBack }) => {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/orders/api/orders/${userId}/${orderId}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrder(data);
                } else {
                    console.error('Failed to fetch order details');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchOrderDetails();
    }, [userId, orderId]);

    const handlePrint = () => {
        window.print();
    };

    if (!order) {
        return <p>Loading...</p>;
    }

    return (
        <OrderDetailsContainer>
            <BackButton onClick={onBack}>Back to Order History</BackButton>
            <Ticket>
                <Title>Order Details</Title>
                <OrderInfo>
                    <OrderDate>Date: {new Date(order.orderdate).toLocaleDateString()}</OrderDate>
                    <OrderTime>Time: {new Date(order.orderdate).toLocaleTimeString()}</OrderTime>
                    <OrderRef>Ref: {order.ref}</OrderRef>
                </OrderInfo>
                <OrderItems>
                    {order.details.map((detail, index) => (
                        <OrderItem key={index}>
                            Product ID: {detail.productid}, Quantity: {detail.quantity}, Price: MUR {detail.priceatorder.toFixed(2)}
                        </OrderItem>
                    ))}
                </OrderItems>
                <OrderTotal>Total: MUR {parseFloat(order.totalprice).toFixed(2)}</OrderTotal>
                <OrderStatus status={order.status}>{order.status}</OrderStatus>
            </Ticket>
            <PrintButton onClick={handlePrint}>Print Ticket</PrintButton>
        </OrderDetailsContainer>
    );
};

const OrderDetailsContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: auto;
    text-align: center;
`;

const BackButton = styled.button`
    margin-bottom: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: white;

    &:hover {
        background-color: #0056b3;
    }
`;

const Ticket = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: #f9f9f9;
    text-align: left;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;

const OrderInfo = styled.div`
    margin-bottom: 20px;
`;

const OrderDate = styled.div`
    font-weight: bold;
`;

const OrderTime = styled.div`
    color: #888;
    margin-bottom: 10px;
`;

const OrderRef = styled.div`
    margin-bottom: 20px;
`;

const OrderItems = styled.div`
    margin-bottom: 20px;
`;

const OrderItem = styled.div`
    margin-bottom: 5px;
`;

const OrderTotal = styled.div`
    font-weight: bold;
    margin-bottom: 20px;
`;

const OrderStatus = styled.div`
    background-color: ${props => props.status === 'Delivered' ? '#28a745' : '#dc3545'};
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    text-align: center;
    display: inline-block;
`;

const PrintButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: white;

    &:hover {
        background-color: #0056b3;
    }
`;

export default OrderDetails;
