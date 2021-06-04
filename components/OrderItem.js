import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Color from '../constants/Colors';
import CartItem from '../components/CartItem';

const OrderItem = (props) => {
    const [viewDetails, setViewDetails] = useState(false);

    return (
        <View style={styles.OrderItem}>
            <View style={styles.detail}>
                <Text style={styles.amount}>$ {props.totalAmount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.button}><Button color={Color.deepPink} title={viewDetails ? "Hide Details" : "Show Details"}
                    onPress={() => setViewDetails(tt => !tt)} /></View>
            </View>
            {viewDetails &&
                
                <View style = {styles.viewDetails}>
                    {props.items.map(item => <CartItem key={item.productId}  quantity={item.quantity} title={item.productTitle} sum={item.sum} />)}
                </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    OrderItem: {
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        borderRadius: 15,
        margin: 10,
        overflow: 'hidden',

    },
    detail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    button: {
        width: '50%',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        overflow: 'hidden',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    amount: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 16,
    },
    date: {
        fontFamily: 'OpenSans',
        fontSize: 16,
        color: '#888'
    },
    viewDetails: {
        width:'100%'
    }
});

export default OrderItem;