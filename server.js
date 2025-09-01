const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./src/routes');
const cookieParser = require('cookie-parser');
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

app.use(cors({
   origin: ["http://127.0.0.1:5500"],
   methods: ["GET", "POST", "PUT", "DELETE"],
   credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(expressLayouts);
app.set("layout", "layout")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// Dummy data
const accreditationData = {
   national: {
      unggul: 45,
      baikSekali: 113,
      baik: 115,
      tidakTerakreditasi: 12,
      total: 285
   },
   international: {
      aqas: 8,
      abet: 3,
      asiin: 5,
      belumTerakreditasi: 9,
      total: 25
   },
   institutional: {
      banPt: 145,
      lamPtkes: 22,
      lamdik: 18,
      lamemba: 15,
      lamInfokom: 12,
      lainnya: 3,
      total: 215
   },
   projection: {
      2025: 24,
      2026: 18,
      2027: 32,
      2028: 15
   }
};

const universityInfo = {
   name: 'Universitas Sebelas Maret',
   rector: 'Prof. Dr. Ir. Ahmad Yunus, M.S.',
   address: 'Jl. Ir. Sutami No. 36A, Surakarta 57126',
   phone: '+62 271 632450',
   email: 'akreditasi@uns.ac.id',
   website: 'www.uns.ac.id',
   accreditationLevel: 'Unggul',
   certificateNumber: '0234/SK/BAN-PT/Ak-ISK/S/III/2021',
   validUntil: '24 Maret 2026'
};

// Routes
app.get("/", (req, res) => {
   res.render("index", {
      accreditationData,
      universityInfo,
      title: "Home",
   });
});

app.use('/api', routes);

const port = 3000;
app.listen(port, () => {
   console.log(`Server berjalan di port ${port}`);
});
