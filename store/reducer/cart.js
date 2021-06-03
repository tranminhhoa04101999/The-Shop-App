import { ADD_TO_CART,REMOVE_FROM_CART } from '../action/cart';
import CartItem from '../../models/Cart-Item';

const initialCart = {
    items: {},
    totalAmount: 0
};

export default (state = initialCart, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addProd = action.product;
            const price = addProd.price;
            const title = addProd.title;

            let updataCartItem;
            if (state.items[addProd.id]) {
                updataCartItem = new CartItem(
                    state.items[addProd.id].quantity + 1,
                    price,
                    title,
                    state.items[addProd.id].sum + price
                );
                
            }
            else {
                updataCartItem = new CartItem(1, price, title, price);
            }
            return {...state,items: {...state.items,[addProd.id]: updataCartItem} , totalAmount: state.totalAmount + price };
        
        case REMOVE_FROM_CART:
            const product = state.items[action.productId];
            const quantity = state.items[action.productId].quantity;
            let updateCartItems;
            if(quantity > 1){
                console.log('check quantiti  ',product.quantity);
                const updateCartItem = new CartItem(
                    product.quantity - 1,
                    product.productPrice,
                    product.ProductTitle,
                    product.sum - product.productPrice
                );
                updateCartItems = {...state.items,[action.productId]:updateCartItem};
            }
            else {
                updateCartItems = {...state.items};
                delete updateCartItems[action.productId];
            }

            return {...state,items : updateCartItems,totalAmount:state.totalAmount - product.productPrice };
        default:
            return state;
    }
};