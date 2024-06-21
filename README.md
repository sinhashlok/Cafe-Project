# Cafe Tracker

Shows you the list of near by cafes. You can add food to cart and pay easily via Razorpay.

## Features

- Search
- Filter: Rating, Price, DeliveryTime
- Add to cart
- Payment via RazorPay

## Set Up

- Copy the repo: `git clone https://github.com/sinhashlok/Cafe-Project.git`
- Create a new file `.env` in the same level as `.env.example` an paste the contents as `.env.example`
- Create mongodb account and Razorpay account.

### Mongodb setup

- Create mongodb account and setup a database.
- Create three collections by name of `restaurantitems`, `restaurants` and `cart`
- Go to `restaurantitems` and click insert document and choose `Cafe.restaurantitems.json` from staterData at root level.
- Same for `restaurants`, insert `Cafe.restaurants.json`.
- Get connection string & paste in `.env`

### Razorypay setup

- Create free Razorypay account (no need to add business data - run in test mode);
- Generate API keys and secret & paste in `.env`

#### Start the project

- `npm install` to start the project
