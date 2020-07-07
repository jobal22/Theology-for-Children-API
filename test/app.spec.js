const supertest = require('supertest');
const chai = require('chai');
const app = require('../src/app')
const titusVersesRouter = require('../src/titusVerses/titusVerses-router')
const titusChaptersRouter = require('../src/titusChapters/titusChapters-router')
const booksRouter = require('../src/books/books-router')
const { expect } = require('chai');

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!')
  })
})

describe('TitusVerses', function() {
  it('should list TitusVerses on GET', function() {
    return supertest(app)
    .get('/api/titusVerses')
    .then(function(res) {
      expect(201);
    });
  });
});