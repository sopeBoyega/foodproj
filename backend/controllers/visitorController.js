import visitorCount from "../models/visitorCountModel.js";

// add visitor count

const addVisitor = async (req, res) => {
  const visitor = new visitorCount({
    location: req.body.location,
    count: 1,
  });

  try {
    await visitor.save();
    res.json({ success: true, message: "Visitor Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const getTotalVisitors = async (req, res) => {
  try {
    const visitors = await visitorCount.aggregate([
        {
          $group: {
            _id: null,
            totalVisitors: { $sum: "$count" }
          }
        }
      ]);
    res.json({ success: true, data: visitors[0].totalVisitors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addVisitor, getTotalVisitors };
