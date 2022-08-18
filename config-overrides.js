module.exports = function override(config, env) {
  config.resolve.fallback = {
    http: require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    stream: require.resolve("stream-browserify"),
    crypto: require.resolve("crypto-browserify"),
    zlib: require.resolve("browserify-zlib"),

    buffer: require.resolve("buffer/"),
    util: require.resolve("util/"),
    url: require.resolve("url/"),
    assert: require.resolve("assert/"),
  }

  return config
}
