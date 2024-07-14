import React from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaClock, FaTruck, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';

const OrderTracking = () => {
    const orders = [
        {
            date: '21 Mar 2024',
            time: '17:45 PM',
            orderNumber: 3408,
            deliveryCode: 'KLOPP951',
            deliveryStatus: [
                { status: 'Order placed', time: '10:45 AM', place: 'LONDON WAY MAHEBOURG' },
                { status: 'Order is on the way', time: '15:00 PM', place: 'Ravi Bhurtu' },
                { status: 'Delivered', time: '', place: '' },
            ],
        },
        {
            date: '24 Apr 2024',
            time: '17:45 PM',
            orderNumber: 9832,
            deliveryCode: 'FERGP555',
            deliveryStatus: [
                { status: 'Order placed', time: '10:45 AM', place: 'LONDON WAY MAHEBOURG' },
                { status: 'Order is on the way', time: '17:45 PM', place: 'Said Ira' },
                { status: 'Delivered', time: '', place: '' },
            ],
        },
        {
            date: '10 May 2024',
            time: '14:30 PM',
            orderNumber: 4521,
            deliveryCode: 'JONES788',
            deliveryStatus: [
                { status: 'Order placed', time: '11:00 AM', place: 'LONDON WAY MAHEBOURG' },
                { status: 'Order is on the way', time: '12:00 PM', place: 'Sarah Connor' },
                { status: 'Delivered', time: '', place: '' },
            ],
        },
        {
            date: '15 May 2024',
            time: '09:15 AM',
            orderNumber: 1289,
            deliveryCode: 'MARK999',
            deliveryStatus: [
                { status: 'Order placed', time: '07:30 AM', place: 'LONDON WAY MAHEBOURG' },
                { status: 'Order is on the way', time: '08:00 AM', place: 'John Doe' },
                { status: 'Delivered', time: '', place: '' },
            ],
        },
        {
            date: '20 May 2024',
            time: '11:45 AM',
            orderNumber: 6587,
            deliveryCode: 'ANNA456',
            deliveryStatus: [
                { status: 'Order placed', time: '09:00 AM', place: 'King Savers' },
                { status: 'On the way', time: '10:00 AM', place: 'Emily Davis' },
                { status: 'Delivered', time: '', place: '' },
            ],
        },
    ];

    return (
        <OrderTrackingContainer>
            <Title>My Order Tracking</Title>
            {orders.map((order, index) => (
                <OrderCard key={index}>
                    <MapWrapper>
                        <Map
                            src="https://maps.google.com/maps?q=Mahebourg%2C%20Mauritius&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            allowFullScreen
                        />
                        <ViewOrderButton>View Order</ViewOrderButton>
                    </MapWrapper>
                    <OrderDetails>
                        <OrderDate>
                            <FaClock /> {order.date} | {order.time}
                        </OrderDate>
                        <OrderNumber>Order Number: #{order.orderNumber}</OrderNumber>
                        {order.deliveryStatus.map((status, idx) => (
                            <DeliveryStatus key={idx} status={status.status}>
                                {status.status === 'Delivered' ? (
                                    <FaCheckCircle />
                                ) : status.status === 'On the way' ? (
                                    <FaTruck />
                                ) : (
                                    <FaHourglassHalf />
                                )}
                                {status.status} <TimePlace>{status.time} {status.place}</TimePlace>
                            </DeliveryStatus>
                        ))}
                        <DeliveryCode>
                            When order arrives, please provide the delivery person this code:
                            <DeliveryCodeNumber>{order.deliveryCode}</DeliveryCodeNumber>
                        </DeliveryCode>
                    </OrderDetails>
                </OrderCard>
            ))}
        </OrderTrackingContainer>
    );
};

const OrderTrackingContainer = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: auto;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;

const OrderCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    background-color: #f9f9f9;
`;

const MapWrapper = styled.div`
    position: relative;
    width: 50%;
    height: 300px;
`;

const Map = styled.iframe`
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
`;

const ViewOrderButton = styled.button`
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const OrderDetails = styled.div`
    flex: 1;
    padding-left: 20px;
`;

const OrderDate = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-weight: bold;
    color: #888;
`;

const OrderNumber = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 10px;
`;

const DeliveryStatus = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    color: ${props => props.status === 'Delivered' ? '#28a745' : props.status === 'On the way' ? '#007bff' : '#ffc107'};

    svg {
        margin-right: 5px;
    }
`;

const TimePlace = styled.span`
    margin-left: 10px;
    color: #666;
`;

const DeliveryCode = styled.div`
    margin-top: 15px;
    font-size: 0.9em;
    color: #333;
`;

const DeliveryCodeNumber = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    color: #007bff;
`;

export default OrderTracking;
