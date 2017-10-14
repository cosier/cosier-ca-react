module.exports = {
  "plugins": ["react"],
  "extends": ["eslint:recommended", "google", "plugin:react/all"],
  "parserOptions": {
    "ecmaVersion": 6,
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
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/jsx-filename-extension": 0,
    "react/react-in-jsx-scope": 1,
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
