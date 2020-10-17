DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS pizzas CASCADE;
DROP TABLE IF EXISTS pizzas_orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(12) NOT NULL,
  received_at TIMESTAMP DEFAULT now(),
  completed_at TIMESTAMP,
  order_status VARCHAR(50) DEFAULT 'pending'
);

CREATE TABLE pizzas (
id SERIAL PRIMARY KEY NOT NULL,
name VARCHAR(255) NOT NULL,
price decimal(3,2),
ingredients TEXT,
image url DEFAULT 'http://placekitten.com/125/125'
);

CREATE TABLE pizzas_orders(
  id SERIAL PRIMARY KEY NOT NULL,
  pizza_id REFERENCES pizzas(id) CASCADE ON DELETE,
  order_id REFERENCES orders(id) CASCADE ON DELETE,
  quantity INT NOT NULL
);



psql:db/schema/01_orders.sql:1: NOTICE:  table "orders" does not exist, skipping
DROP TABLE
psql:db/schema/01_orders.sql:2: NOTICE:  table "pizzas" does not exist, skipping
DROP TABLE
psql:db/schema/01_orders.sql:3: NOTICE:  table "pizzas_orders" does not exist, skipping
DROP TABLE
psql:db/schema/01_orders.sql:11: ERROR:  syntax error at or near "SET"
LINE 7:   order_status VARCHAR(50) SET DEFAULT 'pending'
                                   ^
psql:db/schema/01_orders.sql:19: ERROR:  syntax error at or near "set"
LINE 6: image url set DEFAULT 'http://placekitten.com/125/125'
                  ^
psql:db/schema/01_orders.sql:26: ERROR:  syntax error at or near "pizzas"
LINE 3:   pizza_id REFERENCING pizzas.id CASCADE ON DELETE,
                               ^
