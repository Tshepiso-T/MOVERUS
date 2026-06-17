import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps'; // Assuming react-native-maps is installed
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../utils/api'; // Assuming an api utility file will be created

// Placeholder for driver location updates
const DRIVER_LOCATION_UPDATES = [
  { latitude: -26.2041, longitude: 28.0473 }, // Johannesburg CBD
  { latitude: -26.205, longitude: 28.048 },
  { latitude: -26.206, longitude: 28.049 },
];

const DeliveryTrackingScreen = ({ route, navigation }) => {
  const { bookingId } = route.params;
  const [jobStatus, setJobStatus] = useState('In Progress');
  const [driverInfo, setDriverInfo] = useState({ name: 'Driver Dave', vehicle: 'Motorcycle', plate: 'XYZ 123 GP' });
  const [pickupLocation, setPickupLocation] = useState({ name: 'Pickup Point', coords: { latitude: -26.2041, longitude: 28.0473 } });
  const [dropoffLocation, setDropoffLocation] = useState({ name: 'Destination', coords: { latitude: -26.15, longitude: 28.05 } });
  const [driverLocation, setDriverLocation] = useState(DRIVER_LOCATION_UPDATES[0]);
  const [routeCoords, setRouteCoords] = useState([]); // For driver path

  useEffect(() => {
    // Simulate fetching booking details and driver location updates
    // In a real app, you'd use WebSockets for real-time location
    const interval = setInterval(() => {
      // Simulate driver moving
      const nextCoord = DRIVER_LOCATION_UPDATES[Math.floor(Math.random() * DRIVER_LOCATION_UPDATES.length)];
      setDriverLocation(nextCoord);
      setRouteCoords(prev => [...prev, nextCoord]); // Add to route path

      // Simulate status changes
      if (jobStatus === 'In Progress' && Math.random() > 0.8) setJobStatus('Arrived at Pickup');
      if (jobStatus === 'Arrived at Pickup' && Math.random() > 0.7) setJobStatus('En Route to Dropoff');
      if (jobStatus === 'En Route to Dropoff' && Math.random() > 0.6) setJobStatus('Delivered');

    }, 5000); // Update every 5 seconds

    // Fetch initial job details (replace with actual API call)
    // api.get(\`/bookings/\${bookingId}\`).then(response => { ... });

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [bookingId, jobStatus]);

  const handleContactDriver = () => {
    alert(`Contacting driver ${driverInfo.name}... (Simulated)`);
    // Implement in-app chat or direct call functionality
  };

  const handleViewProofOfDelivery = () => {
    alert('Viewing Proof of Delivery...');
    // Navigate to a screen showing signature/photos
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tracking Your Delivery</Text>
      <Text style={styles.bookingId}>Booking ID: {bookingId}</Text>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            ...pickupLocation.coords,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{ // Center map on driver or route
            latitude: driverLocation.latitude,
            longitude: driverLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={pickupLocation.coords} title="Pickup" pinColor="green">
            <Icon name="map-marker-radius" size={30} color="green" />
          </Marker>
          <Marker coordinate={dropoffLocation.coords} title="Dropoff" pinColor="red" />
          {driverLocation && (
            <Marker coordinate={driverLocation} title="Driver">
              <Image source={require('../assets/images/car-icon.png')} style={styles.driverIcon} resizeMode="contain" />
            </Marker>
          )}
          {routeCoords.length > 1 && (
            <Polyline
              coordinates={routeCoords.map(coord => ({ latitude: coord.latitude, longitude: coord.longitude }))}
              strokeColor="#007AFF"
              strokeWidth={3}
              lineDashPattern={[10, 10]} // Dashed line for route
            />
          )}
        </MapView>
        <View style={styles.statusOverlay}>
          <Text style={styles.statusText}>Status: <Text style={styles.statusValue}>{jobStatus}</Text></Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Driver:</Text>
        <Text style={styles.infoValue}>{driverInfo.name} ({driverInfo.vehicle} - {driverInfo.plate})</Text>
        <TouchableOpacity onPress={handleContactDriver} style={styles.contactButton}>
          <Icon name="chat-outline" size={20} color="#fff" />
          <Text style={styles.contactButtonText}>Contact Driver</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Pickup:</Text>
        <Text style={styles.infoValue}>{pickupLocation.name}</Text>
        <Text style={styles.infoLabel}>Dropoff:</Text>
        <Text style={styles.infoValue}>{dropoffLocation.name}</Text>
      </View>

      {jobStatus === 'Delivered' && (
        <TouchableOpacity onPress={handleViewProofOfDelivery} style={styles.podButton}>
          <Icon name="camera-outline" size={20} color="#fff" />
          <Text style={styles.podButtonText}>View Proof of Delivery</Text>
        </TouchableOpacity>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 5,
  },
  bookingId: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  mapContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  driverIcon: {
    width: 40,
    height: 40,
  },
  statusOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  statusValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'normal',
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginBottom: 10,
  },
  contactButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  podButton: {
    backgroundColor: '#ffc107', // Warning color
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  podButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});

// You'll need to create dummy car-icon.png in assets/images for the driver marker
// And ensure react-native-maps and related dependencies are correctly installed and linked.
// Also, an api.js utility file is assumed.

export default DeliveryTrackingScreen;
