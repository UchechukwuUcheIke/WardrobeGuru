import React from "react";
import { StyleSheet, Image, View, ViewStyle } from "react-native";
import PropTypes from "prop-types";

export default function OutfitDisplay({
    style,
    hatImgSrc,
    shirtImgSrc,
    pantsImgSrc,
    shoesImgSrc,
}) {
    return (
        <View style={style}>
            <Image
                style={styles.image}
                source={{
                    uri: hatImgSrc,
                }}
            />
            <Image
                style={styles.image}
                source={{
                    uri: shirtImgSrc,
                }}
            />
            <Image
                style={styles.image}
                source={{
                    uri: pantsImgSrc,
                }}
            />
            <Image
                style={styles.image}
                source={{
                    uri: shoesImgSrc,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "20%",
        marginBottom: "1%",
    },
});

OutfitDisplay.propTypes = {
    style: ViewStyle,
    hatImgSrc: PropTypes.string,
    shirtImgSrc: PropTypes.string,
    pantsImgSrc: PropTypes.string,
    shoesImgSrc: PropTypes.string,
};

OutfitDisplay.defaultProps = {
    style: {},
    hatImgSrc: " ",
    shirtImgSrc: " ",
    pantsImgSrc: " ",
    shoesImgSrc: " ",
};
