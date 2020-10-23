=========

## PizzaShack Project

PizzaShack is a web based food ordering system which allows customers to place orders online, and lets the restaurant receive orders and reply with an estimated completion time through SMS messaging. This web application is a midterm project for the Lighthouse Labs Web Development bootcamp, and is built to practice front-end (html, SASS, JS, JQuery), back-end (Express), and databasing (PostGreSQL) skills.


## Final Product
![Screenshot of home page](https://github.com/kevinyang-cyen/pizzaShack/blob/master/images/1.PNG?raw=true)
![Screenshot of view cart page](https://github.com/kevinyang-cyen/pizzaShack/blob/master/images/2.PNG?raw=true)
![Screenshot of order status page](https://github.com/kevinyang-cyen/pizzaShack/blob/master/images/3.PNG?raw=true)
![Screenshot of mobile home page](https://github.com/kevinyang-cyen/pizzaShack/blob/master/images/m1.PNG?raw=true)
![Screenshot of mobile view cart page](https://github.com/kevinyang-cyen/pizzaShack/blob/master/images/m2.PNG?raw=true)
![Screenshot of mobile order status page](https://github.com/kevinyang-cyen/pizzaShack/blob/master/images/m3.PNG?raw=true)


## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`, change TO_NUMBER to 'restaurant' phone number, and TWILIO_SID and TWILIO_TOKEN with Twilio account information. Ensure that your restaurant phone number is verified on Twilio.
3. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
4. Install dependencies: `npm i`
5. Fix to binaries for sass: `npm rebuild node-sass`
6. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Run `Ngrok http 8080` on a seperate terminal window and paste [ngrok forwarding url]/order/:id onto Twilio phone number settings under messaging with Webhook & HTTP Post selected
9. Visit `http://localhost:8080/`


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x or above (use 8.x if not working)
- SASS 6.x

