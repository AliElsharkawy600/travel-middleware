const express = require("express");
const app = express();

app.get("/supplier-a/hotels", (req, res) => {
  const { city, delay } = req.query;

  const data = [
    {
      hotelId: "A-101",
      name: "Grand Istanbul Hotel",
      city: "Istanbul",
      price: 120,
      currency: "USD",
      stars: 5,
      available: true
    },
    {
      hotelId: "A-102",
      name: "Blue Sea Hotel",
      city: "Antalya",
      price: 80,
      currency: "USD",
      stars: 4,
      available: false
    }
  ];

  const result = city ? data.filter(h => h.city === city) : data;

  setTimeout(() => {
    res.json(result);
  }, delay ? Number(delay) : 0);
});

app.listen(4001, () => console.log("Supplier A running on 4001"));
