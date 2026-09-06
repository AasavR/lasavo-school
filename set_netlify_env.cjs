const { execSync } = require('child_process');

const siteId = '9376275d-3b7d-4215-a408-d55150cc2ff6'; // lasavo-rwa
const keyId = 'rzp_test_TWRYKe5DWcerEE';
const keySecret = 'fMyMeroQLQ0JhvN45Ec6H6Y7';

try {
  console.log('Setting Netlify environment variables for lasavo-rwa...');

  // Set RAZORPAY_KEY_ID
  execSync(`npx netlify env:set RAZORPAY_KEY_ID ${keyId} --site ${siteId}`, { encoding: 'utf-8' });
  console.log('✓ Set RAZORPAY_KEY_ID');

  // Set RAZORPAY_KEY_SECRET
  execSync(`npx netlify env:set RAZORPAY_KEY_SECRET ${keySecret} --site ${siteId}`, { encoding: 'utf-8' });
  console.log('✓ Set RAZORPAY_KEY_SECRET');

  // Set VITE_RAZORPAY_KEY_ID
  execSync(`npx netlify env:set VITE_RAZORPAY_KEY_ID ${keyId} --site ${siteId}`, { encoding: 'utf-8' });
  console.log('✓ Set VITE_RAZORPAY_KEY_ID');

  console.log('SUCCESS: All Netlify environment variables set on lasavo-rwa!');
} catch (e) {
  console.error('Error setting env vars:', e.message);
  if (e.stdout) console.log('STDOUT:', e.stdout);
  if (e.stderr) console.log('STDERR:', e.stderr);
}
