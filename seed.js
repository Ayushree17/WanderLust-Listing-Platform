const mongoose = require("mongoose");
const Listing = require("./models/listing"); // adjust path if needed
const { sampleListings } = require("./init/data");



const MONGO_URL = "mongodb+srv://moreayushree_db_user:ZagDloHahnAC0h72@cluster0.xdkcmed.mongodb.net/wanderLust?retryWrites=true&w=majority&appName=Cluster0";


async function seedDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");

    await Listing.deleteMany({}); // clear old data
    await Listing.insertMany(sampleListings);
    console.log("Data seeded successfully");

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seedDB();
