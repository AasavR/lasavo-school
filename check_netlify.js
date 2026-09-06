const { execSync } = require('child_process');

try {
  const output = execSync('npx netlify api listSites', { encoding: 'utf-8' });
  const sites = JSON.parse(output);
  const rwaSites = sites.filter(s => 
    (s.name && s.name.includes('rwa')) || 
    (s.custom_domain && s.custom_domain.includes('rwa')) ||
    (s.url && s.url.includes('rwa')) ||
    (s.name && s.name.includes('p2p'))
  );
  console.log('=== MATCHING RWA / P2P SITES ===');
  rwaSites.forEach(s => {
    console.log(`Name: ${s.name} | Site ID: ${s.site_id} | URL: ${s.ssl_url || s.url} | Custom Domain: ${s.custom_domain}`);
  });
  console.log('=== ALL SITES COUNT ===', sites.length);
  const siteNames = sites.map(s => `${s.name} (${s.site_id})`);
  console.log('=== SITES LIST ===');
  console.log(siteNames.join('\n'));
} catch (e) {
  console.error('Error:', e.message);
}
