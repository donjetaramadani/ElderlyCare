import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useBasket } from "./BasketContext";
import MenuPage from "./MenuPage";

const Header = () => {
  const navigation = useNavigation();
  const { basketItems } = useBasket();
  const basketCount = basketItems?.length || 0;  
  const showBasketIcon = basketCount > 0; 
  //const [selectedItems, setSelectedItems] = useState([]);

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.logoText}>
        |ElderlyCare
        <Text style={styles.highlight}>+</Text>
      </Text>

      <View style={styles.iconContainer}>
        {/* Notifications Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Ionicons name="notifications-outline" size={28} color="black" />
        </TouchableOpacity>

        {/* Basket Icon */}
        {showBasketIcon && (
          <TouchableOpacity onPress={() => navigation.navigate("OrderNowPage", {
            selectedItems: basketItems 
           
          })}>
            <View style={styles.basketIcon}>
              <Ionicons name="basket-outline" size={28} color="black" />
              {basketCount > 0 && <View style={styles.redDot} />}
            </View>
          </TouchableOpacity>
        )}

        {/* Profile Icon */}
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-circle-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 45, 
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  logoText: {
    fontFamily: "ProximaNova ", 
    fontSize: 22,
    fontWeight: "bold",
    color: "#001",
    letterSpacing: 1,
  },
  highlight: {
    color: "#0078D7", 
  },
  iconContainer: {
    flexDirection: "row",
    gap: 20,
  },
  basketIcon: {
    position: "relative",
  },
  redDot: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
  },
});

export default Header;