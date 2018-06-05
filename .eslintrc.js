module.exports = {
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
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