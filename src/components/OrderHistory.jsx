import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OrderDetails from './OrderDetails';

const OrderHistory = () => {
    const userId = 1; // Static userId for demonstration purposes
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/orders/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    console.error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchOrders();
    }, [userId]);

    const handleOrderClick = (orderId) => {
        setSelectedOrderId(orderId);
    };

    const handleBack = () => {
        setSelectedOrderId(null);
    };

    if (selectedOrderId) {
        return <OrderDetails userId={userId} orderId={selectedOrderId} onBack={handleBack} />;
    }

    return (
        <OrderHistoryContainer>
            <Title>My Order History</Title>
            {orders.map((order, index) => (
                <OrderCard key={index} onClick={() => handleOrderClick(order.orderid)}>
                    <OrderInfo>
                        <OrderDate>{new Date(order.orderdate).toLocaleDateString()}</OrderDate>
                        <OrderTime>{new Date(order.orderdate).toLocaleTimeString()}</OrderTime>
                        <OrderDescription>
                            {order.details.map((detail, i) => (
                                <div key={i}>
                                    Product ID: {detail.productid}, Quantity: {detail.quantity}, Price: MUR {detail.priceatorder.toFixed(2)}
                                </div>
                            ))}
                            <div>Ref: {order.ref}</div>
                        </OrderDescription>
                    </OrderInfo>
                    <OrderAmount>MUR {parseFloat(order.totalprice).toFixed(2)}</OrderAmount>
                    <OrderStatus status={order.status}>{order.status}</OrderStatus>
                </OrderCard>
            ))}
        </OrderHistoryContainer>
    );
};

const OrderHistoryContainer = styled.div`
    padding: 20px;
    max-width: 1000px;
    margin: auto;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        font-size: 1.5em;
    }
`;

const OrderCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
    cursor: pointer;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const OrderInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    @media (max-width: 768px) {
        margin-bottom: 10px;
    }
`;

const OrderDate = styled.span`
    font-weight: bold;
`;

const OrderTime = styled.span`
    color: #888;
    margin-bottom: 10px;
`;

const OrderDescription = styled.p`
    white-space: pre-line;
    margin: 0;
`;

const OrderAmount = styled.span`
    font-weight: bold;
    color: #007bff;
    min-width: 100px;
    text-align: right;

    @media (max-width: 768px) {
        text-align: left;
        margin-bottom: 10px;
    }
`;

const OrderStatus = styled.div`
    background-color: ${props => props.status === 'Delivered' ? '#28a745' : '#dc3545'};
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    text-align: center;
    min-width: 100px;

    @media (max-width: 768px) {
        align-self: flex-start;
    }
`;

export default OrderHistory;
