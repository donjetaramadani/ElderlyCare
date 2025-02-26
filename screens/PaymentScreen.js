import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { useCart } from './CartContext';
import { useBasket } from "./BasketContext";

const Payment = ({ route, navigation }) => {
  const { totalAmount } = route.params || {};
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const { clearBasket } = useBasket();

  const handlePayment = async () => {
    try {
      const response = await fetch("http://192.168.0.36:5196/api/Payment/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(totalAmount * 100) }),
      });
      const { clientSecret } = await response.json();

     
      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
      });
      if (initError) {
        alert(`Payment Initialization Error: ${initError.message}`);
        return;
      }

      const { error: paymentError } = await presentPaymentSheet();
      if (paymentError) {
        alert(`Payment Failed: ${paymentError.message}`);
      } else {
        alert("Payment successful!");

       clearBasket();

       navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong during the payment process.");
    }
  };

 
  const handleSendOrderToCaregiver = async () => {
    try {
      const response = await fetch("http://192.168.0.36:5196/api/Order/send-to-caregiver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalAmount: totalAmount, 
          message: "Order needs attention from caregiver.", 
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Order sent to caregiver successfully!");

        clearBasket();

        navigation.navigate("Home");
      } else {
        alert(`Error sending order: ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send order to caregiver.");
    }
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Payment</Text>

      {/* Payment Details */}
      <View style={styles.paymentDetails}>
        <Text style={styles.sectionTitle}>Total Amount</Text>
        <Text style={styles.sectionContent}>${totalAmount.toFixed(2)}</Text>

        <Text style={styles.instructions}>Please proceed with your payment.</Text>
      </View>

      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentButtonText}>Pay Now</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.sendOrderButton} onPress={handleSendOrderToCaregiver}>
        <Text style={styles.sendOrderButtonText}>Send Order to Caregiver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  paymentDetails: {
    marginBottom: 40,
    backgroundColor: "#f8f8f8",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#444",
  },
  sectionContent: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
  instructions: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },
  paymentButton: {
    backgroundColor: "#e53935",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  paymentButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  sendOrderButton: {
    backgroundColor: "#4caf50", 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
  },
  sendOrderButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Payment;
