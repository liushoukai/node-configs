
var expect = require('chai').expect
  , assert = require('chai').assert
  , should = require('chai').should()
  , config = null
  ;

//config = rewire('../lib/conf');
var config = require('../')
config.get('person.age').should.equal(25);

