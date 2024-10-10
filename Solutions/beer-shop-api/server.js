const express = require('express');
const app = express();
app.use(express.json());
const fs = require('fs');
const beers = require('./beers.json');




app.get('/', (req, res) => {
    res.send('Welcome to the Beer Shop!');
    res.json(beers);
  });
  

function getBeers(offset, limit) {
  const data = fs.readFileSync('beers.json');
  const beers = JSON.parse(data);
  return beers.slice(offset, offset + limit);
}

app.get('/beers', (req, res) => {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;
  const beers = getBeers(offset, limit);
  res.json(beers);
});
//get beer details by id.
app.get('/beers/:id', (req, res) => {
  const data = fs.readFileSync('beers.json');
  const beers = JSON.parse(data);
  const beer = beers.find(b => b.id === parseInt(req.params.id));
  if (!beer) {
    return res.status(404).json({ error: 'Beer not found' });
  }
  res.json(beer);
});
//Search beers by name, description, tagline, food_pairing, price.
app.get('/beers/search', (req, res) => {
  const data = fs.readFileSync('beers.json');
  const beers = JSON.parse(data);
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Missing search query' });
  }
  const results = beers.filter(b => {
    return (
      b.name.includes(q) ||
      b.description.includes(q) ||
      b.tagline.includes(q) ||
      b.food_pairing.includes(q) ||
      b.price.toString().includes(q)
    );
  });
  res.json(results);
});

let cart = [];

app.get('/beers', (req, res) => {
  const beers = require('./beers.json');
  res.json(beers);
});

app.post('/cart', (req, res) => {
  const { id } = req.body;
  const beers = require('./beers.json');
  const beer = beers.find(b => b.id === id);
  if (!beer) {
    return res.status(404).json({ error: 'Beer not found' });
  }
  cart.push(beer);
  res.json(cart);
});

app.delete('/cart/:id', (req, res) => {
  const { id } = req.params;
  cart = cart.filter(item => item.id !== parseInt(id));
  res.json(cart);
});

app.get('/cart/total', (req, res) => {
    const total = cart.reduce((sum, beer) => sum + beer.price, 0);
    res.json({ total });
  });


// Assuming `renderProduct` is a function that takes a beer object and returns an HTML string
function renderProduct(beer) {
    return `
      <div class="product" data-id="${beer.id}">
        <h2>${beer.name}</h2>
        <p>${beer.tagline}</p>
        <img src="${beer.image_url}" alt="${beer.name}">
      </div>
    `;
  }
  
 
  


app.listen(3000, () => console.log('Server running on port 3000'));