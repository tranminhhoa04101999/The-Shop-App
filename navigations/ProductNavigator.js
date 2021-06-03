import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
//#region import các thành phần tham gia
import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Color from '../constants/Colors';
//#endregion

const StackProducts = createStackNavigator();

const ProductNavigator = (props) => {
    return (
        <NavigationContainer>
            <StackProducts.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor:Color.deepPink,
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
            }}>
                <StackProducts.Screen name="products" component={ProductOverviewScreen}
                    options={{
                        title: "Product"
                    }}
                />

            </StackProducts.Navigator>
        </NavigationContainer>
    );
};

export default ProductNavigator;