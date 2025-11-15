const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/converted', express.static(path.join(__dirname, 'converted')));

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
