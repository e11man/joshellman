const bcrypt = require('bcryptjs');

const password = 'admin123';
const saltRounds = 12;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    return;
  }
  console.log('Password hash for "admin123":');
  console.log(hash);
  console.log('\nAdd this to your .env.local file as ADMIN_PASSWORD_HASH');
});