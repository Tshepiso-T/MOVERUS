import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image,
} from 'react-native';
import api from '../utils/api'; // Import the api utility
import TextInputField from '../components/TextInputField'; // Import the reusable TextInputField

const AuthScreen = ({ navigation }) => {
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between Login and Sign Up
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handlePhoneNumberSubmit = async () => {
    // Basic phone number validation
    if (!phoneNumber.trim() || !/^\+?[\d\s]+$/.test(phoneNumber)) {
      Alert.alert('Invalid Input', 'Please enter a valid phone number (e.g., +27 80 123 4567).');
      return;
    }
    // In a real app, send OTP via backend
    console.log('Requesting OTP for:', phoneNumber);
    try {
      const response = await api.post('/auth/request-otp', { phoneNumber: phoneNumber });
      if (response.data.success) {
        setIsOtpSent(true);
        Alert.alert('OTP Sent', 'A verification code has been sent to your number.');
      } else {
        Alert.alert('Error', response.data.message || 'Could not send OTP.');
      }
    } catch (error) {
      console.error('OTP Request Error:', error);
      Alert.alert('Error', 'Failed to send OTP. Please try again later.');
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp.trim() || otp.length < 4) {
      Alert.alert('Invalid Input', 'Please enter a valid verification code.');
      return;
    }
    // In a real app, verify OTP with your backend.
    console.log('Verifying OTP:', otp, 'for phone:', phoneNumber);
    try {
      const response = await api.post('/auth/verify-otp', { phoneNumber: phoneNumber, otp: otp });
      if (response.data.success) {
        // Assuming successful verification logs the user in and returns a token & role
        // Store token and role (e.g., in AsyncStorage)
        // await AsyncStorage.setItem('userToken', response.data.token);
        // await AsyncStorage.setItem('userRole', response.data.role);

        // Navigate based on user role
        if (response.data.role === 'customer') {
          navigation.replace('CustomerAppFlow');
        } else if (response.data.role === 'driver') {
          navigation.replace('DriverAppFlow');
        } else {
          Alert.alert('Login Error', 'Unknown user role. Please contact support.');
        }
      } else {
        Alert.alert('Verification Failed', response.data.message || 'Invalid code. Please try again.');
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
      Alert.alert('Error', 'Failed to verify OTP. Please check the code or try again.');
    }
  };

  const toggleAuthMode = () => {
    setIsLoginMode(prevMode => !prevMode);
    setIsOtpSent(false); // Reset OTP sent status when switching modes
    setPhoneNumber('');
    setOtp('');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo-transparent.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>{isLoginMode ? 'Welcome Back!' : 'Create Account'}</Text>
      <Text style={styles.subtitle}>
        {isLoginMode ? 'Log in to continue' : 'Sign up to get started'}
      </Text>

      {!isOtpSent ? (
        <View style={styles.inputForm}>
          <TextInputField
            label="Phone Number"
            placeholder="+27 80 123 4567"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            autoComplete="tel"
            textContentType="telephoneNumber"
            iconName="phone" // Example icon
          />
          <TouchableOpacity style={styles.button} onPress={handlePhoneNumberSubmit}>
            <Text style={styles.buttonText}>
              {isLoginMode ? 'Get Verification Code' : 'Send Sign-up Code'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.inputForm}>
          <TextInputField
            label="Enter Verification Code"
            placeholder="123456"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
            maxLength={6}
            iconName="lock-check-outline" // Example icon
          />
          <TouchableOpacity style={styles.button} onPress={handleOtpSubmit}>
            <Text style={styles.buttonText}>Verify Code</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsOtpSent(false)} style={styles.resendButton}>
             <Text style={styles.resendButtonText}>Resend Code</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>
          {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
        </Text>
        <TouchableOpacity onPress={toggleAuthMode}>
          <Text style={styles.switchButtonText}>
            {isLoginMode ? 'Sign Up' : 'Log In'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  inputForm: { // Changed from inputContainer to inputForm for clarity
    width: '100%',
    maxWidth: 400,
    alignItems: 'center', // Center form elements within the form
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%', // Make button full width within maxWidth
    marginTop: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  resendButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  resendButtonText: {
    color: '#007AFF',
    fontSize: 14,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  switchText: {
    fontSize: 14,
    color: '#666',
    marginRight: 5,
  },
  switchButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default AuthScreen;
