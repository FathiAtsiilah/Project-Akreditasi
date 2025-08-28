const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./src/routes');
const cookieParser = require('cookie-parser');

app.use(cors({
   origin: ["http://127.0.0.1:5500"],
   methods: ["GET", "POST", "PUT", "DELETE"],
   credentials: true
}));

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get('/', (req, res) => {
   res.redirect('/homepage.html');
});

app.use('/api', routes);

const port = 3000;
app.listen(port, () => {
   console.log(`Server berjalan di port ${port}`);
});
