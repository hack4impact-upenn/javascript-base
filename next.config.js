// next.config.js is not transformed by Babel. So you can only use javascript features supported by your version of Node.js.

module.exports = {
  webpack(config, options) {
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
