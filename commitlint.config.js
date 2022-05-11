"use strict";

const { rules } = require('@commitlint/config-conventional');
const extendedRule = 'type-enum';

module.exports = {
    rules: Object.assign(Object.assign({}, rules), { [extendedRule]: [2, 'always', [...rules[extendedRule][2], 'release']], 'references-empty': [2, 'never'], 'header-max-length': () => [0, 'always', Infinity] }),
    parserPreset: {
        parserOpts: {
            referenceActions: null,
            issuePrefixes: ['(NINJA)-'],
        },
    },
    ignores: [
        (message) => message.includes('[manually skip]') || message.includes('[ci skip]') || message.includes('[master]'),
    ],
};
