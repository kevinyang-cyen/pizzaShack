// identify cart items with value over  0

// filter pizzas so it only shows ^ items

// send that data only to the template

const cartHelper = (cart) => {
  let keys = Object.keys(cart);
  let pizzaInCart = [];

  for (let key of keys) {
    if (cart[key] > 0) {
      pizzaInCart.push(key);
    }
  };
  let sanitizedPizza = pizzaInCart.map(function (pizza) {
    return "'" + pizza + "'";
  }).join(",");
  return sanitizedPizza
}
module.exports = cartHelper;
