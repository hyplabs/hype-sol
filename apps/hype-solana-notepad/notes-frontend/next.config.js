// Note - this is a custom webpack config because anchor exports types from a generated .ts
// file and next.js can't load typescript files out of the box

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack:(config, options) => {
    config.module.rules.push({
      test: /\.(ts)x?$/, // Just `tsx?` file only
      use: [
        // options.defaultLoaders.babel, I don't think it's necessary to have this loader too
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
            onlyCompileBundledFiles: true,
          },
        },
      ],
    });
  
    return config;
  },
}

module.exports = nextConfig
