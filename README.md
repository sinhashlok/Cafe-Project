# Cafe Tracker

Shows you the list of near by cafes. You can add food to cart and pay easily via Razorpay.

## Features

- Search
- Filter: Rating, Price, DeliveryTime
- Add to cart
- Payment via RazorPay

## Links
 
- aws: https://main.d1zccdlhj7l3dk.amplifyapp.com/ `(issues - read below)`
- vercel: https://cafe-project-eight.vercel.app/ `(issues - read below)`

## Tools

- Nextjs
- Mongodb
- TailwindCSS
- Framer motion
- UI library - Shadcn.ui and NextUI
- Redux Toolkit (for global state management of items addded to cart)

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

## ISSUES

- For both aws and vercel in production, mongodb is taking more than 10s to return some fetch requests, wich is causing failure in search and filter, even without searching for anything.
- I suspect it is due to more request being made at start, and the Free mongodb version is limiting my requests or because of serveless functionality of both applications (aws and nextjs).
- The `aws` crashes, but `vercel` still allows to run the entire application
- I am not facing such issues in development. (If possible please start server in local)