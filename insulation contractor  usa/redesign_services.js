const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const dir = __dirname;
const serviceFiles = [
  'attic-insulation.html',
  'blown-in-insulation.html',
  'spray-foam-insulation.html',
  'injection-foam-insulation.html',
  'air-sealing.html'
].map(f => path.join(dir, f));

serviceFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');
  let $ = cheerio.load(content);
  
  // 1. Redesign Hero Section
  let $hero = $('section').first(); 
  if ($hero.find('h1').length > 0) {
    let title = $hero.find('h1').text().trim();
    let p1 = $hero.find('p').eq(0).text().trim();
    let p2 = $hero.find('p').eq(1).text().trim();
    let imgSrc = $hero.find('img').attr('src');
    
    let newHero = `
    <!-- ====== Stunning Premium Hero Section ====== -->
    <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center min-h-[90vh]">
      <!-- Animated Background Effects -->
      <div class="absolute inset-0 z-0 bg-[#020617]">
        <img src="${imgSrc}" alt="${title}" class="w-full h-full object-cover object-center opacity-30 mix-blend-overlay" />
        <div class="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent"></div>
        <div class="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[120px] animate-pulse"></div>
        <div class="absolute bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent/20 blur-[100px]"></div>
      </div>
      
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          
          <!-- Left Content -->
          <div class="flex flex-col items-start text-left max-w-2xl">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-lg shadow-primary/10">
              <span class="flex h-2 w-2 rounded-full bg-accent animate-ping"></span>
              <span class="text-xs font-bold uppercase tracking-widest text-white/90">Premium Service</span>
            </div>
            
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight capitalize">
              ${title}
            </h1>
            
            <p class="text-xl md:text-2xl font-semibold text-white/80 mb-8 border-l-4 border-primary pl-4">
              ${p1}
            </p>
            
            <p class="text-lg text-white/60 mb-10 leading-relaxed max-w-xl">
              ${p2}
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="tel:(409) 316-9957" class="group relative inline-flex items-center justify-center gap-3 h-14 px-8 rounded-full font-bold text-lg text-white bg-gradient-to-r from-primary to-blue-600 shadow-[0_8px_30px_rgba(14,165,233,0.4)] hover:shadow-[0_12px_40px_rgba(14,165,233,0.6)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div class="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <svg class="w-6 h-6 shrink-0 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="relative z-10">Call (409) 316-9957</span>
              </a>
              <a href="contact" class="inline-flex items-center justify-center h-14 px-8 rounded-full font-bold text-lg text-white bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 w-full sm:w-auto">
                Request a quote
              </a>
            </div>
          </div>
          
          <!-- Right Glassmorphism Image -->
          <div class="hidden lg:block relative">
            <div class="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[2.5rem] transform rotate-3 blur-sm"></div>
            <div class="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-2 shadow-2xl overflow-hidden">
                <img src="${imgSrc}" class="w-full h-full object-cover rounded-[1.8rem]" alt="${title}" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
    <!-- ====== Stunning Premium Hero Section End ====== -->
    `;
    $hero.replaceWith(newHero);
  }

  // 2. Redesign Overview Section
  let $overview = $('section').eq(1);
  if ($overview.find('h2').length > 0) {
      let title = $overview.find('h2').text().trim();
      let paras = [];
      $overview.find('.prose p').each((i, el) => { paras.push($(el).text().trim()); });
      if(paras.length === 0) {
          $overview.find('p').each((i, el) => { paras.push($(el).text().trim()); });
      }
      let pTags = paras.map(p => `<p class="mb-6 text-lg text-muted-foreground leading-relaxed">${p}</p>`).join('\\n');
      let imgSrc = $overview.find('img').attr('src');
      if(!imgSrc || imgSrc === 'undefined') imgSrc = 'assets/images/gen/baytown-hero.jpg';

      let newOverview = `
      <section class="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
        <div class="container mx-auto px-6 relative z-10">
          <div class="grid lg:grid-cols-2 gap-16 items-center">
            <div class="relative order-2 lg:order-1" data-sal="fade" data-sal-duration="800">
               <div class="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl rounded-[3rem]"></div>
               <img src="${imgSrc}" class="relative w-full h-[600px] object-cover rounded-[2.5rem] shadow-2xl border border-white/10" alt="${title}" />
               
               <div class="absolute -bottom-8 -right-8 bg-card/90 backdrop-blur-xl border border-border p-6 rounded-3xl shadow-2xl">
                 <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                        <p class="text-sm font-bold text-foreground">Energy Efficiency</p>
                        <p class="text-xs text-muted-foreground">Up to 30% Savings</p>
                    </div>
                 </div>
               </div>
            </div>
            
            <div class="order-1 lg:order-2" data-sal="slide-up" data-sal-duration="800">
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <span class="text-xs font-bold uppercase tracking-widest">Premium Service Overview</span>
              </div>
              <h2 class="text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">${title}</h2>
              <div class="prose prose-lg max-w-none">
                ${pTags}
              </div>
            </div>
          </div>
        </div>
      </section>
      `;
      $overview.replaceWith(newOverview);
  }
  
  // 3. Process Section
  let $process = $('section').eq(2);
  if ($process.find('h2').text().toLowerCase().includes('process')) {
      let title = $process.find('h2').text().trim();
      let steps = [];
      $process.find('h3').each((i, el) => {
          let stepTitle = $(el).text().trim();
          let stepDesc = $(el).next('p').text().trim();
          if(!stepDesc) stepDesc = $(el).parent().find('p').text().trim();
          steps.push({title: stepTitle, desc: stepDesc});
      });
      
      if(steps.length > 0) {
          let stepsHtml = steps.map((s, i) => `
            <div class="relative group" data-sal="slide-up" data-sal-delay="${i*100}">
                <div class="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <div class="relative bg-card/80 backdrop-blur-lg border border-border/50 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-500 shadow-xl z-10 h-full">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-primary/30 mb-6">
                        ${i+1}
                    </div>
                    <h3 class="text-2xl font-bold text-foreground mb-4">${s.title}</h3>
                    <p class="text-muted-foreground leading-relaxed text-lg">${s.desc}</p>
                </div>
            </div>
          `).join('\\n');
          
          let newProcess = `
          <section class="py-24 bg-background relative overflow-hidden">
            <div class="container mx-auto px-6 relative z-10">
                <div class="text-center max-w-3xl mx-auto mb-20" data-sal="fade">
                    <h2 class="text-4xl lg:text-5xl font-bold text-foreground mb-6">${title}</h2>
                    <p class="text-xl text-muted-foreground">Our meticulous, certified process guarantees flawless results from day one.</p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                    <!-- Connecting Line -->
                    <div class="hidden lg:block absolute top-16 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10"></div>
                    ${stepsHtml}
                </div>
            </div>
          </section>
          `;
          $process.replaceWith(newProcess);
      }
  }

  // Rewrite file
  fs.writeFileSync(file, $.html(), 'utf8');
});
console.log("Services layout redesigned successfully.");
