const fs = require('fs');

try {
  let content = fs.readFileSync('netlify_sites.json', 'utf-8');
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  const data = JSON.parse(content);
  const result = data.map(s => ({
    name: s.name,
    site_id: s.site_id,
    url: s.ssl_url || s.url,
    custom_domain: s.custom_domain,
    repo: s.build_settings ? s.build_settings.repo_url : null
  }));
  fs.writeFileSync('sites_clean.json', JSON.stringify(result, null, 2), 'utf-8');
  console.log('SUCCESS: Saved ' + result.length + ' sites');
} catch (err) {
  console.error(err);
}
