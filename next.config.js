module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(ts|)x?$/,
      },
      use: ['@svgr/webpack'],
    })

    return config
  },
}
