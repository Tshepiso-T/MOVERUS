import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ServiceCard from '../components/ServiceCard'; // Import the reusable component

const CustomerHomeScreen = ({ navigation }) => {
  // Placeholder for user data or fetched data
  const customerName = 'Tshangwane'; // Example name

  const handleBookService = (serviceType) => {
    // Navigate to a booking screen, passing the selected service type
    console.log(`Navigating to booking for: ${serviceType}`);
    // Ensure BookingScreen is properly registered in AppNavigator
    navigation.navigate('Booking', { serviceType: serviceType });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo-transparent.png')} // Re-using the logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Welcome, {customerName}!</Text>
      </View>

      <Text style={styles.sectionTitle}>What do you need to move?</Text>

      <View style={styles.servicesContainer}>
        <ServiceCard
          iconName="motorbike"
          title="Motorcycle"
          subtitle="Parcels & Small Items"
          iconColor="#007AFF"
          onPress={() => handleBookService('Motorcycle')}
        />
        <ServiceCard
          iconName="truck-pickup"
          title="Pickup Truck"
          subtitle="Furniture & Appliances"
          iconColor="#007AFF"
          onPress={() => handleBookService('PickupTruck')}
        />
        <ServiceCard
          iconName="truck"
          title="Code 10 Truck"
          subtitle="Larger Loads & Equipment"
          iconColor="#007AFF"
          onPress={() => handleBookService('Code10Truck')}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('OrderHistoryScreen')}>
          <Icon name="history" size={24} color="#666" />
          <Text style={styles.navButtonText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
          <Icon name="account-circle" size={24} color="#666" />
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
        {/* Add more navigation options as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: Platform.OS === 'ios' ? 0 : 10, // Adjust for status bar on Android
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
  },
  servicesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Removed styles for individual serviceCards as they are now in ServiceCard.js
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 15,
    backgroundColor: '#ffffff',
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
});

export default CustomerHomeScreen;
