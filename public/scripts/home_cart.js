$(document).ready(() => {

  function slugify(str) {
    return str.replace(' ', '-').toLowerCase();
  }

  function updateCartState() {
    Object.entries(window.userCart).forEach(([pizzaName, quantity]) => {
      const slugName = slugify(pizzaName);
      const quantityLabel = $(`#quantity-${slugName}`);
      const quantityInput = $(`#quantity-input-${slugName}`);
      quantityLabel.text(`Quantity ${quantity}`);
      quantityInput.val(quantity);

    })
  }

  function updateHeaderCart() {
    let count = 0;
    Object.entries(window.userCart).forEach(([pizzaName, quantity]) => {
      count += parseInt(quantity);
    })
    const quantityLabel = $(`#cart-button`);
    quantityLabel.text(`View Cart (${count})`);
  }

  function attachFormListeners() {
    const pizzaListSpan = $('#pizza-list');
    const pizzaList = pizzaListSpan.data('pizzas');
    pizzaList.split(',').forEach((name) => {
        const slugName = slugify(name);
        $(`#cart-update-${slugName}`).on('submit', updateCart);
    });
  }


  function updateCart(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const quantity = formData.get('quantity');
    const pizzaName = formData.get('pizzaName');
    console.log({ quantity, pizzaName })
    window.setCart(pizzaName, quantity);
    console.log('Current cart:', window.userCart);
    updateCartState();
    updateHeaderCart()
  }

attachFormListeners();
updateCartState();
updateHeaderCart()

});
