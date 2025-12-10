const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
  place: String,
  description: String,
  date: String,
  time: String,
  transport: String,
  cost: Number
});

const ExpenseSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  date: String,
  mode: String,
  description: String
});

const MediaSchema = new mongoose.Schema({
  file: String,
  caption: String
});

const TripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:'User' },

  name: String,
  destination: String,
  startDate: Date,
  endDate: Date,
  purpose: String,
  budget: Number,
  notes: String,
  coverImage: String,
  tags: [String],

  // NEW FIELDS (OPTION A)
  itinerary: [ItinerarySchema],
  expenses: [ExpenseSchema],
  media: [MediaSchema],

mapRoute: [
  {
    lat: Number,
    lng: Number,
    label: String,
    timestamp: Date
  }
],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', TripSchema);
