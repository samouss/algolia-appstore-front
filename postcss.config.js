/* eslint-disable quote-props */

module.exports = {
  plugins: {
    'postcss-custom-media': {
      extensions: {
        '--tablet': '(min-width: 768px)',
      },
    },
    'postcss-nested': {},
    'autoprefixer': {},
  },
};
