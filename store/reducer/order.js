import {ADD_ORDER} from '../action/order';
import Order from '../../models/Order';

const initialOrder = {
    orders: []
};

export default (state = initialOrder,action) => {
    switch(action.type){
        case ADD_ORDER:
            const newOrder = new Order(
                new Date().toString(),
                action.OrderItems.items,
                action.OrderItems.amount,
                new Date()
            );
            return {...state,orders: state.orders.concat(newOrder)};

        default:
            return state;
    }
};