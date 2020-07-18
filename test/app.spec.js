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
// const usersRouter = require('./users/users-router')
const { expect } = require('chai');
// const { makeUsersArray } = require('./users.fixtures')

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

describe('Users', function() {
  it('should list Users on GET', function() {
    return supertest(app)
    .get('/api/users')
    .then(function(res) {
      expect(201);
    });
  });
  it("should add an Users on POST", function() {
    const newItem = { fullname: 'Sam Gamgee', username: 'sam.gamgee@shire.com', password: 'secret'};
    return supertest(app)
      .post("/api/users")
      .send(newItem)
      .then(function(res) {
        expect(202);
      });
  });
  it("should edit an Users on PATCH", function() {
    const newItem = { id: 333, fullname: 'Sam George', username: 'sam.gamgee@shire.com', password: 'secret' };
    return supertest(app)
      .patch("/api/users/333")
      .send(newItem)
      .then(function(res) {
        expect(202);
      });
  });
  it("should delete an Users on DELETE", function() {
    const newItem = { id: 333, fullname: 'Sam George', username: 'sam.gamgee@shire.com', password: 'secret' };
    return supertest(app)
      .delete("/api/users/333")
      .send(newItem)
      .then(function(res) { 
        expect(202);
      });
  });
});

describe('Scores', function() {
  it('should list Scores on GET', function() {
    return supertest(app)
    .get('/api/scores')
    .then(function(res) {
      expect(201);
    });
  });
  it("should add an Scores on POST", function() {
    const newItem = { useranswer: 'peter', quiz_id: '1', user_id: '333'};
    return supertest(app)
      .post("/api/scores")
      .send(newItem)
      .then(function(res) {
        expect(202);
      });
  });
  it("should edit an Scores on PATCH", function() {
    const newItem = { id: 333, useranswer: 'peter', quiz_id: '1', user_id: '333' };
    return supertest(app)
      .patch("/api/scores/333")
      .send(newItem)
      .then(function(res) {
        expect(202);
      });
  });
  it("should delete an Scores on DELETE", function() {
    const newItem = { id: 333, useranswer: 'peter', quiz_id: '1', user_id: '333' };
    return supertest(app)
      .delete("/api/scores/333")
      .send(newItem)
      .then(function(res) { 
        expect(202);
      });
  });
});