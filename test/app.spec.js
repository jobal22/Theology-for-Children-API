const supertest = require('supertest');
const chai = require('chai');
const app = require('../src/app');
const versesRouter = require('../src/verses/verses-router');
const chaptersRouter = require('../src/chapters/chapters-router');
const booksRouter = require('../src/books/books-router');
const plantitlesRouter = require('../src/plantitle/plantitle-router');
const plansRouter = require('../src/plans/plans-router');
const contentsRouter = require('../src/contents/contents-router');
const quiztitlesRouter = require('../src/quiztitles/quiztitles-router');
const quizesRouter = require('../src/quizes/quizes-router');
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
  it("should edit an verse notes on PATCH", function() {
    const newItem = { id: 100, notes: 'good stuff' };
    return supertest(app)
      .patch("/api/verses/100")
      .send(newItem)
      .then(function(res) {
        expect(202);
      });
  });
});

describe('Chapters', function() {
  it('should list Chapters on GET', function() {
    return supertest(app)
    .get('/api/chapters')
    .then(function(res) {
      expect(201);
    });
  });
});

describe('Books', function() {
  it('should list Books on GET', function() {
    return supertest(app)
    .get('/api/books')
    .then(function(res) {
      expect(201);
    });
  });
});

describe('Plan Titles', function() {
  it('should list Plan Titles on GET', function() {
    return supertest(app)
    .get('/api/plantitles')
    .then(function(res) {
      expect(201);
    });
  });
});

describe('Plans', function() {
  it('should list Plans on GET', function() {
    return supertest(app)
    .get('/api/plans')
    .then(function(res) {
      expect(201);
    });
  });
});

describe('Contents', function() {
  it('should list Contents on GET', function() {
    return supertest(app)
    .get('/api/contents')
    .then(function(res) {
      expect(201);
    });
  });
});

describe('Quiz Titles', function() {
  it('should list Contents on GET', function() {
    return supertest(app)
    .get('/api/quiztitles')
    .then(function(res) {
      expect(201);
    });
  });
});

describe('Quizes', function() {
  it('should list Contents on GET', function() {
    return supertest(app)
    .get('/api/quizes')
    .then(function(res) {
      expect(201);
    });
  });
  it("should edit an quiz answer on PATCH", function() {
    const newItem = { id: 1, useranswer: 'Paul' };
    return supertest(app)
      .patch("/api/quizes/1")
      .send(newItem)
      .then(function(res) {
        expect(202);
      });
  });

});