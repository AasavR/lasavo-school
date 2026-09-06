const { execSync } = require('child_process');

try {
  console.log('Renaming site 9376275d-3b7d-4215-a408-d55150cc2ff6 to lasavo-rwa...');
  const res = execSync(`npx netlify api updateSite --data "{\\"site_id\\": \\"9376275d-3b7d-4215-a408-d55150cc2ff6\\", \\"body\\": {\\"name\\": \\"lasavo-rwa\\"}}"`, { encoding: 'utf-8' });
  console.log('RENAME RESULT:', res);
} catch (e) {
  console.error('Rename failed:', e.message);
  if (e.stdout) console.log('STDOUT:', e.stdout);
  if (e.stderr) console.log('STDERR:', e.stderr);
}
