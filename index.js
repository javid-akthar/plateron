const express = require('express');
const app = express();
const port = 3000;
const db = require('./config/mongoose');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/', require('./routes/index'));
(function () {
    addProductsController = require('./controllers/addProductsController');
    addProductsController.sheduleDiscount();
  })();

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
