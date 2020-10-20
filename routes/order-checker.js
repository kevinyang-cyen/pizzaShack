

const orderChecker = function(cart) {
  const status = {status: false}
  for (const item in cart) {
    if (cart[item] > 0) {
      status.status = true;
    }
  }
  return status;
}

const qtyChecker = function(cart) {
  let counter = 0;
  let quantity = {qty: 0}
  for (const item in cart) {
    const num = parseInt(cart[item])
    counter += num;
  }
  quantity.qty = counter;
  return quantity;
}


module.exports = { orderChecker, qtyChecker };