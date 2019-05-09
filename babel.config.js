module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { browsers: ['last 2 major versions'] },
        spec: true,
        forceAllTransforms: true
      },
    ],
    ['@babel/preset-react'],
  ],
  plugins: [
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime'
  ]
};
