import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

interface CustomLinkProps {
  text: string;
  onPress: () => void;
}

const CustomLink: React.FC<CustomLinkProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "#007BFF",
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
});

export default CustomLink;
