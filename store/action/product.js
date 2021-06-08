import Product from "../../models/Product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProducts = () => {
  return async (dispatch,getState) => {
    const userId = getState().auth.userId;
    
    try {
      const response = await fetch('https://theshopapp-rn-default-rtdb.asia-southeast1.firebasedatabase.app/products.json');

      if (!response.ok) {
        throw new Error('có lỗi ở link api');
      };
      const resData = await response.json();
      const loadData = [];
      for (const key in resData) {
        loadData.push(new Product(
          key,
          resData[key].ownerId,
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        ));
        dispatch({
          type: SET_PRODUCT, products: loadData , userProducts : loadData.filter(data => data.ownerId === userId)
        });
      }
    }
    catch (err) {
      throw err;
    }

  };
};

export const deleteProduct = productId => {
  return async (dispatch,getState) => {
    const token = getState().auth.token;
    const response = await fetch(`https://theshopapp-rn-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json?auth=${token}`, {
      method: 'DELETE'
    });

    dispatch({
      type: DELETE_PRODUCT, pid: productId
    });
  }
};
export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch,getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(`https://theshopapp-rn-default-rtdb.asia-southeast1.firebasedatabase.app/products.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      })
    });

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId

      }
    });
  };
};
export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch,getState) => {
    const token = getState().auth.token;
    const response = await fetch(`https://theshopapp-rn-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json?auth=${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl
      })
    });

    if(!response.ok){
      throw new Error('something went wrong');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl
      }
    });
  }
};