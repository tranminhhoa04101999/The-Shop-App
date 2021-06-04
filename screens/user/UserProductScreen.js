import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Button, Alert } from 'react-native';
import ProductItem from '../../components/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import * as ProductActions from '../../store/action/product';
import Color from '../../constants/Colors';

const UserProductScreen = ({ props, navigation }) => {
    const userProduct = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();
    const deleteHandler = (data) => {
        Alert.alert('Are you sure??', 'Do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            { text: 'Yes', style: 'destructive', onPress: () => { dispatch(ProductActions.deleteProduct(data.item.id)) } }
        ]);
    };

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () =>
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item iconName="menu" title="Menu" onPress={() => navigation.toggleDrawer()} />
                </HeaderButtons>,
            headerRight: () =>
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item iconName="add-circle" title="add-circle" onPress={() => navigation.navigate('edit', { title: "Add New Product" })} />
                </HeaderButtons>,
        });
    }, []);
    return (
        <FlatList data={userProduct} keyExtractor={item => item.id} renderItem={
            data => <ProductItem
                imageUrl={data.item.imageUrl}
                title={data.item.title}
                price={data.item.price}
                onSelected={() => navigation.navigate('edit',
                    {
                        title: "Edit " + data.item.title,
                        prodId: data.item.id
                    })}
            >
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonLeft}><Button color={Color.deepPink} title="Edit"
                        onPress={() => navigation.navigate('edit',
                            {
                                title: "Edit " + data.item.title,
                                prodId: data.item.id
                            })}></Button></View>
                    <View style={styles.buttonRight}><Button color={Color.deepPink} title="Delete"
                        onPress={() => deleteHandler(data)}></Button></View>
                </View>
            </ProductItem>
        } />
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

export default UserProductScreen;