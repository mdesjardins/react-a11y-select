module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactA11ySelect',
      externals: {
        react: 'React',
      },
    },
  },
  webpack: {
    html: {
      template: 'demo/src/index.html',
    },
  },
  karma: {
    testContext: 'tests/setup.js',
  },
}
