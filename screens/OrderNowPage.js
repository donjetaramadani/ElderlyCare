import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';


const OrderNowPage = ({ route, navigation }) => {
  const { menuItems } = route.params; 
  const [quantity, setQuantity] = useState(1);
  const [serviceType, setServiceType] = useState("Take Away");
  const [collectionTime, setCollectionTime] = useState("09:55 - 02:55");

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  //const { menuItem } = route.params;
  const { basket } = route.params;

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleCheckout = () => {
    navigation.navigate("Checkout", {
      menuItems: menuItems,
      quantity: quantity,
      serviceType: serviceType,
      collectionTime: collectionTime,
      location: newLocation,
    });
  };

  const handleEdit = () => {
    alert("Edit functionality is under development.");
  };

  const handleRemove = () => {
    alert("Item removed from the order.");
    navigation.goBack();
  };


  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, "0");
      const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
      setCollectionTime(`${hours}:${minutes}`);
    }
  };



  if (!menuItems) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No menu item found. Please go back and select an item.</Text>
      </View>
    );
  }

  const handleLocationChange = () => {
    setShowLocationModal(false);
  };

  console.log(route.params); 

  useEffect(() => {
    console.log("Received menuItems:", route.params?.menuItems);
  }, [route.params?.menuItems]);
  


  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <Text style={styles.header}>Order Details</Text>

        {/* Selected Item Details */}
        <View style={styles.orderDetails}>
          <Image source={menuItems.image} style={styles.productImage} />
          <View style={styles.detailsText}>
            <Text style={styles.title}>{menuItems.name}</Text>
            <Text style={styles.description}>{menuItems.description}</Text>
            <Text style={styles.price}>£{menuItems.price.toFixed(2)}</Text>
          </View>
        </View>

        {/* Actions and Quantity Section */}
        <View style={styles.actionAndQuantityContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
            <MaterialIcons name="edit" size={20} color="#007bff" />
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleRemove}>
            <FontAwesome name="trash" size={20} color="#e53935" />
            <Text style={styles.actionButtonText}>Remove</Text>
          </TouchableOpacity>

          <View style={styles.quantityAdjuster}>
            <TouchableOpacity style={styles.quantityButton} onPress={handleDecrease}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={handleIncrease}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Service Type */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SELECT SERVICE TYPE</Text>
        <View style={styles.serviceOptions}>
          {["Dine In", "Take Away", "Table Service", "Drive Thru"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.serviceType, serviceType === type && styles.serviceActive]}
              onPress={() => setServiceType(type)}
            >
              <Text style={[styles.serviceText, serviceType === type && styles.serviceTextActive]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>


        {/* Collection Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Collection Time</Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <View style={styles.changeLinkContainer}>
            <Text style={styles.changeLink}>{collectionTime}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {showTimePicker && (
        <View style={styles.styledPickerContainer}>
          <DateTimePicker
            value={new Date()}
            mode="time"
            display="spinner"
            onChange={onTimeChange}
            themeVariant="dark" 
          />
        </View>
      )}


   {/* Location display and input */}
   <View style={styles.locationContainer}>
        <Text style={styles.label}>Collect From</Text>
        <TextInput
          style={styles.input}
          value={newLocation}
          onChangeText={setNewLocation}
          placeholder="Enter location"
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={() => setShowLocationModal(true)} style={styles.iconContainer}>
          <Ionicons name="map" size={20} color="#007bff" />
        </TouchableOpacity>
      </View>

      

    

        {/* Add More Items */}
        <TouchableOpacity style={styles.addMoreButton} onPress={() => alert("Add More Items clicked!")}>
          <Text style={styles.addMoreButtonText}>Add More Items</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Order Summary */}
      <View style={styles.orderSummary}>
        <Text style={styles.totalPrice}>Total: ${(menuItems.price * quantity).toFixed(2)}</Text>
        <TouchableOpacity style={styles.orderButton} onPress={handleCheckout}>
          <Text style={styles.orderButtonText}>Checkout</Text>
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
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
    color: "#333",
  },
  orderDetails: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
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
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e53935",
  },
  actionAndQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3, 
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#f1f1f1', 
    paddingVertical: 12,         
    paddingHorizontal: 20,      
    borderRadius: 8,          
    justifyContent: 'center',   
    shadowColor: '#000',       
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,              
    marginVertical: 10, 
  },
  actionButtonText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    
  },
  quantityAdjuster: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#e53935",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  changeLinkContainer: {
    backgroundColor: "#F8F9FA", 
    borderRadius: 8,
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4,
    elevation: 4, 
    marginVertical: 8, 
    alignItems: "center", 
  },
  changeLink: {
    color: "#E63946", 
  fontWeight: "600",
  fontSize: 16, 
  letterSpacing: 0.5, 
  },
  addMoreButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  addMoreButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orderSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  orderButton: {
    backgroundColor: "#e53935",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  orderButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  serviceOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  serviceType: {
    width: "47%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  serviceActive: {
    backgroundColor: "#e53935",
    borderColor: "#e53935",
  },
  serviceText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },
  serviceTextActive: {
    color: "#fff",
  },
 
  styledPickerContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.8)", 
    padding: 20,
    borderRadius: 15,
    borderColor: "#555", 
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4, 
    elevation: 5, 
    justifyContent: "center",
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    flex: 3,
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f7f7f7',
    marginRight: 10,
  },
  iconContainer: {
    padding: 10,
    backgroundColor: '#e3f2fd',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#333',
  },
  modalInput: {
    padding: 12,
    fontSize: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f7f7f7',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f44336',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

});

export default OrderNowPage;