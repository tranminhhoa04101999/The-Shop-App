import Order from "../../models/Order";

export const ADD_ORDER = "ADD_ORDER";
export const FETCH_ORDERS = "FETCH_ORDERS";

export const addOrder = (orderItems, totalAmount) => {
    return async (dispatch,getState) => {
        const userId = getState().auth.userId;
        const date = new Date();
        const response = await fetch(`https://theshopapp-rn-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderItems,
                totalAmount,
                date: date.toUTCString(),
            })
        });

        const resData = await response.json();

        dispatch({
            type: ADD_ORDER, OrderItems: { id: resData.name, items: orderItems, amount: totalAmount, date: date }

        });
    };
};
export const fetchOrders = () => {
    return async (dispatch,getState) => {
        const userId = getState().auth.userId;

        try {
            const response = await fetch(`https://theshopapp-rn-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json`);

            if (!response.ok) {
                throw new Error('lấy dữ liệu thất bại !!');
            }

            const resData = await response.json();
            const data = [];
            for (const key in resData) {
                data.push(new Order(
                    key,
                    resData[key].orderItems,
                    resData[key].totalAmount,
                    new Date(resData[key].date)
                ));
            }

            dispatch({
                type: FETCH_ORDERS, data: data
            });
        } catch (err) {
            throw err;
        };
    };
};