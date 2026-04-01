const express = require("express");
const app = express();

app.get("/supplier-b/list", (req, res) => {
  const { city, fail } = req.query;

  if (fail === "true") {
    return res.status(500).json({ error: "Service unavailable" });
  }

  const data = [
    {
      id: "B-9001",
      hotel_name: "Grand Istanbul Hotel",
      location: { cityName: "Istanbul" },
      pricing: { amount: 118, currencyCode: "USD" },
      rating: 5,
      isAvailable: true
    },
    {
      id: "B-9002",
      hotel_name: "Lara Beach Resort",
      location: { cityName: "Antalya" },
      pricing: { amount: 95, currencyCode: "USD" },
      rating: 4,
      isAvailable: true
    }
  ];

  const result = city
    ? data.filter(h => h.location.cityName === city)
    : data;

  res.json(result);
});

app.listen(4002, () => console.log("Supplier B running on 4002"));
