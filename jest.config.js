module.exports = {
  setupFilesAfterEnv: ['./setup.test.js'],
  testRegex: 'src/.*.(test|spec).jsx?$',
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
