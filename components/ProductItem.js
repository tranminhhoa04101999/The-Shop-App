import React from 'react';
import { View, StyleSheet, Image, Text, Button, ColorPropType } from 'react-native';
import Color from '../constants/Colors';

const ProductItem = props => {
    return (
        <View style={styles.screen}>
            <View style={styles.imageContainer}>
            <Image source={{ uri: props.imageUrl }} style={styles.image} />

            </View>
            <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>{props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonLeft}><Button color={Color.deepPink} title="View Details" onPress={() => { }}></Button></View>
                <View style={styles.buttonRight}><Button color={Color.deepPink} title="To Cart" onPress={() => { }}></Button></View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        marginVertical: 10,
        marginHorizontal: 15,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        borderRadius: 15,
        backgroundColor: 'white',
        overflow: 'hidden',
        height: 300,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    details: {
        height: '25%',
        alignItems: 'center',
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '18%',
    },
    buttonLeft: {
        borderTopRightRadius: 15,
        overflow: 'hidden',
        width: '30%',
    },
    buttonRight: {
        borderTopLeftRadius: 15,
        overflow: 'hidden',

    },
    title: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 18,
        marginVertical: 4,
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
    imageContainer: {
        width: '100%',
        height:'60%',
    },

});

export default ProductItem;