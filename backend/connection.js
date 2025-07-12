const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI
, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Database Connected Successfully");
})
.catch((err) => {
  console.error("Database connection error:", err);
});
