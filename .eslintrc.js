module.exports = {
    extends: ["eslint:recommended", "plugin:node/recommended", 'prettier'],
    plugins: ['node','prettier'],
    env: {
        node: true
    },
    rules: {
      'no-console': 0,
      "prettier/prettier": "error",
      "linebreak-style":["error", "unix"],
      "no-use-before-define": 0
    }
  };