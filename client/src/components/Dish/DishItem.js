import React from "react";
import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function DishItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        dish: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="grid-item">
    <div className="items-content">
        <div className="items-image">
            <img src={`/images/foods/${image}`} alt={name}/>
                <ul>
                    <li>
                        <Link to={`/products/${_id}`}>
                          <p>View</p>
                        </Link>
                            
                    </li>
                    <li>
                        <Link onClick={addToCart}>
                            <p>Add to Cart</p>
                        </Link>
                    </li>
                </ul>
        </div>
        <h6>{name}</h6>
        <p>{price}$</p>
    </div>
</div>
  );
}

export default DishItem;
