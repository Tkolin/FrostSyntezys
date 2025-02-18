module.exports = {
  module: {
    rules: [
      {
        test: /\.gql$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
    ],
  },
};
