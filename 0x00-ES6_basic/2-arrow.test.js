// 2-arrow.test.js

import getNeighborhoodsList from './2-arrow.js';

test('adds a new neighborhood correctly', () => {
  const neighborhoodsList = new getNeighborhoodsList();
  expect(neighborhoodsList.addNeighborhood('Noe Valley')).toEqual(['SOMA', 'Union Square', 'Noe Valley']);
});

test('initial neighborhoods list', () => {
  const neighborhoodsList = new getNeighborhoodsList();
  expect(neighborhoodsList.sanFranciscoNeighborhoods).toEqual(['SOMA', 'Union Square']);
});

test('adds multiple neighborhoods correctly', () => {
  const neighborhoodsList = new getNeighborhoodsList();
  neighborhoodsList.addNeighborhood('Noe Valley');
  neighborhoodsList.addNeighborhood('Mission District');
  expect(neighborhoodsList.sanFranciscoNeighborhoods).toEqual(['SOMA', 'Union Square', 'Noe Valley', 'Mission District']);
});

