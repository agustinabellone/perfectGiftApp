module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  rules: {
    'react-native/no-inline-styles': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  plugins: ['prettier'],
}
