const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  

  offer_id: {
    type: String,
    required: true,
  },
  offer_title: {
    type: String,
    required: true,
  },
  offer_description: {
    type: String,
    required: true,
  },
  offer_image: {
    type: String,
    required: true,
  },
  offer_sort_order:{
    type:Number
  },
  content: [
    {
      item: String,
      quantity: String,
    },
  ],
  schedule: {
    days_of_week: [Number],
    dates_of_month: [Number],
    maonths_of_year: [Number],
  },
  target: {
    type: String,
    required: true,
  },
  pricing: [
    {
      currency: {
        type: String,
      },
      cost: {
        type: Number,
      },
    },
  ],
});

const OfferModel = mongoose.model("Offer", OfferSchema);

module.exports = OfferModel;
