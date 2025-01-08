import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


const Checkout = ({ route, navigation }) => {
  const { 
    selectedItems = [], 
    initialQuantities = [],  
    serviceType = "Not specified", 
    collectionTime = "Not specified", 
    location = "Not specified" 
  } = route.params || {};

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const newTotal = selectedItems.reduce((total, item, index) => {
      const itemQuantity = initialQuantities[index] || 1;
      return total + item.price * itemQuantity;
    }, 0);
    setTotalAmount(newTotal);
  }, [selectedItems, initialQuantities]);

  if (!Array.isArray(selectedItems) || selectedItems.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>No items found in your order!</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handlePlaceOrder = () => {
    if (!totalAmount) {
      alert("Unable to calculate total. Please try again.");
      return;
    }
    alert("Order placed successfully!");
    navigation.navigate("Payment", { totalAmount });
  };

  return (
    <View style={styles.container}>
   
      <ScrollView contentContainerStyle={styles.scrollViewContent} >
        <Text style={styles.header}>Checkout</Text>

        {/* Order Summary */}
        <View style={styles.orderSummary}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {selectedItems.map((item, index) => (
            <View key={index} style={styles.itemDetails}>
              {item.image && <Image source={item.image} style={styles.productImage} />}
              <View style={styles.detailsText}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>
                  ${(item.price * (initialQuantities[index] || 1)).toFixed(2)} 
                  ({initialQuantities[index] || 1}x)
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Service Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Type</Text>
          <Text style={styles.sectionContent}>{serviceType}</Text>
        </View>

        {/* Collection Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Collection Time</Text>
          <Text style={styles.sectionContent}>{collectionTime}</Text>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Collect From</Text>
          <Text style={styles.sectionContent}>{location}</Text>
        </View>
      </ScrollView>

      {/* Total and Place Order */}
      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Total: ${totalAmount.toFixed(2)}</Text>
        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <MaterialIcons name="check-circle" size={24} color="#fff" />
          <Text style={styles.placeOrderButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    paddingBottom: 150, 
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
    color: "#333",
    backgroundColor: "#f8f8f8",
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  orderSummary: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  section: {
    padding: 15,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#444",
  },
  sectionContent: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  itemDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  detailsText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e53935",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  placeOrderButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e53935",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  placeOrderButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default Checkout;
