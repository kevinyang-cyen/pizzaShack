$(document).ready(() => {
  function getCart() {
    const sessionCart = sessionStorage.getItem('cart');
    return sessionCart || {};
  }

  function setCart(itemName, quantity) {
    /**
     * {
        'Pepperoni': 1,
        'The Terminator': 1,
        'Meat Lovers': 2
      };
     */
    // update client-side object
    window.userCart[itemName] = quantity;
    // update session storage to persist cart
    sessionStorage.setItem('cart', userCart);
  }

  window.userCart = getCart();
});
