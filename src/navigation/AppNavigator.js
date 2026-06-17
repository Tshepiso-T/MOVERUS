import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native'; // Added View, Text, etc. for PlaceholderScreen
import { NavigationContainer } from '@react-navigation/native'; // Ensure this is imported if not done in App.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Import the Bottom Tab Navigator
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // For tab icons

// Import Screens
import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/AuthScreen';
import CustomerHomeScreen from '../screens/CustomerHomeScreen';
import DriverHomeScreen from '../screens/DriverHomeScreen';
import BookingScreen from '../screens/BookingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DriverJobsScreen from '../screens/DriverJobsScreen';
import DeliveryTrackingScreen from '../screens/DeliveryTrackingScreen'; // Placeholder
import JobDetailsScreen from '../screens/JobDetailsScreen'; // Placeholder
import DriverProfileScreen from '../screens/DriverProfileScreen'; // Placeholder
// import OrderHistoryScreen from '../screens/OrderHistoryScreen'; // Placeholder for Customer
// import DriverEarningsScreen from '../screens/DriverEarningsScreen'; // Placeholder for Driver

// Placeholder for Auth context
// import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();
const CustomerTab = createBottomTabNavigator();
// const DriverTab = createBottomTabNavigator(); // If driver needs tabs too

// --- Placeholder Component ---
// Used for screens that are not yet fully implemented.
const PlaceholderScreen = ({ route, navigation, screenName }) => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderTitle}>{screenName} Screen</Text>
    <Text style={styles.placeholderInfo}>This is a placeholder for the {screenName} screen.</Text>
    <TouchableOpacity style={styles.placeholderButton} onPress={() => navigation.goBack()}>
      <Text style={styles.placeholderButtonText}>Go Back</Text>
    </TouchableOpacity>
    {/* Add logic to navigate to a next step if applicable */}
  </View>
);
// --- End Placeholder Component ---


// --- Customer Flow Navigator ---
// This will use a Stack Navigator for flows like booking, and a Tab Navigator for main sections.
const CustomerFlow = () => (
  <CustomerTab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false, // Tabs handle their own headers sometimes, or we can set it per screen
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'CustomerHomeTab') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'OrderHistoryTab') {
          iconName = focused ? 'history' : 'history';
        } else if (route.name === 'ProfileTab') {
          iconName = focused ? 'account-circle' : 'account-circle-outline';
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007AFF', // Primary blue
      tabBarInactiveTintColor: '#999',
      tabBarStyle: {
        backgroundColor: '#ffffff',
        paddingTop: 5,
        paddingBottom: 5,
        borderTopColor: '#eee',
        borderTopWidth: 1,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        marginTop: 3,
      },
    })}
  >
    {/* Tab screens */}
    <CustomerTab.Screen name="CustomerHomeTab" component={CustomerHomeStack} options={{ title: 'Home' }} />
    <CustomerTab.Screen name="OrderHistoryTab" component={OrderHistoryStack} options={{ title: 'History' }} />
    <CustomerTab.Screen name="ProfileTab" component={ProfileStack} options={{ title: 'Profile' }} />
  </CustomerTab.Navigator>
);

// Stack navigator for Customer Home/Booking flow
const CustomerHomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true, title: 'MoveRide' }}>
    <Stack.Screen name="CustomerHome" component={CustomerHomeScreen} options={{ title: 'Dashboard' }} />
    <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Book Service' }} />
    <Stack.Screen name="DeliveryTracking" component={DeliveryTrackingScreen} options={{ title: 'Tracking' }} />
    {/* Placeholder screens for detailed flows */}
    <Stack.Screen name="PaymentScreen" component={({ navigation }) => <PlaceholderScreen navigation={navigation} screenName="Payment" />} options={{ title: 'Payment' }} />
    <Stack.Screen name="OrderHistoryScreen" component={({ navigation }) => <PlaceholderScreen navigation={navigation} screenName="Order History" />} options={{ title: 'Order History' }} />
  </Stack.Navigator>
);

// Stack navigator for Order History
const OrderHistoryStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true, title: 'MoveRide' }}>
    <Stack.Screen name="OrderHistory" component={({ navigation }) => <PlaceholderScreen navigation={navigation} screenName="Order History" />} options={{ title: 'Order History' }} />
     {/* If Order History items were tappable, add detail screens here */}
  </Stack.Navigator>
);

// Stack navigator for Profile
const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: true, title: 'MoveRide' }}>
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />
    {/* Add other profile-related screens if needed, e.g., edit vehicle details for drivers */}
  </Stack.Navigator>
);


// --- Driver Flow Navigator ---
// If drivers also use tabs, create similar structure as CustomerFlow with DriverTab.Navigator
const DriverFlow = () => (
  <Stack.Navigator screenOptions={{ headerShown: true, title: 'MoveRide Driver' }}>
    <Stack.Screen name="DriverHome" component={DriverHomeScreen} options={{ title: 'Dashboard' }} />
    <Stack.Screen name="DriverJobs" component={DriverJobsScreen} options={{ title: 'My Jobs' }} />
    <Stack.Screen name="JobDetails" component={JobDetailsScreen} options={{ title: 'Job Details' }} />
    <Stack.Screen name="DriverProfile" component={DriverProfileScreen} options={{ title: 'Driver Profile' }} />
    <Stack.Screen name="DriverEarningsScreen" component={({ navigation }) => <PlaceholderScreen navigation={navigation} screenName="Driver Earnings" />} options={{ title: 'Earnings' }} />
    {/* Add other driver-specific screens */}
  </Stack.Navigator>
);


const AppNavigator = () => {
  // const { userToken } = useContext(AuthContext); // Use this to conditionally render screens
  // For now, simulate a logged-in customer state to test the tab navigator
  const userToken = 'MOCK_TOKEN';
  const userRole = 'customer'; // 'customer' or 'driver'

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!userToken ? (
        // --- Authentication Flow ---
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
        </>
      ) : userRole === 'customer' ? (
        // --- Customer Flow ---
        <Stack.Screen name="CustomerAppFlow" component={CustomerFlow} />
      ) : userRole === 'driver' ? (
        // --- Driver Flow ---
        <Stack.Screen name="DriverAppFlow" component={DriverFlow} />
      ) : null}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  placeholderInfo: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  placeholderButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  placeholderButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AppNavigator;
