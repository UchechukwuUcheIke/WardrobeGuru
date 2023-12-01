import React from "react";
import { StyleSheet, Image, View } from "react-native";
import PropTypes from "prop-types";

export default function OutfitDisplay({
    hatImgSrc,
    shirtImgSrc,
    pantsImgSrc,
    shoesImgSrc,
}) {
    return (
        <View style={styles.displayStyle}>
            <Image
                style={styles.image}
                source={{
                    uri: hatImgSrc,
                }}
                resizeMode="contain"
            />
            <Image
                style={styles.image}
                source={{
                    uri: shirtImgSrc,
                }}
                resizeMode="contain"
            />
            <Image
                style={styles.image}
                source={{
                    uri: pantsImgSrc,
                }}
                resizeMode="contain"
            />
            <Image
                style={styles.image}
                source={{
                    uri: shoesImgSrc,
                }}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    displayStyle: {
        width: "50%",
        height: "50%",
        marginBottom: "1%",
    },
    image: {
        width: "100%",
        height: "20%",
        marginBottom: "1%",
    },
});

OutfitDisplay.propTypes = {
    hatImgSrc: PropTypes.string,
    shirtImgSrc: PropTypes.string,
    pantsImgSrc: PropTypes.string,
    shoesImgSrc: PropTypes.string,
};

OutfitDisplay.defaultProps = {
    hatImgSrc: " ",
    shirtImgSrc: " ",
    pantsImgSrc: " ",
    shoesImgSrc: " ",
};
