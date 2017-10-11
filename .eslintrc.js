module.exports = {
  "extends": ["eslint:recommended", "google"],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  "env": {
    "browser": true,
    "node": true
  },
  "parser": "babel-eslint",
  "rules": {
    "camelcase": 0,
    "no-console": 0,
    "brace-style": ["error", "stroustrup"],
    "quotes": [2, "single"],
    "strict": [2, "never"],
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/react-in-jsx-scope": 2,
    "require-jsdoc": 0,
    "linebreak-style": 0,
  },
  "globals": {
    "require": true,
    "Promise": true,
    "process": true,
    "console": true,
    "module": true
  }
};
