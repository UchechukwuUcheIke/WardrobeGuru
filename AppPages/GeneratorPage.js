import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, Switch, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

export default function GeneratorPage() {
  const [isDiscoveryMode, setDiscoveryMode] = useState(false);
  const [formalityLevel, setFormalityLevel] = useState(0);

  const handleDiscoveryModeToggle = () => {
    setDiscoveryMode(!isDiscoveryMode);
  };

  const handleFormalityChange = (value) => {
    setFormalityLevel(value);
  };

  const handleCheck = () => {
    // Handle check action
  };

  const handleCancel = () => {
    // Handle cancel action
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Outfit Generator</Text>

      <View style={styles.featureRow}>
        <Text style={styles.label}>Discovery Mode</Text>
        <Switch
          value={isDiscoveryMode}
          onValueChange={handleDiscoveryModeToggle}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          ios_backgroundColor="#3e3e3e"
        />
      </View>

      <View style={styles.featureRow}>
        <Text style={styles.label}>Casual</Text>
        <Slider
          style={{ width: '40%', height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#81b0ff"
          maximumTrackTintColor="#000000"
          onValueChange={handleFormalityChange}
        />
        <Text style={styles.label}>Formal</Text>
      </View>

      <Image
        style={styles.image}
        source={{
          uri: 'https://i.pinimg.com/236x/4c/c9/0d/4cc90df3818e8a7a3cc4ab89672f1615.jpg',
        }}
      />

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.circularButton} onPress={handleCancel}>
          <Text style={[styles.buttonText, { color: 'rgba(0, 0, 0, 0.6)' }]}>✘</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.circularButton} onPress={handleCheck}>
          <Text style={styles.buttonText}>✔</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  heading: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: '60%',
    marginTop: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 20,
  },
  circularButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#81b0ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
  label: {
    fontSize: 20,
  },
});
