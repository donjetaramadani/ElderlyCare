import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, Modal } from "react-native";

const PharmacyPage = ({ navigation }) => {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [filters, setFilters] = useState({
        category: "",
        maxPrice: Infinity,
    });
    const [numColumns, setNumColumns] = useState(2);

    const menuItems = [
        { id: 1, name: "Aspirin", description: "Pain relief for headaches and minor aches", price: "$5", category: "Pain Relief", image: require("../assets/images/Aspirin.png") },
        { id: 2, name: "Ibuprofen", description: "Anti-inflammatory for pain and fever", price: "$8", category: "Pain Relief", image: require("../assets/images/Ibuprofen.png") },
        { id: 3, name: "Vitamin C", description: "Boosts immune system and helps prevent colds", price: "$6", category: "Supplements", image: require("../assets/images/VitaminC.png") },
        { id: 4, name: "Cold & Flu Medicine", description: "Relieves symptoms of cold and flu", price: "$12", category: "Cold & Flu", image: require("../assets/images/Cold&FluMedicine.png") },
        { id: 5, name: "Allergy Relief", description: "Reduces symptoms of hay fever and allergies", price: "$10", category: "Allergy", image: require("../assets/images/AllergyRelief.png") },
        { id: 6, name: "Cough Syrup", description: "Soothes throat and relieves coughing", price: "$7", category: "Cough & Cold", image: require("../assets/images/CoughSyrup.png") },
        { id: 7, name: "Probiotic Supplements", description: "Promotes gut health and digestive support", price: "$15", category: "Supplements", image: require("../assets/images/ProbioticSupplements.png") },
        { id: 8, name: "Antacid Tablets", description: "Relieves heartburn and indigestion", price: "$4", category: "Digestive Health", image: require("../assets/images/AntacidTablets.png") },
        { id: 9, name: "Sleep Aid", description: "Helps with falling and staying asleep", price: "$9", category: "Sleep Aid", image: require("../assets/images/SleepAid.png") },
        { id: 10, name: "Antibiotic Cream", description: "Topical treatment for cuts and infections", price: "$6", category: "Topical Treatments", image: require("../assets/images/AntibioticCream.png") },    
    ];

    const filteredMenu = menuItems.filter((item) => {
        const matchesCategory = filters.category === "" || item.category === filters.category;
        const matchesPrice = parseFloat(item.price.replace("$", "")) <= filters.maxPrice;

        return matchesCategory && matchesPrice;
    });

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchBarContainer}>
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
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.menuCard}>
                        <Image source={item.image} style={styles.menuImage} />
                        <View style={styles.cardContent}>
                            <Text style={styles.menuName}>{item.name}</Text>
                            <Text style={styles.menuDescription}>{item.description}</Text>
                            <View style={styles.cardFooter}>
                                <Text style={styles.menuPrice}>{item.price}</Text>
                                <TouchableOpacity style={styles.orderButton}>
                                    <Text style={styles.orderButtonText}>Order Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                numColumns={numColumns}
                key={`${numColumns}`} 
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
                            <TouchableOpacity
                                style={[
                                    styles.categoryButton,
                                    filters.category === "" && styles.categoryButtonSelected,
                                ]}
                                onPress={() => setFilters({ ...filters, category: "" })}
                            >
                                <Text style={styles.categoryButtonText}>All</Text>
                            </TouchableOpacity>
                            {["Pain Relief", "Supplements", "Cold & Flu", "Allergy", "Cough & Cold", "Sleep Aid", "Digestive Health", "Topical Treatments"].map((category) => (
                                <TouchableOpacity
                                    key={category}
                                    style={[
                                        styles.categoryButton,
                                        filters.category === category && styles.categoryButtonSelected,
                                    ]}
                                    onPress={() => setFilters({ ...filters, category })}
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
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 3,
        marginBottom: 16,
        width: "48%",
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
    orderButton: {
        backgroundColor: "#3E8E7E",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        flexShrink: 0, 
      },
      orderButtonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
      },

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
});

export default PharmacyPage;
