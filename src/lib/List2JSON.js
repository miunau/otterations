function clean(input, options) {
  if(options.indexOf('removeWhitespace') > -1) {
    input = input.replace(/\s/g,'');
  }
  if(options.indexOf('removeQuotes') > -1) {
    input = input.replace(/['"]+/g, '');
  }
  return input.replace(/(\r\n|\n|\r|\t)/gm, "");
}

function parseArray(input, delimiter, inputOptions) {
  return input.split(delimiter).map(i => clean(i, inputOptions)).filter(i => i !== "");
}

function parseEnum(input, delimiter, inputOptions) {
  let output = {};
  input.split(delimiter).forEach(item => {
    const _item = clean(item, inputOptions);
    if(_item !== "") output[_item] = _item;
  });
  return output;
}

function replaceInObj(obj, replKey, replIndex) {
  Object.keys(obj).forEach((key, index) => {
    const o = obj[key];
    if(typeof o === 'string') {
      //console.log(key, obj[key]);
      obj[key] = obj[key].replace(/\[KEY\]/g, replKey);
      obj[key] = obj[key].replace(/\[INDEX\]/g, replIndex);
    }
  });
  return obj;
}

function parseCollection(input, delimiter, structure, keyAttr, inputOptions) {
  let output = [];
  input.split(delimiter).forEach((item, index) => {
    const _item = clean(item, inputOptions);
    if(_item !== "") {
      let newItem = Object.assign({}, JSON.parse(structure));
      output.push(Object.assign({}, replaceInObj(newItem, _item, index)));
    }
  });
  return output;
}

function parseDictionary(input, delimiter, structure, inputOptions) {
  let output = {};
  input.split(delimiter).forEach(item => {
    const _item = clean(item, inputOptions);
    if(_item !== "") output[_item] = Object.assign({}, JSON.parse(structure));
  });
  return output;
}

export default function List2Enum({
  input,
  delimiter = ',',
  type = 'object',
  structure = '{}',
  keyAttr = 'id',
  inputOptions = []
}) {

  let output;

  //console.log(input, delimiter, type, structure)

  switch(type) {
    case 'array':
      output = parseArray(input, delimiter, inputOptions);
      break;
    case 'enum':
      output = parseEnum(input, delimiter, inputOptions);
      break;
    case 'collection':
      output = parseCollection(input, delimiter, structure, keyAttr, inputOptions);
      break;
    case 'dictionary':
      output = parseDictionary(input, delimiter, structure, inputOptions);
      break;
  }

  return output;

}