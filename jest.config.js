module.exports = {
  transform: {
    '^.+\\.(js)?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'json'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['/node_modules/'],
};