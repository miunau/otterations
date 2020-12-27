function clean(input, options) {
  if(options.indexOf('removeWhitespace') > -1) {
    input = input.replace(/\s/g,'');
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

function parseMatlabList(input, structure, otherInputs) {
  return input;
}

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
      output = parseMatlabList(input, structure, otherInputs);
      break;
  }

  return output;

}