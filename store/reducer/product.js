import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/Product';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../action/product';

const initialProducts = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
};

export default (state = initialProducts, action) => {
    switch (action.type) {
        case CREATE_PRODUCT:
            console.log("create recuder ", action.productData);
            const newProduct = new Product(new Date().toString(), 'u1',action.productData.title, action.productData.imageUrl, action.productData.description, action.productData.price);
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),
            }
        case UPDATE_PRODUCT:
            console.log("updateproduct recuder ", action.productData);
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
            console.log("deleteproduct recuder ");
            return {
                ...state,
                userProducts: state.userProducts.filter(prod => prod.id !== action.pid),
                availableProducts: state.availableProducts.filter(prod => prod.id !== action.pid)
            };

        default:
            return state;

    }
};