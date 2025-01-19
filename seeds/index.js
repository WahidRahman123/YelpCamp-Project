const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');

//Database Connection:
mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(() => {
    console.log('Database connected.');
})
.catch(err => {
    console.log('Connection error: ', err);
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i< 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '67821256c00852b677719883',
            location:  `${cities[random1000].city}, ${cities[random1000].state}`,
            title:  `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam laboriosam atque aliquam harum nostrum deserunt!',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dxbpljnod/image/upload/v1736711380/YelpCamp/lkrqnlda6eo5xfwucety.jpg',
                  filename: 'YelpCamp/lkrqnlda6eo5xfwucety'
                },
                {
                  url: 'https://res.cloudinary.com/dxbpljnod/image/upload/v1737008115/YelpCamp/tcw1r851mfdadh1pt9rp.jpg',
                  filename: 'YelpCamp/c7gj1okvabtlgyih6cft'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});