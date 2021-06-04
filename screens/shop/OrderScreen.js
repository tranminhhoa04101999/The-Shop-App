import React,{useEffect} from 'react';
import { View, StyleSheet, FlatList,Text } from 'react-native';
import { useSelector } from 'react-redux';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import OrderItem from '../../components/OrderItem';


const OrderScreen = ({props,navigation}) => {
    const renderItem = (data) => {
        console.log('date   ',data.item.renderItem );
        return (
            <OrderItem 
                totalAmount = {data.item.totalAmount}
                date = {data.item.renderTime}
                items = {data.item.items}

            />
        );
    };

    const listOrders = useSelector(state => state.order.orders);
    useEffect(() => {
        navigation.setOptions({
            headerLeft:() => 
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item iconName= "menu" title="Menu" onPress={()=>navigation.toggleDrawer()} />
            </HeaderButtons> ,
        });
    }, []);
    console.log('listorder ne :  ', listOrders);
    return (
        <FlatList data={listOrders} keyExtractor={item => item.id} renderItem={renderItem} />
    );
};

const styles = StyleSheet.create({

});

export default OrderScreen;