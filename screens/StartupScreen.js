import React,{useEffect} from 'react';
import {View,StyleSheet,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authActions from '../store/action/auth';
import {useDispatch} from 'react-redux'

const StartupScreen = (props) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const tryLogin = async () =>{
            const userData = await AsyncStorage.getItem('userData');
            console.log(userData);
            if(!userData){
                props.navigation.replace('authUser');
                return;
            }
            const transformedData = JSON.parse(userData);
            const {token,userId,expiryDate} = transformedData;
            const expirationDate = new Date(expiryDate);
            console.log('date  ',expirationDate);
            console.log('new date ',new Date());
            if(expirationDate <= new Date() || !token || !userId){
                props.navigation.replace('authUser');
                return;
            }
            console.log('ecec');
            props.navigation.replace('drawer');
            dispatch(authActions.authenticate(userId,token));
        };
        tryLogin();

    },[dispatch]);

    return(
        <View style={styles.screen}>
            <ActivityIndicator size='large' color='red' />
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;