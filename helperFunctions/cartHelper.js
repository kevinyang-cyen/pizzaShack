// identify cart items with value over  0

// filter pizzas so it only shows ^ items

        // send that data only to the template

const cartHelper = (cart) => {
  let keys = Object.keys(cart);

    let queryPizza = [];
    for (key of keys) {
      // console.log(key, "key")
      // console.log(cart[key], "cart of key")
      if (cart[key] > 0) {

        queryPizza.push(key);
      }
    };

    return queryPizza
}
 module.exports = cartHelper;
