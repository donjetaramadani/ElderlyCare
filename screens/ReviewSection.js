import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // You can use any icon library

const ReviewSection = ({ hospital }) => {
  const [rating, setRating] = useState(0);  // Store the selected rating
  const [comment, setComment] = useState('');  // Store the comment
  const [reviews, setReviews] = useState(hospital?.reviews || []);  // Existing reviews

  const handleRating = (starRating) => {
    setRating(starRating);
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmitReview = () => {
    const newReview = { user: 'User', comment, rating };
    setReviews([...reviews, newReview]);
    setComment('');
    setRating(0);
  };

  return (
    <View style={styles.container}>
      {/* Existing Reviews */}
      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewsTitle}>Hospital Reviews</Text>
        <FlatList
          data={reviews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.reviewCard}>
              <Text style={styles.reviewAuthor}>{item.user}</Text>
              <Text style={styles.reviewText}>{item.comment}</Text>
              <Text style={styles.reviewRating}>Rating: {item.rating}/5</Text>
            </View>
          )}
        />
      </View>

      {/* Rating and Comment Section */}
      <View style={styles.ratingSection}>
        <Text style={styles.ratingTitle}>Rate this Hospital:</Text>
        <View style={styles.starRatingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleRating(star)}>
              <FontAwesome
                name={star <= rating ? 'star' : 'star-o'}
                size={30}
                color="#f39c12"
              />
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.commentInput}
          placeholder="Write your review..."
          value={comment}
          onChangeText={handleCommentChange}
          multiline
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  reviewsContainer: {
    marginTop: 20,
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
  ratingSection: {
    marginTop: 20,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 10,
  },
  starRatingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  commentInput: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 14,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ReviewSection;
