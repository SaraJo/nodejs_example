// Imports
var request = require('supertest');
var assert = require('assert');
var fs = require('fs')

// Here we load our server.js as a module
var server = require('../server');

describe('Server', function() {
  describe('GET /get-asset', function() {
    it('responds with assets/script.js', function(done) {
      request(server)
        .get('/get-asset')
        .end(function(error, response) {
          assert.equal(error, null);
          var text = response.text;
          assert.equal(text, fs.readFileSync('assets/script.js', 'utf-8'));
          done();
        });
    });
  });
});