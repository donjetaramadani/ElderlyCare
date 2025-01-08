import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Pressable, SafeAreaView, FlatList} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialIcons"; 
import StaffDetails from "./StaffDetails";
import ReviewSection from "./ReviewSection";

import hospital1Img from "../assets/images/CityGeneralHospital.jpg";
import hospital2Img from "../assets/images/MetroHealthCenter.jpg";
import hospital3Img from "../assets/images/PinewoodMedicalFacility.jpg";
import hospital4Img from "../assets/images/restaurant.webp";
import hospital5Img from "../assets/images/parking.avif";
import hospital6Img from "../assets/images/pharmacy.jpg";


const HospitalDetails = ({ route, navigation }) => {
  const { hospital } = route.params; 

 
  console.log("HospitalDetails - Hospital:", hospital);


  if (!hospital) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Hospital data is missing.</Text>
      </View>
    );
  }

  const handlePharmacyOrder = () => {
    navigation.navigate("PharmacyPage", { hospital }); 
  };

  const handleRestaurantOrder = () => {
    navigation.navigate("MenuPage", { hospital }); 
  };
 

  return (
    <ScrollView contentContainerStyle={styles.container} nestedScrollEnabled>
      {/* Go Back Button */}
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.navigate("SpecificGeneralHospitals", { type: "General" })}
      >
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Check if hospital.image exists before rendering */}
      {hospital.image ? (
      <Image source={hospital.image} style={styles.image} />
    ) : (
      <Text>No image available</Text> 
    )}
      <Text style={styles.hospitalName}>{hospital.name}</Text>
      <Text style={styles.description}>{hospital.description}</Text>

      {/* Contact Information */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact Information</Text>
        <View style={styles.infoItem}>
          <Icon name="phone" size={20} color="#34495e" style={styles.icon} />
          <Text style={styles.infoText}>
            {hospital.contactInfo?.phone || "N/A"}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="email" size={20} color="#34495e" style={styles.icon} />
          <Text style={styles.infoText}>
            {hospital.contactInfo?.email || "N/A"}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Icon
            name="language"
            size={20}
            color="#34495e"
            style={styles.icon}
          />
          <Text style={styles.infoText}>
            {hospital.contactInfo?.website || "N/A"}
          </Text>
        </View>
      </View>

      {/* Other Sections (Unchanged) */}
      {hospital.servicesOffered?.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Services Offered</Text>
          {hospital.servicesOffered.map((service, index) => (
            <Text key={index} style={styles.listItem}>
              - {service}
            </Text>
          ))}
        </View>
      )}

      {/* Visiting Hours */}
      {hospital.visitingHours && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Visiting Hours</Text>
          <Text style={styles.infoText}>
            Weekdays: {hospital.visitingHours.weekdays || "N/A"}
          </Text>
          <Text style={styles.infoText}>
            Weekends: {hospital.visitingHours.weekends || "N/A"}
          </Text>
        </View>
      )}

 {/* Facilities */}
{hospital.facilities?.length > 0 && (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Facilities</Text>
    {hospital.facilities.map((facility, index) => {
      const facilityName = facility.name || facility; 

      if (facilityName === "Parking Lot") {
        return (
          <View key={index} style={styles.facilityItem}>
            <Image
              source={hospital5Img} 
              style={styles.facilityIcon}
            />
            <View style={styles.facilityTextContainer}>
              <Text style={styles.facilityText}>{facilityName}</Text>
              <Text style={styles.facilityStatus}>
                {facility.availability ? `${facility.availability} spots available` : "Full"}
              </Text>
            </View>
          </View>
        );
      } else if (facilityName === "Pharmacy") {
        return (
          <View key={index} style={styles.facilityItem}>
            <Image
              source={hospital6Img} 
              style={styles.facilityIcon}
            />
            <View style={styles.facilityTextContainer}>
              <Text style={styles.facilityText}>{facilityName}</Text>
              <Text style={styles.facilityStatus}>Order medicines online</Text>
              <TouchableOpacity
                style={styles.orderButton}
                onPress={() => handlePharmacyOrder()}
              >
                <Text style={styles.orderButtonText}>Order Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      } else if (facilityName === "Restaurant") {
        return (
          <View key={index} style={styles.facilityItem}>
            <Image
              source={hospital4Img} 
              style={styles.facilityIcon}
            />
            <View style={styles.facilityTextContainer}>
              <Text style={styles.facilityText}>{facilityName}</Text>
              <Text style={styles.facilityStatus}>Enjoy delicious meals</Text>
              <TouchableOpacity
                style={styles.orderButton}
                onPress={() => handleRestaurantOrder()}
              >
                <Text style={styles.orderButtonText}>View Menu</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      } else {
        return (
          <View key={index} style={styles.facilityItem}>
            <Image
              source={hospital3Img} 
              style={styles.facilityIcon}
            />
            <View style={styles.facilityTextContainer}>
              <Text style={styles.facilityText}>{facilityName}</Text>
            </View>
          </View>
        );
      }
    })}
  </View>
)}




      {/* Specialized Departments */}
      {hospital.specializedDepartments?.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Specialized Departments</Text>
          {hospital.specializedDepartments.map((department, index) => (
            <Text key={index} style={styles.listItem}>
              - {department}
            </Text>
          ))}
        </View>
      )}

  {/* Staff Section */}
  {hospital.staff && hospital.staff.length > 0 && (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Our Staff</Text>
    <View style={styles.staffList}>
      {hospital.staff.map((staff, index) => (
       <Pressable
       key={index}
       style={styles.staffItem}
       onPress={() => navigation.navigate("StaffDetails", { staffId: staff.id, hospital })}

     >
       <Image
         source={staff.image || hospital3Img} 
         style={styles.staffImage}
       />
       <View style={styles.staffTextContainer}>
         <Text style={styles.staffName}>{staff.name}</Text>
         <Text style={styles.staffPosition}>{staff.position}</Text>
       </View>
     </Pressable>
     
      ))}
    </View>
  </View>
)}

{/* Booking Appointment */}
{hospital.allowsAppointment && (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Book an Appointment</Text>
    <Text style={styles.infoText}>
      Schedule a visit to consult with a specialist at {hospital.name}.
    </Text>
    <TouchableOpacity
      style={styles.bookButton}
      onPress={() => navigation.navigate("AppointmentBooking", { hospital })}
    >
      <Text style={styles.bookButtonText}>Book Now</Text>
    </TouchableOpacity>
  </View>
)}




{/* Hospital Reviews */}
<ReviewSection hospital={hospital} />


  {/* Map */}
  {hospital.coordinates && (
        <View style={styles.mapContainer}>
          <Text style={styles.cardTitle}>Location Map</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: hospital.coordinates.latitude,
              longitude: hospital.coordinates.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={hospital.coordinates}
              title={hospital.name}
              description={hospital.location}
            />
          </MapView>
        </View>
      )}


    </ScrollView>
  );
};

const styles = StyleSheet.create({
 
  container: {
    flexGrow: 1,
    paddingTop: 60,
    padding: 20,
    backgroundColor: "#f7f9fb",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  hospitalName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#34495e",
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
  },
  listItem: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  mapContainer: {
    height: 300,
    borderRadius: 15,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
  },
  facilityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
    paddingBottom: 10,
  },
  facilityIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 8,
    backgroundColor: "#ecf0f1", 
  },
  facilityTextContainer: {
    flex: 1,
  },
  facilityText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#34495e",
    marginBottom: 5,
  },
  facilityStatus: {
    fontSize: 14,
    color: "#27ae60",
    fontWeight: "500",
  },
  orderButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  orderButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },  
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
    flex: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
  },
  staffList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  staffItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ecf0f1",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  staffImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  staffTextContainer: {
    alignItems: "center",
  },
  staffName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#34495e",
    marginBottom: 5,
  },
  staffPosition: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  detailsContainer: {
    alignItems: "center",
  },
  detailsImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  detailsName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  detailsPosition: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 10,
  },
  detailsHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34495e",
    marginTop: 15,
    marginBottom: 5,
  },
  detailsInfo: {
    fontSize: 16,
    color: "#34495e",
    marginBottom: 10,
  },
  detailsDescription: {
    fontSize: 14,
    color: "#7f8c8d",
    lineHeight: 20,
    textAlign: "center",
  },
  reviewsContainer: {
    marginTop: 20,
    width: '100%',
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  reviewRating: {
    fontSize: 14,
    color: '#f39c12',
  },

  bookButton: {
    backgroundColor: "#1abc9c",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  goBackButton: {
    position: 'absolute',
    top: 10, 
    left: 20,
    width: 35,
    height: 35,
    borderRadius: 20, 
    backgroundColor: "#2471a3",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#34495e",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  

});

export default HospitalDetails;