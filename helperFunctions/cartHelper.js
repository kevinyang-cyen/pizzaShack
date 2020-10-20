// identify cart items with value over  0

// filter pizzas so it only shows ^ items

// send that data only to the template

const cartHelper = (cart) => {
  let keys = Object.keys(cart);
  let pizzaInCart = [];
  let left = ';
  let right = ';

  for (key of keys) {
    if (cart[key] > 0) {
      let key1 = left + key + right
      key1.toString
      console.log(key1,"key1")
      pizzaInCart.push(key);
    }
  };

  return pizzaInCart
}
module.exports = cartHelper;
