module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactA11ySelect',
      externals: {
        react: 'React'
      }
    }
  }
}
