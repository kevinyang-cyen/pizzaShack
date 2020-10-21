$(document).ready(() => {
  window.getCart = () => {
    const sessionCart = sessionStorage.getItem('cart');
    const resolvedCart = sessionCart || "{}";
    console.log('Session cart set to ', resolvedCart);
    return JSON.parse(resolvedCart);
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
    sessionStorage.setItem('cart', JSON.stringify(window.userCart));
    console.log('Updated cart!');
  }

  window.userCart = getCart();
});
