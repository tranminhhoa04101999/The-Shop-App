import React, { useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/ProductItem';
import * as CartActions from '../../store/action/cart';
import { useFocusEffect } from '@react-navigation/native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';

const ProductOverviewScreen = ({ props, navigation }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => 
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item iconName="cart-sharp" title="cart-outline" onPress={()=> navigation.navigate('Cart')}></Item>
                </HeaderButtons>,
        });
    }, []);

    const renderItem = (data) => {
        return <ProductItem
            title={data.item.title}
            price={data.item.price}
            imageUrl={data.item.imageUrl}
            onPressDetails={() => navigation.navigate('ProductDetails', {
                productId: data.item.id,
            })}
            onPressToCart={() => dispatch(CartActions.addToCart(data.item))}
        />
    };


    const availableProducts = useSelector(state => state.products.availableProducts);
    return (
        <FlatList data={availableProducts}
            keyExtractor={item => item.id}
            renderItem={renderItem} />
    );
};

export default ProductOverviewScreen;