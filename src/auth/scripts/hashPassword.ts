import * as bcrypt from 'bcrypt';

if (process.argv.length === 2) {
  console.error('Expected at least one argument!');
  process.exit(1);
}

bcrypt.hash(process.argv[2], 10).then((hash) => console.log(hash));
