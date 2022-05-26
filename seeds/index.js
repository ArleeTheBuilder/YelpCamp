const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

async function main() {
	await mongoose.connect('mongodb://localhost:27017/yelp-camp');
}

main()
	.then(() => console.log('Database Connected'))
	.catch(err => console.log(err));

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			image: 'https://images.unsplash.com/collections/483251',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae assumenda fuga quia dolor fugit iusto fugiat quod natus, perferendis ea quibusdam. Ipsam deleniti tenetur dolor sint, iusto dicta mollitia sit!',
			price
		});
		await camp.save();
	}
}

seedDB().then(() => {
	mongoose.connection.close();
});
