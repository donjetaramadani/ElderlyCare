import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from "./Navigation";
import Header from "./screens/Header";
import BottomNavBar from "./screens/BottomNavBar";
import { HealthDataProvider } from "./screens/HealthDataContext";
import { UserProvider } from "./screens/UserContext"; 
import { StripeProvider } from '@stripe/stripe-react-native';
import { BasketProvider } from "./screens/BasketContext";

export default function App() {
  return (
    <BasketProvider>
    <StripeProvider publishableKey="pk_test_51PUzHw02TSHp6Y0YvAbvo9mi3ZMKYE4NP5YHdR4hr8rSzaArwbwRnOxCpnmCwa5Ve5BF0UvWQbR80fGObo8ZkHfx00ehf3Czl7">
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <HealthDataProvider>
        <UserProvider>
          <NavigationContainer>
            <View style={styles.container}>
              {/* Header */}
              <Header />
              {/* Main Navigation */}
              <View style={{ flex: 1 }}>
                <Navigation />
              </View>
              {/* Bottom Navigation */}
              <BottomNavBar />
            </View>
          </NavigationContainer>
        </UserProvider>
      </HealthDataProvider>
    </GestureHandlerRootView>
    </StripeProvider>
    </BasketProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
});
