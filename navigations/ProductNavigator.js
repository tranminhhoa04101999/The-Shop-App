import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
//#region import các thành phần tham gia
import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetaiScreen from '../screens/shop/ProductDetailScreen';
import Color from '../constants/Colors';
import CartScreen from '../screens/shop/CartScreen';
//#endregion

const StackProducts = createStackNavigator();

const ProductNavigator = (props) => {
    return (
        <NavigationContainer>
            <StackProducts.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: Color.deepPink,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    
                },
                headerTitleStyle:{
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
        </NavigationContainer>
    );
};

export default ProductNavigator;