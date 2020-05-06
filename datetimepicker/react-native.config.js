const root = process.cwd();

module.exports = {
  dependencies: {
    datetimepicker: {
      root,
    },
  },
};

const windowsSwitch = '--use-react-native-windows';

if (process.argv.includes(windowsSwitch)) {
  process.argv = process.argv.filter(arg => arg !== windowsSwitch);
  process.argv.push('--config=metro.config.windows.js');
  module.exports = {
    reactNativePath: 'node_modules/react-native-windows',
  };
}