const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Definir función para obtener lista de cervezas
const getBeers = () => {
  return punkAPI
    .getBeers()
    .then(beers => {
      return beers;
    })
    .catch(error => console.log(error));
};

// Definir función para obtener una cerveza aleatoria
const getRandomBeer = () => {
  return punkAPI
    .getRandom()
    .then(beers => {
      return beers[0];
    })
    .catch(error => console.log(error));
};

// Definir ruta para renderizar vista "beers" con lista de cervezas
app.get('/beers', (req, res, next) => {
  getBeers()
    .then(beersFromApi => {
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});

// Definir ruta para renderizar vista de cerveza aleatoria
app.get('/random-beer', (req, res, next) => {
  getRandomBeer()
    .then(randomBeer => {
      res.render('random-beer', { randomBeer });
    })
    .catch(error => console.log(error));
});

// Definir ruta para renderizar vista principal
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
