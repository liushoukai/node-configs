'use strict';

var path = require('path')
  , fs = require('fs')
  ;

var Config = function() {
  var t = this;

  var configObject = util.loadConfigFiles();

  for(let prop in configObject) {
    t[prop] = configObject[prop];
  }

  for (let fnName in util) {
    util[fnName] = util[fnName].bind(t);
  }

};

var util = Config.prototype.util = {};

util.loadConfigFiles = function() {
  var baseName = "default";
  var extName = "json";
  var fullFilename = path.join(process.cwd(), 'conf', baseName + '.' + extName);
  var fileContent = null;
  var configObject = null;

  fileContent = fs.readFileSync(fullFilename, 'UTF-8');
  fileContent = fileContent.replace(/^[\uFEFF]+/, ''); // trim BOM

  configObject = JSON.parse(util.removeComments(fileContent));

  return configObject;
};

var getImpl = function(Object, property) {

  var elements = Array.isArray(property) ? property : property.split('.');
  var key = elements[0];
  var value = Object[key];
  if (elements.length <= 1) {
    return value;
  } else {
    return getImpl(value, elements.slice(1));
  }

}

/**
 * http://james.padolsey.com/javascript/javascript-comment-removal-revisted/
 */
util.removeComments = function(fileStr) {

  var uid = '_' + +new Date(),
      primitives = [],
      primIndex = 0;

  return (
    fileStr

    /* Remove strings */
    .replace(/(['"])(\\\1|.)+?\1/g, function(match){
      primitives[primIndex] = match;
      return (uid + '') + primIndex++;
    })

    /* Remove Regexes */
    .replace(/([^\/])(\/(?!\*|\/)(\\\/|.)+?\/[gim]{0,3})/g, function(match, $1, $2){
      primitives[primIndex] = $2;
      return $1 + (uid + '') + primIndex++;
    })

    /*
    - Remove single-line comments that contain would-be multi-line delimiters
        E.g. // Comment /* <--
    - Remove multi-line comments that contain would be single-line delimiters
        E.g. /* // <--
    */
    .replace(/\/\/.*?\/?\*.+?(?=\n|\r|$)|\/\*[\s\S]*?\/\/[\s\S]*?\*\//g, '')

    /*
    Remove single and multi-line comments,
    no consideration of inner-contents
    */
    .replace(/\/\/.+?(?=\n|\r|$)|\/\*[\s\S]+?\*\//g, '')

    /*
    Remove multi-line comments that have a replaced ending (string/regex)
    Greedy, so no inner strings/regexes will stop it.
    */
    .replace(RegExp('\\/\\*[\\s\\S]+' + uid + '\\d+', 'g'), '')

    /* Bring back strings & regexes */
    .replace(RegExp(uid + '(\\d+)', 'g'), function(match, n){
      return primitives[n];
    })
  );

};

Config.prototype.get = function(property) {

  if(property === null || property === undefined){
    throw new Error("Calling config.get with null or undefined argument");
  }

  var t = this;
  var value = getImpl(t, property);

  if (value === undefined) {
    throw new Error('Configuration property "' + property + '" is not defined');
  }

  return value;
}

var config = module.exports = new Config();

