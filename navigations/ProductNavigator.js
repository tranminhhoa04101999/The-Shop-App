import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react';
//#region import các thành phần tham gia
import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetaiScreen from '../screens/shop/ProductDetailScreen';
import Color from '../constants/Colors';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import { Icon } from 'react-native-vector-icons/Ionicons';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
//#endregion

const StackProducts = createStackNavigator();

const ProductNavigator = (props) => {
    return (
        <StackProducts.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: Color.deepPink,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,

            },
            headerTitleStyle: {
                fontFamily: 'OpenSans-Bold'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
        }}>
            <StackProducts.Screen name="products" component={ProductOverviewScreen}
                options={{
                    title: "List Products"
                }}
            />
            <StackProducts.Screen name="ProductDetails" component={ProductDetaiScreen}
                options={{
                }}
            />
            <StackProducts.Screen name="Cart" component={CartScreen}
                options={{
                }}
            />

        </StackProducts.Navigator>
    );
};
const StackOrder = createStackNavigator();
const orderNavigator = () => {
    return (
        <StackOrder.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: Color.deepPink,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,

            },
            headerTitleStyle: {
                fontFamily: 'OpenSans-Bold'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
        }}>
            <StackOrder.Screen name="orderList" component={OrderScreen} />
        </StackOrder.Navigator>
    );
};

const StackAdmin = createStackNavigator();
const adminNavigator = () => {
    return (
        <StackAdmin.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: Color.deepPink,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,

            },
            headerTitleStyle: {
                fontFamily: 'OpenSans-Bold'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
        }}>
            <StackAdmin.Screen name="admin" component={UserProductScreen} options={{
                title: "Your Products"
            }} />
            <StackAdmin.Screen name="edit" component={EditProductScreen} options={{
                title: "Edit Products"
            }} />
        </StackAdmin.Navigator>
    );
};

const Drawer = createDrawerNavigator();
const drawerMain = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerType='slide' >
                <Drawer.Screen name="productNavigator" component={ProductNavigator} options={{
                    title: "Products",
                    // drawerIcon: ({ color, size, focused }) => (
                    //     <Icon name="cart" color={focused ? 'grey' : '#888'} size={23} ></Icon>
                    // ),
                }} />
                <Drawer.Screen name="orderNavigator" component={orderNavigator} options={{
                    title: "Recipes"
                }} />
                <Drawer.Screen name="adminNavigator" component={adminNavigator} options={{
                    title: "Admin"
                }} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default drawerMain;