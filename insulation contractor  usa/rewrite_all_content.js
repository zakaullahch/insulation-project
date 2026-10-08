const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

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

// Templates for Service Pages
const serviceTemplates = {
  hero: {
    title: (service) => `Premium ${service} Services`,
    p1: () => "Engineered for maximum thermal performance and comfort.",
    p2: (service) => `Stop letting your hard-earned money escape through your roof and walls. Our advanced ${service} solutions provide an impenetrable thermal barrier, instantly lowering utility bills while maximizing your home's energy efficiency.`
  },
  overview: {
    title: (service) => `The Science Behind ${service}`,
    p1: (service) => `When you invest in professional ${service}, you are doing more than just adding material to your home—you are upgrading its entire thermal envelope. This state-of-the-art solution actively resists heat transfer, keeping the brutal summer heat out and your expensive conditioned air securely inside.`,
    p2: () => "Unlike outdated methods that settle and degrade over time, our premium installations maintain their R-value for decades. This means you get a permanent upgrade that pays for itself year after year through drastically reduced cooling and heating costs."
  },
  benefits: {
    title: () => "Why Upgrade Your Insulation Today?",
    sub: () => "Discover the immediate, transformative benefits of a properly sealed and insulated home.",
    items: [
      { t: "Slashing Utility Bills", d: "By eliminating thermal bypass, your HVAC system works up to 30% less, leading to massive monthly savings on your electricity bills." },
      { t: "Complete Climate Control", d: "Say goodbye to hot upstairs bedrooms and freezing floors. Enjoy perfectly balanced, consistent temperatures in every single room." },
      { t: "Moisture & Mold Defense", d: "Our materials don't just stop heat—they act as a powerful barrier against humidity, preventing wood rot and toxic mold growth." },
      { t: "Whisper-Quiet Living", d: "Experience unparalleled peace and quiet as high-density insulation acts as a massive soundproofing barrier against outside traffic and noise." }
    ]
  },
  faq: {
    title: () => "Common Questions, Answered",
    items: [
      { q: "Will this actually lower my energy bills?", a: "Absolutely. Most homeowners see a 20% to 30% reduction in their monthly cooling costs immediately after installation, meaning the upgrade quickly pays for itself." },
      { q: "How long does the installation process take?", a: "We value your time. Our certified, highly-trained crews utilize commercial-grade equipment to complete 95% of residential installations in just a single day, leaving your home spotless." },
      { q: "Is the material safe for my family and pets?", a: "Safety is our top priority. We exclusively use premium, non-toxic, class-A fire-rated materials that are completely safe, off-gas free, and heavily strictly regulated by building codes." },
      { q: "Do you offer financing or warranties?", a: "Yes. We offer transparent, competitive pricing with flexible financing options. Additionally, all our premium installations come backed by an industry-leading lifetime performance warranty." }
    ]
  }
};

// Templates for Location Pages
const locationTemplates = {
  hero: {
    title: (city) => `Top-Rated Insulation Experts in ${city}`,
    p1: () => "Defend your home against extreme weather and rising utility costs.",
    p2: (city) => `Homeowners in ${city} trust us to deliver flawless, high-performance insulation upgrades. Whether you need an attic overhaul or precision air sealing, we guarantee a cooler home and permanently lower energy bills.`
  },
  whyCritical: {
    title: (city) => `Why Upgrading Your ${city} Home is Essential`,
    p1: (city) => `The unique geography and relentless climate of ${city} place massive stress on residential HVAC systems. For nine months of the year, your air conditioner battles intense heat and crushing humidity. Without a flawless thermal barrier, that expensive conditioned air simply leaks out, forcing your unit into overdrive and skyrocketing your energy bills.`,
    p2: () => `By upgrading your attic and wall insulation, you instantly transform your home's energy profile. Our premium materials block radiant heat transfer, seal microscopic air leaks, and prevent dangerous moisture buildup. The result is a home that stays perfectly cool in August, requires less maintenance, and provides superior indoor air quality for your family.`
  },
  servicesAvailable: {
    title: (city) => `Comprehensive Solutions for ${city} Residents`,
    sub: (city) => `From historic builds to new construction, we provide cutting-edge solutions tailored to the exact specifications of your ${city} property.`,
    items: [
      { t: "Premium Attic Insulation", d: "The attic is where you lose 40% of your energy. We install thick, high R-value fiberglass and cellulose to stop heat dead in its tracks." },
      { t: "Advanced Blown-In Solutions", d: "Perfect for irregular spaces and retrofits. We use pneumatic blowers to create a dense, gap-free thermal blanket across your entire ceiling." },
      { t: "Airtight Spray Foam", d: "The ultimate defense. Closed-cell spray foam provides unparalleled R-value while simultaneously sealing every crack against humidity and pests." }
    ]
  }
};

let filesChanged = 0;

htmlFiles.forEach(file => {
  if (file.includes('index.html') || file.includes('about.html') || file.includes('contact.html') || file.includes('blog.html')) {
    return; // Skip non-service/location pages for this specific pass
  }
  
  let content = fs.readFileSync(file, 'utf8');
  let $ = cheerio.load(content);
  let isServicePage = !file.includes('insulation-') || file.includes('blown-in') || file.includes('spray-foam') || file.includes('injection-foam') || file.includes('air-sealing');
  
  let baseName = path.basename(file, '.html');
  let topic = baseName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Clean up topic names
  if (topic.includes('Insulation') && !topic.startsWith('Insulation')) {
      // it's a service like Blown In Insulation
  } else if (topic.startsWith('Insulation ')) {
      topic = topic.replace('Insulation ', ''); // it's a city
      isServicePage = false;
  }
  
  let changed = false;
  
  if (isServicePage) {
    // 1. Rewrite Hero (if new redesign format exists)
    let $hero = $('section').first();
    if ($hero.find('h1').length > 0) {
      $hero.find('h1').text(serviceTemplates.hero.title(topic));
      let ps = $hero.find('p');
      if(ps.length >= 2) {
          $(ps[0]).text(serviceTemplates.hero.p1());
          $(ps[1]).text(serviceTemplates.hero.p2(topic));
      }
      changed = true;
    }
    
    // 2. Rewrite Overview
    let $overview = $('section').eq(1);
    if ($overview.find('h2').length > 0) {
      $overview.find('h2').text(serviceTemplates.overview.title(topic));
      let prose = $overview.find('.prose');
      if(prose.length > 0) {
          prose.html(`
            <p class="mb-6 text-lg text-muted-foreground leading-relaxed">${serviceTemplates.overview.p1(topic)}</p>
            <p class="mb-6 text-lg text-muted-foreground leading-relaxed">${serviceTemplates.overview.p2()}</p>
          `);
      }
      changed = true;
    }
    
    // 3. Rewrite Benefits
    let $benefits = $('section').filter((i, el) => $(el).find('h2').text().toLowerCase().includes('benefit'));
    if ($benefits.length > 0) {
        $benefits.find('h2').text(serviceTemplates.benefits.title());
        let subP = $benefits.find('h2').next('p');
        if(subP.length > 0) subP.text(serviceTemplates.benefits.sub());
        
        let $items = $benefits.find('.flex.gap-4'); // assuming this structure
        $items.each((i, el) => {
            if (i < serviceTemplates.benefits.items.length) {
                $(el).find('h3').text(serviceTemplates.benefits.items[i].t);
                $(el).find('p').text(serviceTemplates.benefits.items[i].d);
            }
        });
        changed = true;
    }
    
    // 4. Rewrite FAQ
    let $faq = $('section').filter((i, el) => $(el).find('h2').text().toLowerCase().includes('question') || $(el).find('h2').text().toLowerCase().includes('faq'));
    if ($faq.length > 0) {
        $faq.find('h2').text(serviceTemplates.faq.title());
        
        let $qas = $faq.find('button[data-accordion]');
        $qas.each((i, el) => {
            if (i < serviceTemplates.faq.items.length) {
                $(el).find('span').text(serviceTemplates.faq.items[i].q);
                let contentDiv = $(el).next('div');
                contentDiv.find('p').text(serviceTemplates.faq.items[i].a);
            }
        });
        changed = true;
    }
    
  } else {
    // LOCATION PAGE REWRITE
    // 1. Rewrite Hero
    let $hero = $('section').first();
    if ($hero.find('h1').length > 0) {
      $hero.find('h1').text(locationTemplates.hero.title(topic));
      let ps = $hero.find('p');
      if(ps.length >= 2) {
          $(ps[0]).text(locationTemplates.hero.p1());
          $(ps[1]).text(locationTemplates.hero.p2(topic));
      }
      changed = true;
    }
    
    // 2. Rewrite "Why Critical"
    let $why = $('section').filter((i, el) => $(el).find('h2').text().toLowerCase().includes('critical') || $(el).find('h2').text().toLowerCase().includes('why'));
    if ($why.length > 0) {
        $why.find('h2').text(locationTemplates.whyCritical.title(topic));
        let prose = $why.find('.prose');
        if (prose.length > 0) {
            prose.html(`
                <p class="mb-4 text-lg text-muted-foreground leading-relaxed">${locationTemplates.whyCritical.p1(topic)}</p>
                <p class="mb-4 text-lg text-muted-foreground leading-relaxed">${locationTemplates.whyCritical.p2()}</p>
            `);
        }
        changed = true;
    }
    
    // 3. Rewrite Services Available
    let $services = $('section').filter((i, el) => $(el).find('h2').text().toLowerCase().includes('services available'));
    if ($services.length > 0) {
        $services.find('h2').text(locationTemplates.servicesAvailable.title(topic));
        $services.find('h2').next('p').text(locationTemplates.servicesAvailable.sub(topic));
        
        let $items = $services.find('a.group');
        $items.each((i, el) => {
            if (i < locationTemplates.servicesAvailable.items.length) {
                $(el).find('h3').text(locationTemplates.servicesAvailable.items[i].t);
                $(el).find('p').text(locationTemplates.servicesAvailable.items[i].d);
            }
        });
        changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(file, $.html(), 'utf8');
    filesChanged++;
  }
});

console.log('Completely rewrote content for ' + filesChanged + ' service and location pages successfully.');
