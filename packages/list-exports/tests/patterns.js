const path = require('path');
const listExports = require('../index.js');

async function run() {
  try {
    // Adjust the path to a package.json you want to analyze (e.g. test-globs/package.json)
    const pkgJsonPath = path.join(__dirname, '../../../test-globs/package.json');

    const result = await listExports(pkgJsonPath);

    const latest = result.latest;
    const tree = result.exports ? result.exports[latest] : null;

    console.log('Result from listExports:', result);
    console.log('Exports Tree:', tree);

    if (!tree) {
      console.error('Exports Tree is undefined!');
      return;
    }

    // Example checks:
    if (tree.require && tree.require.has('./good/foo.js')) {
      console.log('✅ Single * pattern mapped correctly');
    } else {
      console.error('❌ Single * pattern missing');
    }

    if (tree.require && tree.require.has('./bad/more/foo.js')) {
      console.log('✅ Double ** pattern mapped correctly');
    } else {
      console.log('! Double ** pattern not mapped or handled as expected');
    }

  } catch (err) {
    console.error('Error running listExports:', err);
  }
}

run();
