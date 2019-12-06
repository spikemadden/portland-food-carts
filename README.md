# portland food carts
[![Build Status](https://travis-ci.org/spikemadden/portland-food-carts.svg?branch=master)](https://travis-ci.org/spikemadden/portland-food-carts)

🍔 An interactive map of food carts in the Portland, Oregon area.  

https://www.pdxfoodcarts.com

![](https://github.com/spikemadden/portland-food-carts/blob/master/screenshots/home.png)

## Overview
This application is serverless with the help of [Amazon Web Services](https://aws.amazon.com). Food cart data is collected using the [Yelp Fusion](https://www.yelp.com/fusion) API and runs as a [Lambda](https://aws.amazon.com/lambda) every 24 hours. The backend API to support search is an [Express](https://expressjs.com) app wrapped using [Serverless](https://serverless.com) and deployed as a Lambda. The frontend is written in [React](https://reactjs.org), built with [webpack](https://webpack.js.org) and deployed to [S3](https://aws.amazon.com/s3) with a [CloudFront](https://aws.amazon.com/cloudfront) distribution sitting on top.

The backend repo can be found here:
https://github.com/spikemadden/portland-food-carts-backend.

## Local Development
1. `git clone https://github.com/spikemadden/portland-food-carts.git`
2. `npm install`
3. `npm start` to have webpack build and watch your files
4. `npx serve` in a different tab
5. go to `http://localhost:5000/static/`

If there's a feature you want to see added, feel free to create an issue or open up a PR. 😊
