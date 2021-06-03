import PRODUCTS from '../../data/dummy-data';

const initialProducts = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
};

export default (state = initialProducts,action) => {
    
    return state;
};