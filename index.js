const express    = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const db = require("./models");
const app = express()
const PORT = process.env.PORT || 4000;

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);

db.sequelize.sync({ logging: console.log }).then(() => {
    app.listen(PORT, () => {
      console.log(`listening on: http://localhost:${PORT}`);
    });
 });