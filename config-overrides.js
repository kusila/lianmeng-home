const rewireLess = require('react-app-rewire-less');
const { getLoader } = require('react-app-rewired');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function override(config, env) {

  if (env === 'development') {
    // hotloader支持
    config.entry.splice(1, 0, 'react-hot-loader/patch');
  }

  if (env === 'production') {
    config.entry = {
      polyfills: config.entry[0],
      vendors: ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react', 'moment', 'qs'],
      antd: ['antd'],
    //   components: ['antd-components'],
      main: config.entry[1],
    };
    tsLoader.use = [
      {
        loader: 'ts-loader'
      }
    ];
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin(['polyfills', 'vendors', 'antd', 'components'].reverse()));
  }

  // less支持
  config = rewireLess.withLoaderOptions({
    modifyVars: {
    //   '@primary-color': '#1DA57A' ,
      '@icon-url': '"./src/assets/fonts/font_148784_r2qo40wrmaolayvi.woff"'
    }
  })(config, env);

  // scss支持
  const sassLoader = {
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          module: true,
          importLoaders: 1,
          localIdentName: '[local]--[hash:base64:5]'
        },
      },
      'sass-loader'
    ]
  };

  const oneOf = config.module.rules.find(rule => rule.oneOf).oneOf;
  oneOf.unshift(sassLoader);

  if (process.env.ANALYZE) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
