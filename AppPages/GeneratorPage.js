import React from 'react';
import { StyleSheet, Image, Text, View, Switch} from 'react-native';
import Slider from '@react-native-community/slider';
import IconButton from '../Component/IconButton';

export default function GeneratorPage() {
  /** 
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
  */

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Outfit Generator</Text>

      <View style={styles.featureRow}>
        <Text style={styles.label}>Discovery Mode</Text>
        <Switch
          // value={isDiscoveryMode}
         // onValueChange={handleDiscoveryModeToggle}
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
          minimumTrackTintColor="#734F96"
          maximumTrackTintColor="#000000"
          // onValueChange={handleFormalityChange}
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

        <IconButton
          name = "close-outline"
          containerStylesheet = {styles.circularButton}
          iconStylesheet
        />

        <IconButton
          name = "checkmark-outline"
          containerStylesheet = {styles.circularButton}
          iconStylesheet
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    height: "100%"
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
    backgroundColor: '#734F96',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
  },
});
