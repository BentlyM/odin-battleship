module.exports = {
  transform: {
    '^.+\\.(js)?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'json'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/node_modules/identity-obj-proxy',
  },
  transformIgnorePatterns: ['/node_modules/'],
};