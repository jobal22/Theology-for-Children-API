const supertest = require('supertest');
const chai = require('chai');
const app = require('../src/app')
const versesRouter = require('../src/verses/verses-router')
// const titusChaptersRouter = require('../src/titusChapters/titusChapters-router')
// const booksRouter = require('../src/books/books-router')
const { expect } = require('chai');

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!')
  })
})

describe('Verses', function() {
  it('should list Verses on GET', function() {
    return supertest(app)
    .get('/api/verses')
    .then(function(res) {
      expect(201);
    });
  });
});