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

function createRegex(text) {
  // Escape special chars and replace spaces with whitespace matchers
  const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(escaped.replace(/\s+/g, '\\s+'), 'g');
}

const replacements = [
  {
    regex: createRegex("We start with a thorough assessment of your attic space and insulation needs. This consultation typically takes about an hour and helps us understand your specific requirements."),
    replace: "Your journey to a more comfortable home begins with a comprehensive, no-obligation thermal diagnostic. This detailed consultation allows our experts to pinpoint exactly where your home is bleeding energy and identify your specific, unique requirements."
  },
  {
    regex: createRegex("Based on the assessment, we recommend the best materials for your attic insulation"),
    replace: "Using the hard data from our inspection, we engineer a custom insulation strategy tailored to your home. We will walk you through the precise benefits of fiberglass, advanced cellulose, or high-performance spray foam so you can make an empowered decision."
  },
  {
    regex: createRegex("Our team prepares the attic space by removing old insulation if necessary and ensuring the area is clean and safe for installation."),
    replace: "Before any new material is installed, our meticulous crews prep your home by safely extracting any toxic, degraded, or moisture-ruined old insulation. We then comprehensively clean and seal the space to guarantee a flawless, safe, and highly effective new installation."
  },
  {
    regex: createRegex("Using specialized tools like an insulation blower, we efficiently install the chosen insulation material. This process usually takes a few hours, depending on the attic size."),
    replace: "Utilizing advanced, commercial-grade equipment, our certified technicians expertly install your chosen insulation system. We work with speed and precision, typically completing the entire structural upgrade in just a single day with minimal disruption to your life."
  },
  {
    regex: createRegex("After installation, we conduct a thorough inspection to ensure everything is in place and functioning correctly. We also provide maintenance tips for long-lasting performance."),
    replace: "Once the installation is complete, a senior technician conducts a rigorous quality assurance walkthrough. We verify that every square inch meets our strict performance standards and provide you with simple, effective tips to ensure your new insulation performs flawlessly for decades."
  },
  {
    regex: /We offer a comprehensive range of insulation services in [a-zA-Z\s]+ to meet your needs\. Our team is dedicated to providing the best insulation solutions for your home, including attic insulation, which is crucial for energy efficiency\./g,
    replace: "We provide an extensive suite of advanced insulation solutions designed specifically for this region's demanding climate. From high-performance attic upgrades to airtight spray foam, our certified team is fiercely dedicated to permanently lowering your utility bills and elevating your home's indoor comfort."
  },
  {
    regex: /Insulation demand in ([a-zA-Z\s]+) is on the rise as homeowners seek to improve energy efficiency and comfort\. We offer a range of \1 insulation services to meet these needs, including attic insulation and blown-in insulation, ensuring your home stays comfortable year-round\./g,
    replace: "Energy efficiency has never been more critical for homeowners in $1. To combat rising utility costs and extreme weather, we deliver a premium selection of localized insulation services. From modern blown-in fiberglass to precision air sealing, we guarantee your home remains consistently comfortable and highly efficient year-round."
  },
  {
    regex: /Attic insulation in ([a-zA-Z\s]+) is essential due to the region's climate\. We use high-quality materials like Owens Corning fiberglass to ensure your attic is properly insulated, minimizing heat loss and reducing energy bills\./g,
    replace: "Due to the intense local climate, upgrading your attic insulation in $1 is not a luxury—it is an absolute necessity. We exclusively install premium, industry-leading materials like Owens Corning fiberglass to create a robust thermal barrier that virtually eliminates heat transfer and drastically reduces your monthly cooling costs."
  },
  {
    regex: /Blown-in insulation is an effective solution for homes in ([a-zA-Z\s]+), especially those with irregular spaces\. Our team utilizes advanced insulation blowers to evenly distribute cellulose or fiberglass, providing comprehensive coverage\./g,
    replace: "For homes in $1 with tight, irregular attic spaces or existing degraded material, blown-in insulation is the ultimate solution. Utilizing state-of-the-art pneumatic blowers, our technicians achieve a flawless, dense pack of premium fiberglass or cellulose that provides complete thermal coverage without any gaps."
  },
  {
    regex: /Spray foam insulation is ideal for ([a-zA-Z\s]+) homes looking for superior air sealing\. We apply Icynene spray foam to create an airtight barrier, effectively preventing drafts and moisture issues\./g,
    replace: "When maximum performance is required, spray foam is the gold standard for $1 homes. By applying premium closed-cell or open-cell spray foam, we create an impenetrable, airtight barrier that instantly halts energy-stealing drafts, blocks allergens, and prevents severe moisture issues from taking root in your walls and attic."
  },
  {
    regex: /Injection foam insulation is a great option for existing walls in ([a-zA-Z\s]+)\. This method allows us to insulate your home without the need for major renovations, improving energy efficiency quickly and cleanly\./g,
    replace: "If you want to upgrade the insulation in your existing $1 home without tearing down drywall, injection foam is the perfect non-invasive solution. This advanced method quickly fills empty wall cavities from the outside, instantly boosting your home's R-value and soundproofing with zero major renovations required."
  },
  {
    regex: /Air sealing works hand-in-hand with insulation to maximize energy savings in ([a-zA-Z\s]+)\. We identify and seal leaks around windows, doors, and vents, ensuring your conditioned air stays inside where it belongs\./g,
    replace: "Insulation alone isn't always enough—air sealing is the critical second half of the energy-efficiency equation in $1. We meticulously hunt down and seal every hidden leak around your attic floor, ductwork, and living spaces, ensuring your expensive conditioned air stays locked securely inside your home."
  }
];

let filesChanged = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  replacements.forEach(r => {
    content = content.replace(r.regex, r.replace);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    filesChanged++;
  }
});

console.log('Rewritten massive amounts of boilerplate content across ' + filesChanged + ' pages successfully.');
