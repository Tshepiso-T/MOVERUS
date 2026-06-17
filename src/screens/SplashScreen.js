import React, { useEffect} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate a loading process or delay
    const timer = setTimeout(() => {
      // Navigate to the Auth screen after 3 seconds
      navigation.replace('Auth'); // Or navigate to CustomerHome/DriverHome if session exists
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo-transparent.png')} // Placeholder for your app logo
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>MoveRide</Text>
      <Text style={styles.subtitle}>Your Delivery & Moving Partner</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Or your brand's primary color
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000', // Or your brand's text color
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666', // Or a secondary text color
  },
});

export default SplashScreen;
