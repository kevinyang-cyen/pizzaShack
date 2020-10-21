$(document).ready(() => {
  const CART_KEY = 'pizzaCart';

  window.getCart = () => {
    const sessionCart = sessionStorage.getItem(CART_KEY);
    const resolvedCart = sessionCart ? JSON.parse(sessionCart) : {};
    console.log('Session cart set to ', resolvedCart);
    return resolvedCart;
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
    sessionStorage.setItem(CART_KEY, JSON.stringify(window.userCart));
    console.log('Updated cart!');
  }
  // sets an items quantity to 0
  window.deleteItem = (itemName) => {
    /**
     * {
        'Pepperoni': 1,
        'The Terminator': 1,
        'Meat Lovers': 2
      };
     */
    // update client-side object
    window.userCart[itemName] = 0;
    // update session storage to persist cart
    sessionStorage.setItem(CART_KEY, JSON.stringify(window.userCart));
    console.log('Updated cart! Deleted Item!');
  }

  window.clearCart = () => {
    sessionStorage.setItem(CART_KEY, JSON.stringify({}));
    window.userCart = {};
    console.log("Cleared cart!");
  }

  window.userCart = getCart();
});
