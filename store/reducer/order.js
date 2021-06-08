import {ADD_ORDER,FETCH_ORDERS} from '../action/order';
import Order from '../../models/Order';

const initialOrder = {
    orders: []
};

export default (state = initialOrder,action) => {
    switch(action.type){
        case FETCH_ORDERS:
            return {orders: action.data}
        case ADD_ORDER:
            const newOrder = new Order(
                action.OrderItems.id,
                action.OrderItems.items,
                action.OrderItems.amount,
                action.OrderItems.date,
            );
            return {...state,orders: state.orders.concat(newOrder)};

        default:
            return state;
    }
};