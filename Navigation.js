import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import HealthButtonScreen from "./screens/HealthButtonScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HeartHealth from "./screens/HeartHealth";
import Steps from "./screens/Steps";
import BloodPressure from "./screens/BloodPressure";
import OxygenSaturation from "./screens/OxygenSaturation";
import Temperature from "./screens/Temperature";
import Sleep from "./screens/Sleep";
import ECG from "./screens/ECG";
import RespiratoryRate from "./screens/RespiratoryRate";
import FallDetection from "./screens/FallDetection";
import BloodGlucose from "./screens/BloodGlucose";
import Hydration from "./screens/Hydration";
import Activity from "./screens/Activity";
import Cognitive from "./screens/Cognitive";
import GaitPosture from "./screens/GaitPosture";
import Environment from "./screens/Environment";
import { StyleSheet } from "react-native";
import AddReminderScreen from "./screens/AddReminderScreen";
import UpdateReminderScreen from "./screens/UpdateReminderScreen";
import HospitalTypes from "./screens/HospitalTypes";
import GeneralHospitals from "./screens/GeneralHospitals";
import SpecialtyClinics from "./screens/SpecialtyClinics";
import RehabilitationCenters from "./screens/RehabilitationCenters";
import ChildrensHospitals from "./screens/ChildrensHospitals";
import PsychiatricHospitals from "./screens/PsychiatricHospitals";
import SpecificGeneralHospitals from "./screens/SpecificGeneralHospitals";
import SpecificSpecialtyHospitals from "./screens/SpecificSpecialtyHospitals";
import SpecificRehabilitationHospitals from "./screens/SpecificRehabilitationHospitals";
import SpecificChildrenHospitals from "./screens/SpecificChildrenHospitals";
import SpecificPsychiatricHospitals from "./screens/SpecificPsychiatricHospitals";
import HospitalDetails from "./screens/HospitalDetails";
import StaffDetails from "./screens/StaffDetails";
import ReviewSection from "./screens/ReviewSection";
import AppointmentBooking from "./screens/AppointmentBooking";
import MenuPage from "./screens/MenuPage";
import PharmacyPage from "./screens/PharmacyPage";
import OrderNowPage from "./screens/OrderNowPage";
import Checkout from "./screens/Checkout";
import Payment from "./screens/PaymentScreen";
import { BasketContext } from "./screens/BasketContext";


const Tab = createBottomTabNavigator();


export default function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: [styles.tabBarStyle], 
        headerShown: false, 
        tabBarInactiveTintColor: "#B0BEC5", 
        tabBarActiveTintColor: "#0077B6",
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="HealthButton" component={HealthButtonScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="HeartHealth" component={HeartHealth} />
      <Tab.Screen name="Steps" component={Steps} />
      <Tab.Screen name="BloodPressure" component={BloodPressure} />
      <Tab.Screen name="OxygenSaturation" component={OxygenSaturation} />
      <Tab.Screen name="Temperature" component={Temperature} />
      <Tab.Screen name="Sleep" component={Sleep} />
      <Tab.Screen name="ECG" component={ECG} />
      <Tab.Screen name="RespiratoryRate" component={RespiratoryRate} />
      <Tab.Screen name="FallDetection" component={FallDetection} />
      <Tab.Screen name="BloodGlucose" component={BloodGlucose} />
      <Tab.Screen name="Hydration" component={Hydration} />
      <Tab.Screen name="Activity" component={Activity} />
      <Tab.Screen name="Cognitive" component={Cognitive} />
      <Tab.Screen name="GaitPosture" component={GaitPosture} />
      <Tab.Screen name="Environment" component={Environment} />
      <Tab.Screen name="AddReminderScreen" component={AddReminderScreen} />
      <Tab.Screen name="UpdateReminderScreen" component={UpdateReminderScreen} />
      <Tab.Screen name="HospitalTypes" component={HospitalTypes} />
      <Tab.Screen name="GeneralHospitals" component={GeneralHospitals} />
      <Tab.Screen name="SpecialtyClinics" component={SpecialtyClinics} />
      <Tab.Screen name="RehabilitationCenters" component={RehabilitationCenters} />
      <Tab.Screen name="ChildrensHospitals" component={ChildrensHospitals} />
      <Tab.Screen name="PsychiatricHospitals" component={PsychiatricHospitals} />
      <Tab.Screen name="SpecificGeneralHospitals" component={SpecificGeneralHospitals} />
      <Tab.Screen name="SpecificSpecialtyHospitals" component={SpecificSpecialtyHospitals} />
      <Tab.Screen name="SpecificRehabilitationHospitals" component={SpecificRehabilitationHospitals} />
      <Tab.Screen name="SpecificChildrenHospitals" component={SpecificChildrenHospitals} />
      <Tab.Screen name="SpecificPsychiatricHospitals" component={SpecificPsychiatricHospitals} />
      <Tab.Screen name="HospitalDetails" component={HospitalDetails} />
      <Tab.Screen name="StaffDetails" component={StaffDetails} />
      <Tab.Screen name="ReviewSection" component={ReviewSection} />
      <Tab.Screen name="AppointmentBooking" component={AppointmentBooking} />
      <Tab.Screen name="MenuPage" component={MenuPage} />
      <Tab.Screen name="PharmacyPage" component={PharmacyPage} />
      <Tab.Screen name="OrderNowPage" component={OrderNowPage} />
      <Tab.Screen name="Checkout" component={Checkout} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="BasketContext" component={BasketContext} />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    
    borderTopWidth: 0, 
    elevation: 5,
    height: 60, 
  },
});
