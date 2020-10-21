$(document).ready(() => {
  window.getCart = () => {
    const sessionCart = sessionStorage.getItem('cart');
    return sessionCart || {};
  }

  window.setCart = (itemName, quantity) => {
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
    console.log('Updated cart!');
  }

  window.userCart = getCart();
});
