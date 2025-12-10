const Trip = require('../models/Trip');

exports.createTrip = async (req,res)=>{
  try{
    const data = req.body;
    if(req.file) data.coverImage = '/uploads/'+req.file.filename;
    data.user = req.user._id;
    const trip = new Trip(data);
    await trip.save();
    res.json(trip);
  }catch(e){
    res.status(500).json({message:e.message});
  }
};

exports.getTrips = async (req,res)=>{
  try{
    const trips = await Trip.find({ user: req.user._id }).sort({createdAt:-1});
    res.json(trips);
  }catch(e){
    res.status(500).json({message:e.message});
  }
};

exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(trip);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.addItinerary = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    trip.itinerary.push(req.body);

    await trip.save();

    res.json(trip.itinerary);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


exports.addExpense = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    trip.expenses.push(req.body);
    await trip.save();

    res.json(trip.expenses);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.addMedia = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    trip.media.push({
      caption: req.body.caption,
      file: '/uploads/' + req.file.filename
    });

    await trip.save();

    res.json(trip.media);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.addMapPoint = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    trip.mapRoute.push({
      lat: req.body.lat,
      lng: req.body.lng,
      label: req.body.label || "Route Point",
      timestamp: new Date(),
    });

    await trip.save();

    res.json(trip.mapRoute);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.deleteMapPoint = async (req, res) => {
  const { id, pointIndex } = req.params;

  const trip = await Trip.findById(id);
  if (!trip) return res.status(404).json({ message: "Trip not found" });

  trip.mapRoute.splice(pointIndex, 1);
  await trip.save();

  res.json(trip.mapRoute);
};




exports.getAnalytics = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id });

    let totalTrips = trips.length;

    let totalSpent = 0;
    let totalExpensesCount = 0;

    let categoryCount = {};
    let purposeCount = {};
    let monthlySpending = {};

    trips.forEach((trip) => {
      // PURPOSE COUNT
      if (trip.purpose) {
        purposeCount[trip.purpose] = (purposeCount[trip.purpose] || 0) + 1;
      }

      // EXPENSES
      trip.expenses.forEach((exp) => {
        totalSpent += exp.amount || 0;
        totalExpensesCount++;

        if (exp.category) {
          categoryCount[exp.category] =
            (categoryCount[exp.category] || 0) + exp.amount;
        }

        // MONTHLY TREND
        if (exp.date) {
          const month = new Date(exp.date).toLocaleString("default", {
            month: "short",
          });

          monthlySpending[month] =
            (monthlySpending[month] || 0) + exp.amount;
        }
      });
    });

    const avgTripCost = totalTrips ? totalSpent / totalTrips : 0;

    res.json({
      totalTrips,
      totalSpent,
      avgTripCost,
      totalExpensesCount,
      categoryCount,
      purposeCount,
      monthlySpending,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

