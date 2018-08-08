const commonConfig = require("./build-utils/webpack.common");
const webpackMerge = require("webpack-merge");

const addons = (addonsArg) => {
  let addons = []
      .concat.apply([], [addonsArg]) // Normalize array of addons (flatten)
      .filter(Boolean);              // If addons is undefined, filter it out
  return addons.map((addonName) => require('./build-utils/addons/webpack.'+addonName+'.js'));
}

module.exports = (env) => {
  console.log(env);
  const envConfig = require('./build-utils/webpack.'+env.env+'.js');
  const mergedConfig = webpackMerge(commonConfig, envConfig, ...addons(env.addons));

  console.log(mergedConfig);
  return mergedConfig;
}