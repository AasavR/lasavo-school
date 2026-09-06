const { execSync } = require('child_process');
const fs = require('fs');

try {
  console.log('Querying Netlify API...');
  const output = execSync('npx netlify api listSites', { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
  const sites = JSON.parse(output);
  
  const rwaSites = sites.filter(s => 
    (s.name && s.name.toLowerCase().includes('rwa')) || 
    (s.custom_domain && s.custom_domain.toLowerCase().includes('rwa')) ||
    (s.url && s.url.toLowerCase().includes('rwa')) ||
    (s.name && s.name.toLowerCase().includes('p2p'))
  );
  
  const resultText = [
    '=== MATCHING RWA / P2P SITES ===',
    ...rwaSites.map(s => `Name: ${s.name} | Site ID: ${s.site_id} | URL: ${s.ssl_url || s.url} | Custom Domain: ${s.custom_domain}`),
    '=== TOTAL SITES COUNT === ' + sites.length,
    '=== ALL SITES ===',
    ...sites.map(s => `${s.name} (ID: ${s.site_id}) -> ${s.ssl_url || s.url}`)
  ].join('\n');

  fs.writeFileSync('netlify_summary.txt', resultText, 'utf-8');
  console.log('DONE! Wrote to netlify_summary.txt');
} catch (e) {
  console.error('Error:', e.message);
  fs.writeFileSync('netlify_summary.txt', 'Error: ' + e.message, 'utf-8');
}
