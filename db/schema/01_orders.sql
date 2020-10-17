DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS pizzas CASCADE;
DROP TABLE IF EXISTS pizzas_orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(12) NOT NULL,
  received_at TIMESTAMP DEFAULT now(),
  completed_at TIMESTAMP,
  order_status VARCHAR(50) SET DEFAULT 'pending'
);

CREATE TABLE pizzas (
id SERIAL PRIMARY KEY NOT NULL,
name VARCHAR(255) NOT NULL,
price decimal(3,2),
ingredients TEXT,
image url set DEFAULT 'http://placekitten.com/125/125'
);

CREATE TABLE pizzas_orders(
  id SERIAL PRIMARY KEY NOT NULL,
  pizza_id REFERENCING pizzas.id CASCADE ON DELETE,
  order_id REFERENCING orders.id CASCADE ON DELETE,
  quantity INT NOT NULL
);
