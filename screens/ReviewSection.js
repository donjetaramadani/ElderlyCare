import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { UserContext } from './UserContext'; 

const ReviewSection = ({ hospital }) => {
  const navigation = useNavigation();
  const { currentUser } = useContext(UserContext); 
  const [rating, setRating] = useState(0);  
  const [comment, setComment] = useState('');  
  const [reviews, setReviews] = useState(hospital?.reviews || []);  
  const hospitalId = hospital?.id;

  // Fetch reviews from the backend when the component mounts
  useEffect(() => {
    if (hospitalId) {
      fetchReviews();
    } else {
      console.error('Hospital ID is not provided');
    }
  }, [hospitalId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://192.168.0.36:5196/api/Reviews/${hospitalId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      Alert.alert('Error', 'Failed to load reviews. Please try again later.');
    }
  };

  const handleRating = (starRating) => {
    setRating(starRating);
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  /*
  const handleSubmitReview = async () => {
    const newReview = {
      user: currentUser, // Replace with the actual user, if available
      hospitalId, 
      comment, 
      rating,
    };*/

    const handleSubmitReview = async () => {
      if (!currentUser) {
        Alert.alert(
          'Login Required',
          'You need to log in to write a review.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Login', onPress: () => navigation.navigate('Login') },
          ]
        );
        return;
      }
      

    const newReview = { user: currentUser, hospitalId, comment, rating };
    try {
      const response = await fetch(`http://192.168.0.36:5196/api/Reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const savedReview = await response.json();
      setReviews([...reviews, savedReview]); // Add the new review to the local list
      setComment('');
      setRating(0);
      Alert.alert('Success', 'Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      Alert.alert('Error', 'Failed to submit review. Please try again later.');
    }
  };


  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`http://192.168.0.36:5196/api/Reviews/${reviewId}?user=${currentUser}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete review');
      }

      setReviews(reviews.filter((review) => review.id !== reviewId));
      Alert.alert('Success', 'Review deleted successfully!');
    } catch (error) {
      console.error('Error deleting review:', error);
      Alert.alert('Error', 'Failed to delete review. Please try again later.');
    }
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
              {item.user === currentUser && (
                <TouchableOpacity onPress={() => handleDeleteReview(item.id)}>
                  <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
              )}
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
