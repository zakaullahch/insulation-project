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

// Get the fixed header from index.html
const indexContent = fs.readFileSync('index.html', 'utf8');
const headerMatch = indexContent.match(/<header>([\s\S]*?)<\/header>/);
if (!headerMatch) {
  console.error("Could not find header in index.html");
  process.exit(1);
}
const fixedHeader = `<header>\n${headerMatch[1]}</header>`;

htmlFiles.forEach(file => {
  if (file.endsWith('index.html')) return;
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the broken header with the fixed header
  content = content.replace(/<header>[\s\S]*?<\/header>/, fixedHeader);
  
  fs.writeFileSync(file, content, 'utf8');
});

console.log('Fixed navigation in all files');
