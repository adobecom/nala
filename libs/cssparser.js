import css from 'css';

export function getCSSObjects(variableCSSContent, blcokCSSContent) {
  // parse variableCSS
  const parsedVariablesCSS = css.parse(variableCSSContent);
  const parsedBlockCSS = css.parse(blcokCSSContent);

  const variableCSSObject = {};
  const blockCSSObject = {};
  const variableCSSValues = {};
  const resolvedVariableCSSValues = {};

  // parse variable CSS values
  parsedVariablesCSS.stylesheet.rules.forEach((rule) => {
    const selectors = rule.selectors;
    if (selectors) {
      rule.selectors.forEach((selector) => {
        if (selector === ':root') {
          const declarations = rule.declarations;
          if (declarations) {
            declarations.forEach((declaration) => {
              if (
                declaration.type === 'declaration' &&
                declaration.property.startsWith('--')
              ) {
                variableCSSValues[declaration.property] = declaration.value;
              }
            });
          }
        }
      });
    }
  });

  // Resolve variable references within variableCSSValues
  Object.keys(variableCSSValues).forEach((propertyName) => {
    const value = variableCSSValues[propertyName];
    const matches = value.match(/var\(([^)]+)\)/g);

    if (matches) {
      let resolvedValue = value;
      matches.forEach((match) => {
        const variableName = match.match(/var\(([^)]+)\)/)[1];
        if (variableCSSValues[variableName]) {
          resolvedValue = resolvedValue.replace(
            match,
            variableCSSValues[variableName]
          );
        }
      });
      resolvedVariableCSSValues[propertyName] = resolvedValue;
    } else {
      resolvedVariableCSSValues[propertyName] = value;
    }
  });

  // create variable CSS object
  parsedVariablesCSS.stylesheet.rules.forEach((rule) => {
    if (rule.type === 'rule') {
      rule.selectors.forEach((selector) => {
        const properties = {};
        rule.declarations.forEach((declaration) => {
          if (declaration.type === 'declaration') {
            let value = declaration.value;
            const matches = value.match(/var\(([^)]+)\)/g);
            if (matches) {
              matches.forEach((match) => {
                const variableName = match.replace(/var\(([^)]+)\)/, '$1');
                if (resolvedVariableCSSValues[variableName]) {
                  value = value.replace(match, resolvedVariableCSSValues[variableName]);
                }
              });
            }
            properties[declaration.property] = value;
          }
        });
        variableCSSObject[selector] = properties;
      });
    }
  });

  // create Block CSS object
  parsedBlockCSS.stylesheet.rules.forEach((rule) => {
    if (rule.type === 'rule') {
      rule.selectors.forEach((selector) => {
        const properties = {};
        rule.declarations.forEach((declaration) => {
          if (declaration.type === 'declaration') {
            let value = declaration.value;
            const matches = value.match(/var\(([^)]+)\)/g);
            if (matches) {
              matches.forEach((match) => {
                const variableName = match.replace(/var\(([^)]+)\)/, '$1');
                if (variableCSSValues[variableName]) {
                  value = value.replace(match, variableCSSValues[variableName]);
                }
              });
            }
            properties[declaration.property] = value;
          }
        });
        blockCSSObject[selector] = properties;
      });
    }
  });

  return { variableCSSObject, blockCSSObject };
}
