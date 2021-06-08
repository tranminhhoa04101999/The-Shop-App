import AsyncStorage from '@react-native-async-storage/async-storage';
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (userId, token) => {
    return { type: AUTHENTICATE, userId: userId, token: token };
};

export const logout = ()=>{
    return {type:LOGOUT}
};

export const signup = (email, password) => {

    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQdv5Y1QvTHCfk9sT7SdndsPuUY1Ik6-4', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
            }),
        });

        if (!response.ok) {
            throw new Error('lỗi ở link API đăng ký !!');
        };

        const resData = response.json();
        dispatch({
            type: SIGNUP, token: resData.idToken, userId: resData.localId
        });
    };
};

export const Login = (email, password) => {

    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDQdv5Y1QvTHCfk9sT7SdndsPuUY1Ik6-4', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
            }),
        });

        if (!response.ok) {

            const resData = await response.json();
            let message = "lỗi ở get link API đăng nhập !!";
            if (resData.error.message === "EMAIL_NOT_FOUND") {
                message = "Email hoặc password đăng nhập không đúng !!";
            }
            throw new Error(message);
        };

        const resData = await response.json();
        dispatch(authenticate(resData.idToken,resData.localId));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataInStorage(resData.idToken, resData.localId, expirationDate);
    };
};
const saveDataInStorage =  (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString()
        })
    );
};