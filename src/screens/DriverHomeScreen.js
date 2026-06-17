import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Switch, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import api from '../utils/api'; // Uncomment when backend API is ready
// import { AuthContext } from '../context/AuthContext'; // For user role and token

const DriverHomeScreen = ({ navigation }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For loading new jobs
  const [currentJob, setCurrentJob] = useState(null); // Placeholder for active job data
  const [nearbyJobs, setNearbyJobs] = useState([]); // Placeholder for list of jobs to accept

  const driverName = 'Driver Dave'; // Example driver name
  const driverId = 'driver789'; // Example driver ID

  useEffect(() => {
    // If driver goes online, fetch initial jobs or set up location sharing
    if (isOnline) {
      fetchAvailableJobs();
      // Start background location updates
    } else {
      // Stop location updates, clear job notifications
      setNearbyJobs([]);
      setCurrentJob(null);
    }
  }, [isOnline]);

  const fetchAvailableJobs = async () => {
    setIsLoading(true);
    try {
      // --- Backend integration point ---
      // const response = await api.get(`/drivers/${driverId}/jobs/available`);
      // setNearbyJobs(response.data.jobs);

      // --- Placeholder logic ---
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network latency
      const mockJobs = [
        { id: `job_${Date.now()}`, type: 'Motorcycle', pickup: 'Fast Foods Galore', dropoff: '123 Residential Ave', eta: '5 min', fare: 'R 60.00' },
        { id: `job_${Date.now()+1}`, type: 'PickupTruck', pickup: 'Office Equipment Inc.', dropoff: 'Business Park B', eta: '10 min', fare: 'R 150.00' },
      ];
      setNearbyJobs(mockJobs);
      // --- End Placeholder ---

    } catch (error) {
      console.error('Error fetching available jobs:', error);
      Alert.alert('Error', 'Could not fetch new jobs. Please try again.');
      setNearbyJobs([]); // Clear jobs on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptJob = (job) => {
    console.log('Attempting to accept job:', job.id);
    navigation.navigate('JobDetails', { jobId: job.id }); // Navigate to JobDetails first to confirm
    // In JobDetails, a confirmation button would then set 'currentJob' and navigate to Tracking
  };

  const handleViewJobDetails = (job) => {
    navigation.navigate('JobDetails', { jobId: job.id });
  };

  const toggleOnlineStatus = (value) => {
    setIsOnline(value);
    // If going offline, you might want a confirmation dialog asking if they want to finish current job first
    if (!value) {
      // Potentially clear assigned jobs if they are offline
      setCurrentJob(null);
      setNearbyJobs([]);
    }
    // In a real app, this would trigger a backend update to change driver status
    console.log(`Driver is now: ${value ? 'Online' : 'Offline'}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo-transparent.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Hello, {driverName}!</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.statusLabel}>Status:</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isOnline ? "#007AFF" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleOnlineStatus}
            value={isOnline}
            disabled={isLoading} // Disable toggle while loading jobs
          />
          <Text style={[styles.statusText, { color: isOnline ? '#28a745' : '#dc3545' }]}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
        </View>
      </View>

      {currentJob ? (
        // Display if there's an active job
        <View style={styles.jobCardActive}>
          <Text style={styles.jobCardTitle}>Current Delivery</Text>
          <Text style={styles.jobDetail}>To: {currentJob.dropoff.name}</Text>
          <Text style={styles.jobDetail}>Est. Earnings: {currentJob.fare}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('DeliveryTracking', { bookingId: currentJob.id })}
          >
            <Text style={styles.buttonText}>Track Delivery</Text>
          </TouchableOpacity>
        </View>
      ) : isOnline ? (
        // Driver is online, looking for jobs
        <View style={styles.contentContainer}>
          {isLoading ? (
            <View style={styles.centeredContent}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.waitingText}>Fetching nearby jobs...</Text>
            </View>
          ) : nearbyJobs.length > 0 ? (
            <View>
              <Text style={styles.sectionTitle}>Available Jobs</Text>
              {nearbyJobs.map(job => (
                <View key={job.id} style={styles.jobCardAvailable}>
                  <View style={styles.jobInfo}>
                    <Icon name="truck-fast-outline" size={30} color="#007AFF" style={styles.jobIcon} />
                    <View style={styles.jobTextContainer}>
                      <Text style={styles.jobType}>{job.type}</Text>
                      <Text style={styles.jobLocation}>{job.pickup} → {job.dropoff}</Text>
                      <Text style={styles.jobMeta}>ETA: {job.eta} | Fare: {job.fare}</Text>
                    </View>
                  </View>
                  <View style={styles.jobActions}>
                    <TouchableOpacity style={[styles.buttonSmall, styles.detailButton]} onPress={() => handleViewJobDetails(job)}>
                      <Text style={styles.buttonSmallText}>Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonSmall, styles.acceptButton]} onPress={() => handleAcceptJob(job)}>
                      <Text style={styles.buttonSmallText}>Accept</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.centeredContent}>
              <Icon name="map-marker-radius-outline" size={70} color="#007AFF" />
              <Text style={styles.waitingText}>No new jobs nearby.</Text>
              <TouchableOpacity onPress={fetchAvailableJobs} style={styles.refreshButton}>
                <Text style={styles.refreshButtonText}>Refresh</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        // Driver is offline
        <View style={styles.offlineContainer}>
          <Icon name="power-plug-off-outline" size={70} color="#6c757d" />
          <Text style={styles.offlineText}>You are offline.</Text>
          <Text style={styles.offlineSubtext}>Go online to start receiving job requests.</Text>
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('DriverJobs')}>
          <Icon name="format-list-bulleted" size={24} color="#666" />
          <Text style={styles.navButtonText}>Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('DriverEarningsScreen')}>
          <Icon name="cash-multiple" size={24} color="#666" />
          <Text style={styles.navButtonText}>Earnings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('DriverProfile')}>
          <Icon name="account-cog" size={24} color="#666" />
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
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
    marginTop: Platform.OS === 'ios' ? 0 : 10,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flexShrink: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto', // Pushes to the right
  },
  statusLabel: {
    fontSize: 14,
    color: '#333',
    marginRight: 5,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  contentContainer: {
    flex: 1,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  waitingText: {
    fontSize: 18,
    color: '#555',
    marginTop: 15,
  },
  jobCardActive: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  jobCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 10,
  },
  jobDetail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  jobCardAvailable: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  jobIcon: {
    marginRight: 15,
  },
  jobTextContainer: {
    flex: 1, // Allow text container to expand
  },
  jobType: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  jobLocation: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
    flexShrink: 1, // Allow text to wrap
  },
  jobMeta: {
    fontSize: 12,
    color: '#666',
  },
  jobActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 3,
  },
  detailButton: {
    backgroundColor: '#6c757d',
  },
  acceptButton: {
    backgroundColor: '#28a745', // Green for accept
  },
  buttonSmallText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  refreshButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },
  refreshButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  offlineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offlineText: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 15,
  },
  offlineSubtext: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
    textAlign: 'center',
  },
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
  button: { // General button styles for active job card
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DriverHomeScreen;
