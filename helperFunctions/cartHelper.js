// identify cart items with value over  0

// filter pizzas so it only shows ^ items

// send that data only to the template

const cartHelper = (cart) => {
  let keys = Object.keys(cart);
  let pizzaInCart = [];
  for (key of keys) {
    if (cart[key] > 0) {
      pizzaInCart.push(key);
    }
  };
  return pizzaInCart
}
module.exports = cartHelper;