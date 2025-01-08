import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, Modal } from "react-native";
import { BasketContext } from "./BasketContext";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/MaterialIcons"; 

const MenuPage = ({ navigation, route }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    maxPrice: Infinity,
  });
  const [numColumns, setNumColumns] = useState(2);
  const { addToBasket } = useContext(BasketContext);
  const { hospital } = route.params; 




  const handleGoBack = () => {
    navigation.navigate("HospitalDetails", { hospital: route.params.hospital });
  };

 
  

  const menuItems = [
    { id: 1, name: "Grilled Chicken", description: "Served with vegetables", price: 12, category: "Main", image: require("../assets/images/GrilledChicken.jpg") },
    { id: 2, name: "Pasta Alfredo", description: "Creamy Alfredo sauce", price: 10, category: "Main", image: require("../assets/images/PastaAlfredo.webp") },
    { id: 3, name: "Caesar Salad", description: "With fresh lettuce and dressing", price: 8, category: "Appetizer", image: require("../assets/images/CaesarSalad.jpg") },
    { id: 4, name: "Quinoa Salad", description: "With avocado, cherry tomatoes, and lemon dressing", price: 9, category: "Appetizer", image: require("../assets/images/QuinoaSalad.webp") },
    { id: 5, name: "Grilled Salmon", description: "Served with steamed broccoli and wild rice", price: 15, category: "Main", image: require("../assets/images/GrilledSalmon.jpg") },
    { id: 6, name: "Vegetable Stir-Fry", description: "Fresh veggies with a light soy ginger glaze", price: 11, category: "Main", image: require("../assets/images/VegetableStir-Fry.jpg") },
    { id: 7, name: "Smoothie Bowl", description: "Topped with fresh fruits, nuts, and granola", price: 7, category: "Dessert", image: require("../assets/images/SmoothieBowl.webp") },
    { id: 8, name: "Hummus Platter", description: "With fresh veggie sticks and whole-grain crackers", price: 6, category: "Appetizer", image: require("../assets/images/HummusPlatter.jpg") },
    { id: 9, name: "Stuffed Bell Peppers", description: "Filled with quinoa, black beans, and vegetables", price: 10, category: "Main", image: require("../assets/images/StuffedBellPeppers.jpg") },
    { id: 10, name: "Baked Sweet Potato", description: "With a drizzle of olive oil and rosemary", price: 4, category: "Main", image: require("../assets/images/BakedSweetPotato.jpg") },
  ];

  const filteredMenu = menuItems.filter((item) => {
    const matchesCategory = filters.category === "" || item.category === filters.category;
    const matchesPrice = item.price <= filters.maxPrice;
    return matchesCategory && matchesPrice;
  });

  const handleAddToBasket = (item) => {
    console.log("Adding item to basket:", item);
    addToBasket(item);
  };
  
  const handleNavigateToOrderNow = () => {
    navigation.navigate("OrderNowPage", { selectedItems: basketItems });
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuCard}>
      <Image source={item.image} style={styles.menuImage} />
      <View style={styles.cardContent}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuDescription}>{item.description}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.menuPrice}>${item.price}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToBasket(item)}
          >
            <Text style={styles.addButtonText}>Add to Basket</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
     
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>

        {/* Go Back Button */}
        <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
         <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <TextInput
          placeholder="Search for dishes..."
          style={styles.searchInput}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsFilterVisible(true)}
        >
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Menu List */}
      <FlatList
        data={filteredMenu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMenuItem}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
      />
    

     {/* Filter Modal */}
      <Modal
        visible={isFilterVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Menu</Text>
              <TouchableOpacity onPress={() => setIsFilterVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            {/* Category Filter Section */}
            <Text style={styles.filterLabel}>Category</Text>
            <View style={styles.categoryContainer}>
              {["All","Main", "Appetizer", "Dessert"].map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    filters.category === category && styles.categoryButtonSelected,
                  ]}
                  onPress={() => setFilters({ ...filters, category: category === "All" ? "" : category, })}
                >
                  <Text style={styles.categoryButtonText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>

      {/* Max Price Filter Section */}
      <Text style={styles.filterLabel}>Max Price</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Enter max price"
        style={styles.priceInput}
        placeholderTextColor="#aaa"
        onChangeText={(text) =>
          setFilters({ ...filters, maxPrice: parseFloat(text) || Infinity })
        }
      />

      {/* Apply and Cancel Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setIsFilterVisible(false)}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => setIsFilterVisible(false)}
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6fc" },

  // Search Bar
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#f1f1f1",
    color: "#333",
  },
  searchIcon: {
    fontSize: 18,
    color: "#333",
    marginLeft: 8,
  },
  filterButton: {
    backgroundColor: "#3E8E7E",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginLeft: 12,
  },
  filterText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  // Menu List
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16, 
  },

  // Menu Card
  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 16, 
    flex: 0.48, 
  },
  menuImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 12,
    flexGrow: 1, 
    justifyContent: "space-between", 
  },
  menuName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  menuDescription: {
    fontSize: 14,
    color: "#777",
    marginVertical: 8,
    flexShrink: 1, 
    minHeight: 40, 
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flexShrink: 1, 
  },
  addButton: {
    backgroundColor: "#3E8E7E",  
    paddingVertical: 11,  
    paddingHorizontal: 10,  
    borderRadius: 6, 
    flexShrink: 0, 
  },
  
  addButtonText: {
    color: "#fff",  
    fontWeight: "bold",  
    textAlign: "center",  
    fontSize: 12,  
    letterSpacing: 0.5,  
  },
  

  // Filter Modal
 
    // Modal Styles
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        width: "80%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    closeButton: {
        padding: 5,
    },
    closeButtonText: {
        fontSize: 22,
        color: "#333",
    },

    // Filter Section
    filterLabel: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 8,
    },
    categoryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 8,
    },
    categoryButton: {
        backgroundColor: "#f1f1f1",
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
        borderRadius: 12,
    },
    categoryButtonSelected: {
        backgroundColor: "#3E8E7E",
    },
    categoryButtonText: {
        fontSize: 14,
        color: "#333",
    },
    priceInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 14,
        marginBottom: 16,
    },

    // Button Container
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cancelButton: {
        backgroundColor: "#f1f1f1",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
    },
    cancelButtonText: {
        color: "#333",
        fontWeight: "bold",
    },
    applyButton: {
        backgroundColor: "#3E8E7E",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
    },
    applyButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    goBackButton: {
      backgroundColor: "#2471a3",
      shadowColor: "#34495e",
      padding: 10,
      borderRadius: 20, 
      marginRight: 12, 
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    
});

export default MenuPage;