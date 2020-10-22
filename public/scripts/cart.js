$(document).ready(function () {
  const slugify = function (str) {
    return str.replace(' ', '-').toLowerCase();
  }

  function updateCartState() {
    Object.entries(window.userCart).forEach(([pizzaName, quantity]) => {
      const slugName = slugify(pizzaName);
      const entirePizza = $(`#pizza-${slugName}`);
      const quantityLabel = $(`#quantity-${slugName}`);
      const quantityInput = $(`#quantity-input-${slugName}`);
      if (quantity){
        entirePizza.removeClass('zero-pizza')
      } else{
        entirePizza.addClass('zero-pizza')
      }
      quantityLabel.text(`Quantity ${quantity}`);
      quantityInput.val(quantity);
    })
  }

  function attachFormListeners() {
    const pizzaListSpan = $('#pizza-list');
    const pizzaList = pizzaListSpan.data('pizzas');
    pizzaList.split(',').forEach((name) => {
      const slugName = slugify(name);
      $(`#cart-update-${slugName}`).on('submit', updateCart);
    });
  }
  //nick
  function attachFormListenersDelete() {
    const pizzaListSpan = $('#pizza-list');
    const pizzaList = pizzaListSpan.data('pizzas');
    pizzaList.split(',').forEach((name) => {
      const slugName = slugify(name);
      $(`#cart-delete-${slugName}`).on('submit', deleteItem);
    });
  }


  function updateCart(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData, "formData in update cart")
    const quantityInput = formData.get('quantity');
    //settung max quanity to ten
    const quantityMax = (quantityInput <= 10) ? quantityInput : 10;
    //setting min quantity to 0 to handle negative inputs
    const quantity = (quantityMax >= 0) ? quantityMax : 0;
    const pizzaName = formData.get('pizzaName');
    console.log({ quantity, pizzaName })
    window.setCart(pizzaName, quantity);
    console.log('Current cart:', window.userCart);
    updateCartState();
  }

  $('#submit-order').on('submit', (e) => {
    e.preventDefault();

    const orderObject = {
      name: document.getElementById('customerName').value, // use real data
      contactNumber: document.getElementById('phoneNumber').value, // use real data
      cart: window.userCart
    };

    console.log('submit order', { orderObject });

    $.ajax('/order', {
      method: 'POST',
      data: orderObject
    })
      .then(res => {
        window.location.href = `/order/${res.order}`;
      });

    // clear cart
    window.clearCart();
  });

  // nick current
  function deleteItem(e) {
    e.preventDefault();
    console.log(e, "event")
    const formData = new FormData(e.target);
    console.log(formData, "form data")
    //const quantity = formData.get('quantity');
    //const quantity = 0;
    const pizzaName = formData.get('pizzaName');
    console.log({ pizzaName }, "delete item")
    window.deleteItem(pizzaName);
    console.log('Current cart:', window.userCart);
    updateCartState();
  }

  // onload
  attachFormListeners();
  attachFormListenersDelete();
  updateCartState();
});
