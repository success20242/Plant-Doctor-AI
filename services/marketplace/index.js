const products = {
  "Leaf Blight": [
    { name: "Copper Fungicide", price: 25 },
    { name: "Organic Spray", price: 15 }
  ]
};

function getRecommendations(disease) {
  return products[disease] || [];
}

module.exports = { getRecommendations };
