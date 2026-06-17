import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TextInputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  secureTextEntry = false,
  iconName,
  iconPosition = 'left',
  containerStyle,
  inputStyle,
  labelStyle,
  iconStyle,
  ...props // Pass any other TextInput props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={[styles.inputWrapper, iconName ? styles[`iconWrapper${iconPosition}`] : styles.noIconWrapper]}>
        {iconName && iconPosition === 'left' && (
          <Icon name={iconName} size={22} color="#666" style={[styles.icon, iconStyle]} />
        )}
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#999"
          {...props} // Spread remaining props
        />
        {iconName && iconPosition === 'right' && (
          <Icon name={iconName} size={22} color="#666" style={[styles.icon, iconStyle]} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputWrapper: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    alignItems: 'center',
  },
  noIconWrapper: {
    // Default wrapper style when no icon is present
  },
  iconWrapperLeft: {
    paddingLeft: 10, // Adjust padding if icon is present
  },
  iconWrapperRight: {
    paddingRight: 10, // Adjust padding if icon is present
  },
  icon: {
    marginHorizontal: 10,
  },
  input: {
    flex: 1, // Input takes up available space
    fontSize: 16,
    color: '#000',
  },
});

export default TextInputField;
