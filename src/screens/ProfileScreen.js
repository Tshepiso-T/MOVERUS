import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../utils/api'; // Assuming you will have API calls for profile updates
import TextInputField from '../components/TextInputField'; // Import the reusable TextInputField

// Mock data for demonstration. In production, this would be fetched from the backend.
const MOCK_CUSTOMER_DATA = {
  id: 'cust123',
  name: 'Tshangwane',
  email: 'tshangwane@example.com',
  phoneNumber: '+27 80 123 4567',
  role: 'customer',
  address: '123 Main Street, Johannesburg, 2001',
};

const MOCK_DRIVER_DATA = {
  id: 'driver789',
  name: 'Driver Dave',
  email: 'dave.driver@moveride.co.za',
  phoneNumber: '+27 81 987 6543',
  role: 'driver',
  vehicleType: 'Motorcycle',
  vehicleModel: 'Honda CBX 250',
  licensePlate: 'PXD 456 GP',
  // Add more fields like insurance, PDP expiry, bank details, etc.
};

const ProfileScreen = ({ navigation, route }) => {
  const isDriverProfile = route.params?.isDriver || false;
  const [profileData, setProfileData] = useState(isDriverProfile ? MOCK_DRIVER_DATA : MOCK_CUSTOMER_DATA);
  const [isEditing, setIsEditing] = useState(false);
  const [originalProfileData, setOriginalProfileData] = useState({});

  useEffect(() => {
    setProfileData(isDriverProfile ? MOCK_DRIVER_DATA : MOCK_CUSTOMER_DATA);
    setOriginalProfileData(isDriverProfile ? MOCK_DRIVER_DATA : MOCK_CUSTOMER_DATA);
  }, [isDriverProfile]);

  const handleInputChange = (key, value) => {
    setProfileData({ ...profileData, [key]: value });
  };

  const handleSaveProfile = async () => {
    console.log('Saving profile:', profileData);
    try {
      // --- Backend integration point ---
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network latency
      Alert.alert('Profile Saved', 'Your information has been updated.', [
        { text: 'OK', onPress: () => setIsEditing(false) },
      ]);
      setOriginalProfileData(profileData);
    } catch (error) {
      console.error('Profile Save Error:', error);
      Alert.alert('Save Failed', 'An error occurred while saving your profile.');
    }
  };

  const handleCancelEdit = () => {
    setProfileData(originalProfileData);
    setIsEditing(false);
    Alert.alert('Changes Discarded', 'Your profile edits have been cancelled.');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => {
        navigation.replace('Auth');
      }, style: 'destructive' },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo-transparent.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>{isEditing ? 'Edit Profile' : 'My Profile'}</Text>
        <TouchableOpacity onPress={() => isEditing ? handleCancelEdit() : setIsEditing(true)}>
          <Text style={styles.editButtonText}>{isEditing ? 'Cancel' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Account Information</Text>
        <TextInputField
            label="Full Name"
            value={profileData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            editable={isEditing}
            autoCapitalize="words"
            iconName={isEditing ? "account-edit-outline" : "account-circle-outline"}
            containerStyle={styles.textInputContainer}
        />
        <TextInputField
            label="Phone Number"
            value={profileData.phoneNumber}
            onChangeText={(value) => handleInputChange('phoneNumber', value)}
            editable={false} // Phone number typically managed via OTP flow
            keyboardType="phone-pad"
            iconName="phone"
            containerStyle={styles.textInputContainer}
            inputStyle={styles.disabledInput} // Style for non-editable fields
        />
        <TextInputField
            label="Email"
            value={profileData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            editable={isEditing}
            keyboardType="email-address"
            autoCapitalize="none"
            iconName={isEditing ? "email-edit-outline" : "email-outline"}
            containerStyle={styles.textInputContainer}
        />
      </View>

      {profileData.role === 'driver' && (
        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Vehicle Details</Text>
          <TextInputField
            label="Vehicle Type"
            value={profileData.vehicleType}
            onChangeText={(value) => handleInputChange('vehicleType', value)}
            editable={isEditing}
            iconName="truck-outline"
            containerStyle={styles.textInputContainer}
          />
          <TextInputField
            label="Vehicle Model"
            value={profileData.vehicleModel}
            onChangeText={(value) => handleInputChange('vehicleModel', value)}
            editable={isEditing}
            iconName="car-info"
            containerStyle={styles.textInputContainer}
          />
          <TextInputField
            label="License Plate"
            value={profileData.licensePlate}
            onChangeText={(value) => handleInputChange('licensePlate', value)}
            editable={isEditing}
            autoCapitalize="characters"
            iconName="order-numeric-descending"
            containerStyle={styles.textInputContainer}
          />
          <TouchableOpacity style={styles.buttonUpload} onPress={() => Alert.alert("Manage Documents", "Feature not yet implemented.")}>
            <Icon name="file-document-outline" size={20} color="#007AFF" />
            <Text style={styles.buttonUploadText}>Manage Vehicle Documents</Text>
          </TouchableOpacity>
        </View>
      )}

      {profileData.role === 'customer' && (
        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TextInputField
            label="Default Address"
            value={profileData.address}
            onChangeText={(value) => handleInputChange('address', value)}
            editable={isEditing}
            iconName={isEditing ? "map-marker-radius-outline" : "map-marker"}
            containerStyle={styles.textInputContainer}
          />
          {/* Add option to manage multiple addresses */}
        </View>
      )}

      {isEditing && (
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSaveProfile}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={20} color="#fff" />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    marginTop: Platform.OS === 'ios' ? 0 : 10,
  },
  logo: { // Kept small for header consistency
    width: 40,
    height: 40,
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    flexGrow: 1,
  },
  editButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  textInputContainer: {
    // Added to provide consistent margin for each text input field
    marginBottom: 15,
  },
  // Removed individual inputRow styles as TextInputField handles its own layout
  // label: { ... }, // Label styling is handled within TextInputField
  // valueText: { ... }, // Value text styling for non-editable fields
  disabledInput: { // Specific style for non-editable fields
    backgroundColor: '#eeeeee',
    color: '#666',
  },
  buttonUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonUploadText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },
});

export default ProfileScreen;
