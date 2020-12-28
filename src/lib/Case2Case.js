import * as changeCase from "change-case";

function humanize(str, delimiter) {
  var i, frags = str.split('_');
  for (i=0; i<frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(delimiter);
}

function clean(input, options, normalizeType) {
  if(options.indexOf('normalize') > -1) {
    input = changeCase[normalizeType](input);
  }
  if(options.indexOf('joinUnderscores') > -1) {
    input = humanize(input, '');
    console.log(input);
  }
  return input;
}

export const Type = {
  "camelCase": "camelCase",
  "capitalCase": "Capital Case",
  "constantCase": "CONSTANT_CASE",
  "dotCase": "dot.case",
  "headerCase": "Header-Case",
  "lowerCase": "lowercase",
  "noCase": "no case",
  "paramCase": "param-case",
  "pascalCase": "PascalCase",
  "pathCase": "path/case",
  "sentenceCase": "Sentence Case",
  "snakeCase": "snake_case",
  "upperCase": "UPPERCASE"
}

export default function Case2Case({ 
  input,
  splitRegexp,
  stripRegexp,
  type = 'lowerCase',
  normalizeType = 'pascalCase',
  delimiter = '',
  inputOptions = []
}) {

  input = input.split('\n').map(line => clean(line, inputOptions, normalizeType)).join('\n');

  // if toCase is upper or lower, we can do that easily

  if(type === 'upperCase') {
    return input.toUpperCase();
  }

  if(type === 'lowerCase') {
    return input.toLowerCase();
  }

  let opts = {};

  if(delimiter !== '') opts.delimiter = delimiter;
  if(splitRegexp !== '') opts.splitRegexp = new RegExp(splitRegexp);
  if(stripRegexp !== '') opts.stripRegexp = new RegExp(stripRegexp);

  return input.split('\n').map(line => changeCase[type](line, opts)).join('\n')

}