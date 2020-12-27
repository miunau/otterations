function clean(input, options) {
  if(options.indexOf('removeAllWhitespace') > -1) {
    input = input.replace(/\s/g,'');
  }
  if(options.indexOf('removeWhitespace') > -1) {
    input = input.trim();
  }
  if(options.indexOf('removeQuotes') > -1) {
    input = input.replace(/['"]+/g, '');
  }
  return input.replace(/(\r\n|\n|\r|\t)/gm, "");
}

function parseEnum(input) {
  let output = {};
  input.forEach(item => {
    output[item] = item;
  });
  return output;
}

function parseDictionary(input, structure, inputs) {
  let output = {};
  input.forEach((key, index) => {
    let f = inputs.map(i => i); // need this so inputs is available to eval
    const structureObj = eval('(' + structure + ')');
    output[key] = Object.assign({}, structureObj);
  });
  return output;
}

export const types = [
  'json: array',
  'json: enum',
  'json: collection',
  'json: dictionary',
  'matlab: list'
];

export default function List2List({
  input,
  delimiter = ',',
  type = 'object',
  structure = '{}',
  inputOptions = [],
  otherInputs = []
}) {

  let output;

  // Clean input
  input = input.split(delimiter).map(i => {
    return clean(i, inputOptions);
  }).filter(i => i !== "");

  // Clean other input(s)
  otherInputs = otherInputs.map(o => {
    return o.split(delimiter).map(oo => clean(oo, inputOptions));
  });

  if(inputOptions.indexOf('sort') > -1) {
    input = input.sort();
    otherInputs = otherInputs.map(o => {
      return o.sort();
    });
  }

  switch(type) {
    case 'json: array':
      output = input;
      break;
    case 'json: enum':
      output = parseEnum(input);
      break;
    case 'json: collection':
      let _output = parseDictionary(input, structure, otherInputs);
      output = Object.keys(_output).map(key => {
        return _output[key];
      });
      break;
    case 'json: dictionary':
      output = parseDictionary(input, structure, otherInputs);
      break;
    case 'matlab: list':
      output = "List = "+JSON.stringify(input, null, 2).replace(/\",/g, "\";")+";";
      break;
  }
  
  if(type.startsWith('matlab')) {
    return output;
  }

  return JSON.stringify(output, null, 2);

}