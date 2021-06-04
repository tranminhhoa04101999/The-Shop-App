import React from 'react';
import { View, StyleSheet, FlatList, Button, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Color from '../../constants/Colors';
import CartItem from '../../components/CartItem';
import * as CartActions from '../../store/action/cart';
import * as OrderActions from '../../store/action/order';

const CartScreen = props => {
    const dispatch = useDispatch();


    const listItem = useSelector(state => {
        const chuyenDoiQuaArray = [];
        for (const key in state.cart.items) {
            chuyenDoiQuaArray.push({
                productId: key,
                productTitle: state.cart.items[key].ProductTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }
        return chuyenDoiQuaArray;
    });
    const renderItem = (data) => {
        return (
            <CartItem
                quantity={data.item.quantity}
                title={data.item.productTitle}
                price={data.item.productPrice}
                checkDelete = {true}
                sum={data.item.sum}
                onRemove={() => dispatch(CartActions.removeFromCart(data.item.productId))}
            />
        );

    };
    const totalAmount = useSelector(state => state.cart.totalAmount);
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total : <Text style={styles.amount}>$ {totalAmount.toFixed(2)}</Text>
                </Text>
                <Button title="Order Now" disabled={listItem.length === 0}
                    onPress={() => dispatch(OrderActions.addOrder(listItem, totalAmount))} ></Button>
            </View>
            <FlatList data={listItem} keyExtractor={item => item.productId} renderItem={renderItem} />
        </View>

    );
};

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 15,
    },
    summaryText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 19,
    },
    amount: {
        color: Color.accentColor,
    },
});

export default CartScreen;