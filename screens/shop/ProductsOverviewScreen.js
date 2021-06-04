import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/ProductItem';
import * as CartActions from '../../store/action/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import Color from '../../constants/Colors';

const ProductOverviewScreen = ({ props, navigation }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () =>
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item iconName="menu" title="Menu" onPress={() => navigation.toggleDrawer()} />
                </HeaderButtons>,
            headerRight: () =>
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item iconName="cart-sharp" title="cart-outline" onPress={() => navigation.navigate('Cart')}></Item>
                </HeaderButtons>,
        });
    }, []);

    // const onSeleted = (id) => {
    //     navigation.navigate('ProductDetails', {
    //         productId: id,
    //     });
    // };

    const renderItem = (data) => {
        return <ProductItem
            title={data.item.title}
            price={data.item.price}
            imageUrl={data.item.imageUrl}
            onSelected={() => navigation.navigate('ProductDetails', {
                productId: data.item.id,
            })}
        >
            <View style={styles.buttonContainer}>
                <View style={styles.buttonLeft}>
                    <Button color={Color.deepPink} title="View Details"
                        onPress={() => navigation.navigate('ProductDetails', {
                            productId: data.item.id,
                        })} />
                </View>
                <View style={styles.buttonRight}>
                    <Button color={Color.deepPink} title="To Cart"
                        onPress={() => dispatch(CartActions.addToCart(data.item))}
                    />
                </View>
            </View>
        </ProductItem>
    };


    const availableProducts = useSelector(state => state.products.availableProducts);
    return (
        <FlatList data={availableProducts}
            keyExtractor={item => item.id}
            renderItem={renderItem} />
    );
};
const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: '15%',
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
});

export default ProductOverviewScreen;