import express from 'express';
import cors from 'cors';
import commitionroutes from './app/routes/commition.routes.js';
// const cors = require("cors");



const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/commitions', commitionroutes);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Node JS and My SQL Backend." });
});
app.get("/commission", async (req, res) => {
  try {
    // Fetch data from the MySQL database
    const [rows] = await connection.execute("SELECT * FROM commission_table");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});




// require("./app/routes/commition.routes.js")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});