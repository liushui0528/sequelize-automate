const _ = require('lodash');
const midway = require('./midway');

function processMidway(definitions, options) {
  const modelCodes = definitions.map((definition) => {
    const { modelFileName } = definition;
    const file = `${modelFileName}.ts`;
    const code = midway.generateCode(definition, options);
    return {
      file,
      code,
    };
  });

  const definitionCodes = definitions.map((definition) => {
    const { modelFileName } = definition;
    const file = `${modelFileName}.d.ts`;
    const code = midway.generateDefinition(definition);
    return {
      file,
      code,
    };
  });

  const dbCodes = {
    file: 'db.ts',
    code: midway.generateDB(),
  };
  const codes = _.concat([], modelCodes, definitionCodes, dbCodes);
  return codes;
}

/**
 * Generate model code
 * @param {object} definition definition
 * @param {object} options
 */
function generate(definition, options) {
  const { type, tsNoCheck } = options;
  switch (type) {
    case 'midway':
      return processMidway(definition, { tsNoCheck });
    default:
      break;
  }
  return null;
}

module.exports = generate;
