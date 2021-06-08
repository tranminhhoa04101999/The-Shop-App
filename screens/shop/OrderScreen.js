import React, { useEffect, useState,useCallback } from 'react';
import { View, StyleSheet, FlatList, Text ,ActivityIndicator} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import OrderItem from '../../components/OrderItem';
import * as OrderActions from '../../store/action/order';
import Color from '../../constants/Colors';


const OrderScreen = ({ props, navigation }) => {
    const dispatch = useDispatch();
    const listOrders = useSelector(state => state.order.orders);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();

    const loadData = useCallback( async () => {
        setLoading(true);
        setError(null);

        try {
            await dispatch(OrderActions.fetchOrders());
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    },[dispatch,setError,setLoading]);

    useEffect(() => {
        loadData();
    }, [dispatch, loadData]);

    const renderItem = (data) => {
        return (
            <OrderItem
                totalAmount={data.item.totalAmount}
                date={data.item.renderTime}
                items={data.item.items}

            />
        );
    };

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () =>
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item iconName="menu" title="Menu" onPress={() => navigation.toggleDrawer()} />
                </HeaderButtons>,
        });
    }, []);

    if (error) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{error}</Text>
        </View>
    };
    if (isLoading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={Color.primaryColor} />
        </View>
    };
    if (!isLoading && listOrders.length === 0) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No order is here !!!</Text>
        </View>
    };

    return (
        <FlatList data={listOrders} keyExtractor={item => item.id} renderItem={renderItem} />
    );
};

const styles = StyleSheet.create({

});

export default OrderScreen;