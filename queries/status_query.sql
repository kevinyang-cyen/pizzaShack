SELECT orders.id, pizzas.name as name, price, image_url, orders.order_status, pizzas_orders.quantity
FROM pizzas
JOIN pizzas_orders ON pizzas_orders.pizza_id = pizzas.id
JOIN orders ON pizzas_orders.order_id = orders.id
WHERE orders.id = 2;
