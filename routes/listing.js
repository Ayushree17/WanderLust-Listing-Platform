const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");

//index route
router.get("/", async (req, res) => {
  let allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
});

//new route
router.get("/new", async (req, res) => {
  res.render("listings/new.ejs");
});

//show route
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  res.render("listings/show.ejs", { listing });
});

//create route
router.post("/", async (req, res) => {
  const listingData = req.body.listing;

  // Check if image URL is empty and remove it so default will apply
  if (listingData.image && listingData.image.url.trim() === "") {
    delete listingData.image;
  }

  const newListing = new Listing(listingData);
  await newListing.save();
  res.redirect("/listings");
});

//Edit route
router.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//update route
router.put("/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//delete route
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});

module.exports = router;
