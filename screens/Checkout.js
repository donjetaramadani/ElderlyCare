import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Checkout = ({ route, navigation }) => {
  const { menuItems, quantity, serviceType, collectionTime, location } = route.params || {};

  if (!menuItems) {
    return <Text>Menu item not found</Text>; 
  }
  

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    const totalAmount = menuItems.price * quantity;
    navigation.navigate("Payment", { totalAmount }); 
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <Text style={styles.header}>Checkout</Text>

        {/* Order Summary */}
        <View style={styles.orderSummary}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.itemDetails}>
            <Image source={menuItems.image} style={styles.productImage} />
            <View style={styles.detailsText}>
              <Text style={styles.title}>{menuItems.name}</Text>
              <Text style={styles.description}>{menuItems.description}</Text>
              <Text style={styles.price}>
                £{(menuItems.price * quantity).toFixed(2)} ({quantity}x)
              </Text>
            </View>
          </View>
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
        <Text style={styles.totalPrice}>
          Total: £{(menuItems.price * quantity).toFixed(2)}
        </Text>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
    color: "#333",
  },
  orderSummary: {
    backgroundColor: "#f8f8f8",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  section: {
    padding: 20,
    margin: 10,
    backgroundColor: "#f8f8f8",
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
    fontSize: 14,
    color: "#666",
  },
  itemDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
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
