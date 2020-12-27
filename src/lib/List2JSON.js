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

function parseCollection(input, delimiter, structure, keyAttr, inputOptions) {
  let output = [];
  input.split(delimiter).forEach((item, index) => {
    const _item = clean(item, inputOptions);
    if(_item !== "") {
      let replacedStructure = structure
        .replace(/\[KEY\]/g, _item)
        .replace(/\[INDEX\]/g, index);
      const structureObj = eval('(' + replacedStructure + ')');
      let newItem = Object.assign({}, structureObj);
      output.push(Object.assign({}, newItem));
    }
  });
  return output;
}

function parseDictionary(input, delimiter, structure, inputOptions) {
  let output = {};
  input.split(delimiter).forEach((item, index) => {
    const _item = clean(item, inputOptions);
    if(_item !== "") {
      let replacedStructure = structure
        .replace(/\[KEY\]/g, _item)
        .replace(/\[INDEX\]/g, index);
      const structureObj = eval('(' + replacedStructure + ')');
      let newItem = Object.assign({}, structureObj);
      output[_item] = Object.assign({}, newItem);
    }
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