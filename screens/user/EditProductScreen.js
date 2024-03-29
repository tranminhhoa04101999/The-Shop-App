import React, { useCallback, useEffect, useState, } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import Color from '../../constants/Colors';
import * as ProductActions from '../../store/action/product';

const EditProductScreen = ({ props, navigation, route }) => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();

    const dispatch = useDispatch();
    const { prodId } = route.params;
    const editProd = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

    const [title, setTitle] = useState(editProd ? editProd.title : '');
    const [imageUrl, setImageUrl] = useState(editProd ? editProd.imageUrl : '');
    const [price, setPrice] = useState(editProd ? editProd.price : '');
    const [description, setDescription] = useState(editProd ? editProd.description : '');

    useEffect(() => {
        if (error) {
            Alert.alert('have error', error, [{ text: 'OK' }]);
        }
    }, [error]);
    const submit = async () => {
        setError(null);
        setLoading(true);
        if (editProd) {
            try {
                await dispatch(ProductActions.updateProduct(prodId, title, description, imageUrl));
                navigation.goBack();

            } catch (err) {
                setError(err.message);
            }
        }
        else {
            try {
                await dispatch(ProductActions.createProduct(title, description, imageUrl, +price));
                navigation.goBack();

            } catch (err) {
                setError(err.message);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        navigation.setOptions({
            title: route.params.title,
            headerRight: () =>
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item iconName="save" title="Save" onPress={submit} />
                </HeaderButtons>,
        });
    }, [title, imageUrl, price, description]);

    if (isLoading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={Color.primaryColor} />
        </View>
    };

    return (
        <ScrollView style={styles.from}>
            <View style={styles.fromControl}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)} />
            </View>
            <View style={styles.fromControl}>
                <Text style={styles.label}>ImageURL</Text>
                <TextInput style={styles.input} value={imageUrl} onChangeText={text => setImageUrl(text)} />
            </View>
            {editProd ? null : <View style={styles.fromControl}>
                <Text style={styles.label}>Price</Text>
                <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)} />
            </View>}
            <View style={styles.fromControl}>
                <Text style={styles.label}>Description</Text>
                <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    from: {
        margin: 10,
    },
    fromControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'OpenSans-Bold',
        marginVertical: 5,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 3,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
});

export default EditProductScreen;
