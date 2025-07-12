const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tshivansh279:PiT15ZfFsAIyYKui@cluster0.igbli3j.mongodb.net/dispensaySystem?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Database Connected Successfully");
})
.catch((err) => {
  console.error("Database connection error:", err);
});
