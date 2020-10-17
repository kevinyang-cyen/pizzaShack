-- Users table seeds here (Example)
INSERT INTO orders (name, phone_number)
VALUES ('Alice Wonderland', '+16502414473'),
('Lebron James', '+16502414473'),
('Ash Ketchum', '+16502414473');

INSERT INTO pizzas (name, price, ingredients) VALUES
('Pepperoni', 17.38, 'Handmade bread dough, Marinara Sauce, Four different types of artisanal cheese, hand-sliced pepperoni, garlic butter brushed crust'),
('Meat Lovers', 17.76, 'Hand-delivered 100% Kobe Waygu Beef sliced, Capicola Sausage from Vienna, Genovese Pepperoni, Marinated Jerk Chicken, our famous four-artisanal cheese blend, marinara sauce and garlic brushed '),
('The Terminator', 10.00, 'Ground Beef, Austrian Sausage, American Cheddar Cheese, and BBQ Sauce, this slice is out of this world');

INSERT INTO pizzas_orders(pizza_id, order_id, quantity)
VALUES (1, 2, 3),
(2, 2, 1),
(3, 1, 1);
