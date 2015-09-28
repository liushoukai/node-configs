
var expect = require('chai').expect
  , assert = require('chai').assert
  , should = require('chai').should()
  , config = null
  ;

process.env.NODE_CONF_DIR='test/conf';

var config = require('../');
config.get('person.age').should.equal(25);

