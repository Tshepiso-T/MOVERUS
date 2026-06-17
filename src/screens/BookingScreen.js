import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInputField from '../components/TextInputField'; // Import the reusable TextInputField
// import api from '../utils/api';

const BookingScreen = ({ route, navigation }) => {
  const { serviceType } = route.params || {};

  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [itemDetails, setItemDetails] = useState('');
  const [estimatedFare, setEstimatedFare] = useState('Calculating...');
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handlePickupLocationChange = (text) => setPickupLocation(text);
  const handleDropoffLocationChange = (text) => setDropoffLocation(text);
  const handleItemDetailsChange = (text) => setItemDetails(text);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      const currentDateTime = new Date(selectedDateTime);
      currentDateTime.setDate(date.getDate());
      currentDateTime.setMonth(date.getMonth());
      currentDateTime.setFullYear(date.getFullYear());
      setSelectedDateTime(currentDateTime);
    }
  };

  const handleTimeChange = (event, time) => {
    setShowTimePicker(false);
    if (time) {
      const currentDateTime = new Date(selectedDateTime);
      currentDateTime.setHours(time.getHours());
      currentDateTime.setMinutes(time.getMinutes());
      currentDateTime.setSeconds(0);
      setSelectedDateTime(currentDateTime);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const formatDateTime = (date) => {
    return date.toLocaleString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const estimateFare = async () => {
    if (!pickupLocation || !dropoffLocation || !serviceType) {
      Alert.alert("Missing Information", "Please fill in pickup, drop-off, and select a service type.");
      return;
    }
    setEstimatedFare('Estimating...');
    try {
      // Simulate fare estimation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEstimatedFare(`R ${(Math.random() * 200 + 100).toFixed(2)}`);
    } catch (error) {
      console.error("Fare Estimation Error:", error);
      setEstimatedFare('Error');
      Alert.alert('Fare Estimation Failed', 'Could not estimate fare. Please try again.');
    }
  };

  const handleBookNow = async () => {
    if (!pickupLocation || !dropoffLocation || !serviceType) {
      Alert.alert("Missing Information", "Please fill in pickup and drop-off locations.");
      return;
    }
    console.log('Booking Now for:', { serviceType, pickupLocation, dropoffLocation, itemDetails, selectedDateTime });
    try {
      // Placeholder navigation
      alert('Booking for now submitted! (Simulated)');
      navigation.replace('DeliveryTracking', { bookingId: `temp_${Date.now()}` });
    } catch (error) {
      console.error("Booking Error:", error);
      Alert.alert('Booking Failed', 'An error occurred while trying to book.');
    }
  };

  const handleScheduleBooking = async () => {
    if (!pickupLocation || !dropoffLocation || !serviceType) {
      Alert.alert("Missing Information", "Please fill in pickup and drop-off locations.");
      return;
    }
    await estimateFare();
    if (estimatedFare.startsWith('R')) {
      console.log('Scheduling booking for:', { serviceType, pickupLocation, dropoffLocation, itemDetails, selectedDateTime });
      try {
        alert('Booking scheduled! (Simulated)');
        navigation.replace('DeliveryTracking', { bookingId: `temp_${Date.now()}` });
      } catch (error) {
        console.error("Scheduled Booking Error:", error);
        Alert.alert('Booking Failed', 'An error occurred while trying to schedule.');
      }
    } else {
      Alert.alert("Fare Not Estimated", "Could not estimate fare. Please try again.");
    }
  };

  useEffect(() => {
    estimateFare();
  }, [serviceType, pickupLocation, dropoffLocation, selectedDateTime]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Book Your {serviceType || 'Service'}</Text>

      <View style={styles.mapContainer}>
        <Text style={styles.mapPlaceholderText}>Map Preview (Requires real-time location fetching and geocoding)</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -26.2041, // Johannesburg coordinates (example)
            longitude: 28.0473,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {pickupLocation && <Marker coordinate={{ latitude: -26.2041, longitude: 28.0473 }} title="Pickup" pinColor="green" />}
          {dropoffLocation && <Marker coordinate={{ latitude: -26.15, longitude: 28.05 }} title="Dropoff" pinColor="red" />}
        </MapView>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.sectionTitle}>Pickup & Drop-off</Text>
        <TextInputField
          label="Pickup Address"
          placeholder="Enter Pickup Address"
          value={pickupLocation}
          onChangeText={handlePickupLocationChange}
          iconName="map-marker-radius"
          containerStyle={styles.textInputContainer}
        />
        <TouchableOpacity onPress={() => Alert.alert("Add Stop", "Feature not yet implemented.")} style={styles.addStopButton}>
          <Icon name="plus-circle-outline" size={18} color="#007AFF" />
          <Text style={styles.addStopButtonText}>Add Stop</Text>
        </TouchableOpacity>
        <TextInputField
          label="Drop-off Address"
          placeholder="Enter Drop-off Address"
          value={dropoffLocation}
          onChangeText={handleDropoffLocationChange}
          iconName="map-marker-check"
          containerStyle={styles.textInputContainer}
        />
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.sectionTitle}>Item Details</Text>
        <TextInputField
          label="Item Description"
          placeholder="Describe items (e.g., 1x Sofa, 3x Boxes)"
          value={itemDetails}
          onChangeText={handleItemDetailsChange}
          multiline
          numberOfLines={3}
          inputStyle={styles.textArea} // Apply specific style for textarea
        />
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.sectionTitle}>Schedule Delivery</Text>
        <View style={styles.dateTimeContainer}>
          <TouchableOpacity onPress={showDatepicker} style={[styles.buttonSmall, { flex: 1, marginRight: 5 }]}>
            <Icon name="calendar" size={20} color="#fff" />
            <Text style={styles.buttonSmallText}>Date</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date(selectedDateTime)}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}

          <TouchableOpacity onPress={showTimepicker} style={[styles.buttonSmall, { flex: 1, marginLeft: 5 }]}>
            <Icon name="clock-outline" size={20} color="#fff" />
            <Text style={styles.buttonSmallText}>Time</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              testID="timePicker"
              value={new Date(selectedDateTime)}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </View>
        <Text style={styles.selectedDateTimeText}>
          Scheduled for: {formatDateTime(selectedDateTime)}
        </Text>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.sectionTitle}>Fare Estimate</Text>
        <Text style={styles.fareText}>{estimatedFare}</Text>
        <TouchableOpacity onPress={estimateFare} style={[styles.buttonSmall, styles.estimateButton]}>
          <Text style={styles.buttonSmallText}>Re-estimate Fare</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.button, styles.bookNowButton]} onPress={handleBookNow}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.scheduleButton]} onPress={handleScheduleBooking}>
          <Text style={styles.buttonText}>Schedule Booking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapPlaceholderText: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    zIndex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  inputSection: {
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
    color: '#000',
    marginBottom: 10,
  },
  textInputContainer: {
    // Consistent margin for TextInputField components
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  addStopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addStopButtonText: {
    color: '#007AFF',
    fontSize: 14,
    marginLeft: 5,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonSmall: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 120,
    justifyContent: 'center',
  },
  buttonSmallText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  estimateButton: {
    backgroundColor: '#6c757d',
  },
  selectedDateTimeText: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
  fareText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#28a745',
    marginTop: 5,
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 30,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  bookNowButton: {
    backgroundColor: '#007AFF',
    flex: 1,
    marginHorizontal: 5,
  },
  scheduleButton: {
    backgroundColor: '#28a745',
    flex: 1,
    marginHorizontal: 5,
  },
});

export default BookingScreen;
