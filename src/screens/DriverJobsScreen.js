import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Mock Data: Replace with actual data fetching from backend
const mockJobs = [
  { id: 'job1', type: 'Motorcycle', pickup: 'Shoprite Melville', dropoff: 'UCT Admin Building', status: 'Completed', date: '2026-06-14', earnings: 'R 85.00' },
  { id: 'job2', type: 'PickupTruck', pickup: '123 Furniture Road', dropoff: '456 Apartment Ave', status: 'Completed', date: '2026-06-14', earnings: 'R 180.00' },
  { id: 'job3', type: 'Code10Truck', pickup: 'Warehouse C, Industrial Rd', dropoff: 'Construction Site B', status: 'Pending', date: '2026-06-15', earnings: 'R 550.00' },
  { id: 'job4', type: 'Motorcycle', pickup: 'Sandton City', dropoff: 'Randburg Square', status: 'Completed', date: '2026-06-13', earnings: 'R 70.00' },
];

const DriverJobsScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState(mockJobs); // Use mock data for now
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'

  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    if (filter === 'completed') return job.status === 'Completed';
    if (filter === 'pending') return job.status === 'Pending';
    return true;
  });

  const handleJobPress = (job) => {
    // Navigate to a more detailed job view or handling screen
    console.log('Navigating to details for job:', job.id);
    // Example: navigation.navigate('JobDetails', { jobId: job.id });
    alert(`Viewing details for job ID: ${job.id}`);
  };

  const renderJobItem = ({ item }) => (
    <TouchableOpacity style={styles.jobCard} onPress={() => handleJobPress(item)}>
      <View style={styles.jobInfo}>
        <Icon name="truck-fast-outline" size={30} color="#007AFF" style={styles.jobIcon} />
        <View>
          <Text style={styles.jobType}>{item.type}</Text>
          <Text style={styles.jobLocation}>{item.pickup} → {item.dropoff}</Text>
          <Text style={styles.jobDateStatus}>
            <Text style={{ fontWeight: 'bold' }}>{item.status}</Text> | {item.date}
          </Text>
        </View>
      </View>
      {item.earnings && (
        <Text style={styles.jobEarnings}>{item.earnings}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo-transparent.png')} // Re-using the logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>My Jobs</Text>
        <View style={styles.filterContainer}>
          <TouchableOpacity onPress={() => setFilter('all')} style={[styles.filterButton, filter === 'all' && styles.activeFilter]}>
            <Text style={[styles.filterButtonText, filter === 'all' && styles.activeFilterText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter('completed')} style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}>
            <Text style={[styles.filterButtonText, filter === 'completed' && styles.activeFilterText]}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter('pending')} style={[styles.filterButton, filter === 'pending' && styles.activeFilter]}>
            <Text style={[styles.filterButtonText, filter === 'pending' && styles.activeFilterText]}>Pending</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredJobs}
        renderItem={renderJobItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyListText}>No jobs found for this filter.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: Platform.OS === 'ios' ? 20 : 0, // Adjust for status bar
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff', // White background for header area
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    flexGrow: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeFilter: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  jobCard: {
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
    flex: 1, // Allow job info to take available space and wrap text
    marginRight: 10,
  },
  jobIcon: {
    marginRight: 15,
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
    flexWrap: 'wrap', // Allow location text to wrap
  },
  jobDateStatus: {
    fontSize: 12,
    color: '#666',
  },
  jobEarnings: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745', // Green for earnings
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});

export default DriverJobsScreen;
