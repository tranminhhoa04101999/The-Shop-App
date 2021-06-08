import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/Product';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCT } from '../action/product';

const initialProducts = {
    availableProducts: [],
    userProducts: [],
};

export default (state = initialProducts, action) => {
    switch (action.type) {
        case SET_PRODUCT:
            return {
                availableProducts: action.products,
                userProducts: action.userProducts
            };
        case CREATE_PRODUCT:
            const newProduct = new Product(action.productData.id,action.productData.ownerId, action.productData.title, action.productData.imageUrl, action.productData.description, action.productData.price);
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),
            }
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(
                prod => prod.id === action.pid
            );
            const updateProd = new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price
            )
            const updateUserProduct = [...state.userProducts];
            updateUserProduct[productIndex] = updateProd;

            const availableProdindex = state.availableProducts.findIndex(prod => prod.id === action.pid);
            const updateAvalableProd = [...state.availableProducts];
            updateAvalableProd[availableProdindex] = updateProd;

            return {
                ...state,
                availableProducts: updateAvalableProd,
                userProducts: updateUserProduct
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(prod => prod.id !== action.pid),
                availableProducts: state.availableProducts.filter(prod => prod.id !== action.pid)
            };

        default:
            return state;

    }
};