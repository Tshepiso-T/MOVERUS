import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DriverProfileScreen = ({ navigation }) => {
  // Placeholder Driver Data - In a real app, this would be fetched from the backend
  const [driverData, setDriverData] = useState({
    name: 'Driver Dave',
    email: 'dave.driver@moveride.co.za',
    phoneNumber: '+27 81 987 6543',
    vehicleType: 'Motorcycle',
    vehicleModel: 'Honda CBX 250',
    licensePlate: 'PXD 456 GP',
    // Add more fields like insurance, PDP expiry, etc.
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (key, value) => {
    setDriverData({ ...driverData, [key]: value });
  };

  const handleSaveProfile = () => {
    // Implement logic to save updated driver data to backend
    console.log('Saving driver profile:', driverData);
    Alert.alert('Profile Saved', 'Your driver information has been updated.', [
      { text: 'OK', onPress: () => setIsEditing(false) },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo-transparent.png')} // Re-using the logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Driver Profile</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editButtonText}>{isEditing ? 'Cancel' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Driver Information</Text>
        {Object.keys(driverData).map((key) => {
          if (['vehicleType', 'vehicleModel', 'licensePlate'].includes(key)) {
            return (
              <View key={key} style={styles.inputRow}>
                <Text style={styles.label}>{key.replace(/([A-Z])/g, ' $1').trim()}:</Text>
                <TextInput
                  style={[
                    styles.input,
                    isEditing ? styles.editableInput : styles.disabledInput,
                  ]}
                  value={driverData[key]}
                  onChangeText={(value) => handleInputChange(key, value)}
                  editable={isEditing}
                  placeholderTextColor="#999"
                  autoCapitalize={key === 'name' ? 'words' : key === 'email' ? 'none' : 'sentences'}
                />
              </View>
            );
          }
          // Display other fields as non-editable or managed differently
           if (key === 'name' || key === 'email' || key === 'phoneNumber') {
            return (
              <View key={key} style={styles.inputRow}>
                <Text style={styles.label}>{key.replace(/([A-Z])/g, ' $1').trim()}:</Text>
                <Text style={styles.valueText}>{driverData[key]}</Text>
              </View>
            );
          }
          return null; // Hide other fields for now
        })}
      </View>

      {/* Add sections for vehicle documents, verification status, etc. */}
      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Vehicle Details</Text>
         <View style={styles.inputRow}>
          <Text style={styles.label}>Vehicle Type:</Text>
          <Text style={styles.valueText}>{driverData.vehicleType}</Text>
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Vehicle Model:</Text>
          <Text style={styles.valueText}>{driverData.vehicleModel}</Text>
        </View>
         <View style={styles.inputRow}>
          <Text style={styles.label}>License Plate:</Text>
          <Text style={styles.valueText}>{driverData.licensePlate}</Text>
        </View>
        {/* Placeholder for document upload/view */}
        <TouchableOpacity style={styles.buttonUpload} onPress={() => alert('Upload/View Documents')}>
          <Icon name="file-document-outline" size={20} color="#007AFF" />
          <Text style={styles.buttonUploadText}>Manage Vehicle Documents</Text>
        </TouchableOpacity>
      </View>

      {isEditing && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSaveProfile}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={() => Alert.alert('Logout', 'Are you sure you want to log out?', [{ text: 'Cancel' }, { text: 'Logout', onPress: () => navigation.replace('Auth') }])}>
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
  logo: {
    width: 50,
    height: 50,
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
    width: 150, // Adjusted width for potentially longer labels
  },
  valueText: {
    fontSize: 16,
    color: '#000',
    flexShrink: 1,
  },
  input: {
    height: 45,
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
  editableInput: {
    backgroundColor: '#ffffff',
  },
  disabledInput: {
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
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

export default DriverProfileScreen;
