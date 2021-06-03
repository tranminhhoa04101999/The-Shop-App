import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/ProductItem';

const renderItem = (data) => {
    return <ProductItem
        title={data.item.title}
        price={data.item.price}
        imageUrl={data.item.imageUrl}
    />
};

const ProductOverviewScreen = props => {
    const availableProducts = useSelector(state => state.products.availableProducts);
    return (
        <FlatList data={availableProducts}
            keyExtractor={item => item.id}
            renderItem={renderItem} />
    );
};

const styles = StyleSheet.create({

});

export default ProductOverviewScreen;