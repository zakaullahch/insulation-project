const fs = require('fs');
const path = require('path');

const dir = __dirname;
function getFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory() && !file.includes('node_modules') && !file.includes('.git') && !file.includes('assets')) {
      arrayOfFiles = getFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if(file.endsWith('.html')) arrayOfFiles.push(path.join(dirPath, file));
    }
  });
  return arrayOfFiles;
}

const htmlFiles = getFiles(dir);

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Fix encoding issues caused by previous shell script
  content = content.replace(/Ã¢â‚¬â€œ/g, '-').replace(/â€“/g, '-').replace(/Ã¢â‚¬â€/g, '-').replace(/â€”/g, '-').replace(/Â©/g, '©').replace(/Ã‚Â©/g, '©');

  // Upgrade Sections
  content = content.replace(/class="([^"]*)bg-background([^"]*)"/g, (match, p1, p2) => {
    if(p1.includes('bg-gradient') || p2.includes('bg-gradient')) return match;
    return `class="${p1}bg-gradient-to-br from-background via-background/95 to-muted/40 relative overflow-hidden${p2}"`;
  });

  // Upgrade Cards
  content = content.replace(/class="([^"]*)\bbg-card\b([^"]*)"/g, (match, p1, p2) => {
    if(p1.includes('backdrop-blur') || p2.includes('backdrop-blur')) return match;
    
    let newClass = `class="${p1}bg-card/70 backdrop-blur-xl border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(14,165,233,0.15)] hover:border-primary/30 rounded-3xl transition-all duration-500 group relative${p2}"`;
    
    // Clean up old classes
    newClass = newClass.replace(/\bborder-border\b/g, '').replace(/\bborder\b /g, ' ').replace(/shadow-[a-z]+/g, '').replace(/rounded-[a-z0-9]+/g, '');
    return newClass;
  });

  // Upgrade solid Primary buttons
  content = content.replace(/class="([^"]*)\bbg-primary\b([^"]*)"/g, (match, p1, p2) => {
    if(p1.includes('text-primary') || p2.includes('text-primary') || p1.includes('bg-primary/') || p2.includes('bg-primary/')) return match;
    if(p1.includes('shadow-[') || p2.includes('shadow-[')) return match;
    
    let newClass = `class="${p1}bg-gradient-to-r from-primary to-blue-500 shadow-[0_8px_25px_rgba(14,165,233,0.35)] hover:shadow-[0_12px_35px_rgba(14,165,233,0.5)] hover:-translate-y-1 rounded-full font-extrabold transition-all duration-300${p2}"`;
    newClass = newClass.replace(/rounded-[a-z0-9]+/g, '');
    return newClass;
  });

  fs.writeFileSync(file, content, 'utf8');
});

console.log('Upgraded successfully');
