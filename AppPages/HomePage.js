import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import TextButton from '../Component/TextButton';


export default function HomePage() {

    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading} >Hello, Johnathan!</Text>
                <Text style={styles.subheading}> {`Here's your outfit for the day!`} </Text>
            </View>
            <Image
                style={styles.image} 
                source={{
                    uri: 'https://i.pinimg.com/236x/4c/c9/0d/4cc90df3818e8a7a3cc4ab89672f1615.jpg',
                }}
            />
            <View style={styles.optionsContainer}>
                <Slider
                    style={{width: "50%", height: 40}}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#734F96"
                    maximumTrackTintColor="#000000"
                    
                />

                <TextButton 
                    text = "Looks good to me!"
                    containerStylesheet = {styles.buttonContainer}
                    textStylesheet = {styles.buttonText}
                />

                <TextButton 
                    text = "Pick something else"
                    containerStylesheet = {styles.buttonContainer}
                    textStylesheet = {styles.buttonText}
                />
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
    headingContainer: {
        width: "100%",
        height: "20%"
    },
    heading: {
        color: 'black',
        fontSize: 30,
        textAlign: 'center',
    },
    subheading: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
    },
    image: {
        width: "100%",
        height: "50%"
    },
    buttonContainer: {
        backgroundColor: "#734F96",
        marginTop: 5,
        paddingTop: 5,
        paddingLeft: 5, 
        paddingRight: 5, 
        paddingBottom: 5, 
        alignItems:"center"
    },
    optionsContainer: {
        width: "100%",
        height: "30%",
        alignItems:"center"
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    }
});