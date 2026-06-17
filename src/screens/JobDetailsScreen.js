import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const JobDetailsScreen = ({ route, navigation }) => {
  // This screen would typically receive job details via route.params
  // For now, we'll use mock data.
  const job = {
    id: route.params?.jobId || 'job1',
    type: 'Motorcycle',
    pickup: { name: 'Shoprite Melville', address: '123 Main St, Melville, Johannesburg' },
    dropoff: { name: 'UCT Admin Building', address: '456 University Rd, Mowbray, Cape Town' }, // Example with different city
    date: '2026-06-14 10:30 AM',
    status: 'Completed',
    earnings: 'R 85.00',
    proofOfDelivery: { type: 'signature', notes: 'Customer signed electronic pad.'}, // or type: 'photo', url: '...'
    items: '1x Small Parcel',
  };

  const handleViewMap = () => {
    alert('Show map for this job');
    // Navigate to a map screen showing pickup/dropoff locations
  };

  const handleContactCustomer = () => {
    alert('Contact Customer (Simulated)');
  };

  const handleAcceptJob = () => {
    alert('Job Accepted! Navigating to tracking screen...');
    // In a real app, you'd update backend and navigate to tracking
    navigation.replace('DeliveryTracking', { bookingId: job.id });
  };

  const handleCancelJob = () => {
    // Implement cancel job logic with confirmation
    alert('Job Cancelled (Simulated)');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Job Details</Text>
      <Text style={styles.jobId}>ID: {job.id}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Details</Text>
        <View style={styles.detailRow}>
          <Icon name="truck-fast-outline" size={24} color="#007AFF" />
          <Text style={styles.detailText}>Type: {job.type}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="calendar-clock" size={24} color="#007AFF" />
          <Text style={styles.detailText}>Scheduled For: {job.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="package" size={24} color="#007AFF" />
          <Text style={styles.detailText}>Items: {job.items}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Locations</Text>
        <View style={styles.locationBox}>
          <View style={styles.addressRow}>
            <Icon name="map-marker-radius" size={28} color="green" />
            <View>
              <Text style={styles.locationName}>{job.pickup.name}</Text>
              <Text style={styles.address}>{job.pickup.address}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleViewMap} style={styles.mapButton}>
            <Icon name="map-outline" size={20} color="#fff" />
            <Text style={styles.mapButtonText}>View Map</Text>
          </TouchableOpacity>

          <View style={styles.addressRow}>
            <Icon name="map-marker-check" size={28} color="red" />
            <View>
              <Text style={styles.locationName}>{job.dropoff.name}</Text>
              <Text style={styles.address}>{job.dropoff.address}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status & Earnings</Text>
        <View style={styles.detailRow}>
          <Icon name="circle-medium" size={24} color={job.status === 'Completed' ? 'green' : job.status === 'Pending' ? 'orange' : 'gray'} />
          <Text style={[styles.detailText, { color: job.status === 'Completed' ? 'green' : job.status === 'Pending' ? 'orange' : 'gray' }]}>
            Status: {job.status}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="cash-multiple" size={24} color="#28a745" />
          <Text style={styles.detailText}>Estimated Earnings: {job.earnings}</Text>
        </View>
      </View>

      {job.proofOfDelivery && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Proof of Delivery</Text>
          <View style={styles.podRow}>
            <Icon name={job.proofOfDelivery.type === 'signature' ? "draw-pen" : "camera"} size={24} color="#007AFF" />
            <Text style={styles.podText}>{job.proofOfDelivery.type === 'signature' ? 'Digital Signature' : 'Photo Upload'}: {job.proofOfDelivery.notes || 'N/A'}</Text>
          </View>
          {/* Add functionality to view signature/photo */}
        </View>
      )}

      <View style={styles.actionButtons}>
        {job.status === 'Pending' && (
          <>
            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleAcceptJob}>
              <Text style={styles.buttonText}>Accept Job</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancelJob}>
              <Text style={styles.buttonText}>Decline Job</Text>
            </TouchableOpacity>
          </>
        )}
        {job.status === 'Pending' && ( // From driver's perspective, customer would see 'Booked' and then 'Contact'
          <TouchableOpacity style={[styles.button, styles.contactButton]} onPress={handleContactCustomer}>
            <Icon name="chat-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Contact Customer</Text>
          </TouchableOpacity>
        )}
        {job.status === 'Completed' && (
          <TouchableOpacity style={[styles.button, styles.feedbackButton]} onPress={() => alert('Rate job')}>
            <Icon name="star-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Rate Job</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  jobId: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  section: {
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  locationBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the top
    marginBottom: 15,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 3,
  },
  address: {
    fontSize: 14,
    color: '#555',
  },
  mapButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    width: 120, // Fixed width
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  mapButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  podRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  podText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 30,
    flexWrap: 'wrap', // Allow buttons to wrap
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10, // Space between buttons if they wrap
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  acceptButton: {
    backgroundColor: '#28a745', // Green for accept
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#dc3545', // Red for decline
    flex: 1,
    marginHorizontal: 5,
  },
  contactButton: {
    backgroundColor: '#007AFF',
    flex: 1,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  feedbackButton: {
    backgroundColor: '#ffc107', // Yellow for feedback
    flex: 1,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default JobDetailsScreen;
