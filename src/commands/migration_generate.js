import process from 'process';
import { _baseOptions, _underscoreOption } from '../core/yargs';

import helpers from '../helpers';
import fs from 'fs';
import colors from 'picocolors';

exports.builder = (yargs) =>
  _underscoreOption(
    _baseOptions(yargs).option('name', {
      describe: 'Defines the name of the migration',
      type: 'string',
      demandOption: true,
    })
  ).argv;

exports.handler = function (args) {
  helpers.init.createMigrationsFolder();

  fs.writeFileSync(
    helpers.path.getMigrationPath(args.name),
    helpers.template.render(
      'migrations/skeleton.js',
      {},
      {
        beautify: false,
      }
    )
  );

  helpers.view.log(
    'New migration was created at',
    colors.blueBright(helpers.path.getMigrationPath(args.name)),
    '.'
  );

  process.exit(0);
};
