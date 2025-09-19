const express = require("express");
const router = express.Router({ mergeParams: true }); //to make id available inside the nested route (merge params)
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

//REVIEWS
//post  review route
router.post("/",async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  res.redirect(`/listings/${listing._id}`);
});

//delete review route
router.delete("/:reviewId",async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);
});

module.exports = router;
