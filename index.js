const express = require('express');
const app = express();
const port = 3000;
const db = require('./config/mongoose');

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.post('/', (req, res) => {
//   console.log(req.body);
//   res.send('Received POST request!');
// });
app.use('/', require('./routes/index'));
(function () {
    addProductsController = require('./controllers/addProductsController');
    addProductsController.sheduleDiscount();
  })();

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
