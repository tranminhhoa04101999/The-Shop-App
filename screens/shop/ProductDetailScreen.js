import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView, Image, Button, Text } from 'react-native';
import { useSelector ,useDispatch} from 'react-redux';
import { useFocusEffect } from '@react-navigation/native'
import Color from '../../constants/Colors';
import * as CartActions from '../../store/action/cart';


const ProductDetaiScreen = ({ props, navigation, route }) => {
    const { productId } = route.params;
    const productSelected = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));
    const dispatch = useDispatch();
    useFocusEffect(
        useCallback(() => {
            navigation.setOptions({
                title: productSelected.title,
            });
        }, [])
    );

    return (
        <ScrollView>
            <View style={styles.imgContainer}>
                <Image source={{ uri: productSelected.imageUrl }} style={styles.img} />
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title="Add To Cart" color={Color.deepPink} onPress={()=> dispatch(CartActions.addToCart(productSelected))} />
                </View>
            </View>
            <View style={styles.details}>
                <Text style={styles.price}>{productSelected.price} $</Text>
                <Text style={styles.description} >{productSelected.description}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: '100%',
    },
    imgContainer: {
        width: '100%',
        height: 300,
    },
    buttonContainer: {
        alignItems:'center',
        marginVertical: 10,
    },
    button: {
        width: '50%',
        borderRadius: 25,
        overflow: 'hidden',
    },
    details: {
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 15,
        fontFamily: 'OpenSans-Bold'
    },
    description: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'OpenSans-Regular'
    },
});

export default ProductDetaiScreen;