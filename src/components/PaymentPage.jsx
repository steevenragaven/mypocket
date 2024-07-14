import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useStripe, CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function CreditCardPayment() {
  const { confirmPayment, loading } = useConfirmPayment();
  const [cardDetails, setCardDetails] = useState();

  const handlePayPress = async () => {
    if (!cardDetails?.complete) {
      Alert.alert('Please enter complete card details');
      return;
    }
    const billingDetails = {
      email: 'test@example.com', // Replace with customer's email
    };
    // Assuming you have obtained the paymentIntentClientSecret from your server
    const { error, paymentIntent } = await confirmPayment('paymentIntentClientSecret', {
      type: 'Card',
      billingDetails,
    });
    if (error) {
      alert(`Payment Confirmation Error: ${error.message}`);
    } else if (paymentIntent) {
      alert('Payment Successful');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Credit Card Payment</Text>
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={(card) => setCardDetails(card)}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  );
}

function PayPalPayment() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>PayPal Payment</Text>
      <Text>This is a placeholder for PayPal integration.</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function PaymentTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="CreditCard" component={CreditCardPayment} />
        <Tab.Screen name="PayPal" component={PayPalPayment} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
  },
  cardContainer: {
    height: 50,
    width: '100%',
    marginVertical: 30,
  },
});

export default PaymentTabs;
