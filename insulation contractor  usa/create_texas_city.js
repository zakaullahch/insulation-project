const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const sourceFile = path.join(__dirname, 'insulation-baytown.html');
const targetFile = path.join(__dirname, 'insulation-texas-city.html');

let content = fs.readFileSync(sourceFile, 'utf8');
let $ = cheerio.load(content);

// 1. Update Metadata
$('title').text('Insulation Contractors in Texas City, TX | Premium Energy Solutions');
$('meta[name="description"]').attr('content', 'Top-rated insulation contractors in Texas City, TX. Protect your home from Galveston Bay humidity, industrial pollutants, and extreme heat with our premium insulation services.');
$('link[rel="canonical"]').attr('href', 'https://insulation-contractor-pros.vercel.app/insulation-texas-city');
$('script[type="application/ld+json"]').each((i, el) => {
    let scriptContent = $(el).html();
    if(scriptContent.includes('baytown')) {
        scriptContent = scriptContent.replace(/baytown/g, 'texas city').replace(/Baytown/g, 'Texas City');
        $(el).html(scriptContent);
    }
});

// 2. Build massive 1200+ word HTML content for <main>
const massiveContent = `
    <!-- ====== Stunning Premium Hero Section ====== -->
    <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center min-h-[90vh]">
      <!-- Animated Background Effects -->
      <div class="absolute inset-0 z-0 bg-[#020617]">
        <img src="assets/images/gen/baytown-hero.jpg" alt="Texas City TX Insulation" class="w-full h-full object-cover object-center opacity-30 mix-blend-overlay" />
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
              Top-Rated Insulation Experts in Texas City, TX
            </h1>
            <p class="text-xl md:text-2xl font-semibold text-white/80 mb-8 border-l-4 border-primary pl-4">
              Defend your home against extreme coastal weather and industrial environments.
            </p>
            <p class="text-lg text-white/60 mb-10 leading-relaxed max-w-xl">
              Homeowners in Texas City trust us to deliver flawless, high-performance insulation upgrades. From battling the relentless Gulf Coast humidity to protecting your home against the harsh elements of Galveston Bay, our advanced insulation solutions provide a permanent thermal barrier. Whether you need a massive attic overhaul or precision air sealing, we guarantee a cooler home, vastly improved indoor air quality, and permanently lower energy bills.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="tel:(409) 316-9957" class="group relative inline-flex items-center justify-center gap-3 h-14 px-8 rounded-full font-bold text-lg text-white bg-gradient-to-r from-primary to-blue-600 shadow-[0_8px_30px_rgba(14,165,233,0.4)] hover:shadow-[0_12px_40px_rgba(14,165,233,0.6)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div class="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <svg class="w-6 h-6 shrink-0 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="relative z-10">Call (409) 316-9957</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Long Form Article Section -->
    <section class="py-24 bg-background relative overflow-hidden">
      <div class="container mx-auto px-6 max-w-5xl">
      
        <!-- Article Block 1 -->
        <div class="mb-20">
            <h2 class="text-4xl font-bold text-foreground mb-6">The Unique Climate Challenges of Texas City and Galveston Bay</h2>
            <div class="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
                <p>Living in Texas City means enjoying the breathtaking beauty of Galveston Bay, the world-famous Texas City Dike, and the sprawling coastal prairies. However, it also means subjecting your home to some of the most brutal weather conditions in the country. For nearly nine months of the year, your air conditioning system is forced to battle intense radiant heat and crushing coastal humidity. Without a flawless thermal barrier, that expensive conditioned air simply leaks out through your attic and walls, forcing your HVAC unit into overdrive and skyrocketing your energy bills month after month.</p>
                <p>Texas City sits at an elevation of barely 10 feet above sea level, surrounded by the waters of Galveston Bay, Moses Lake, and various saltwater marshes. This unique geography means that extreme moisture is a constant threat to residential structures. When warm, humid outdoor air infiltrates your home and meets the cool, air-conditioned drywall of your ceiling, condensation forms instantly. Over time, this hidden moisture bypass leads to toxic mold growth, structural wood rot, and compromised indoor air quality. Our advanced air-sealing and vapor barrier techniques stop this thermal bypass dead in its tracks, keeping your attic bone-dry and your indoor air pristine.</p>
                <p>We don't just add pink fluff to your attic; we engineer a comprehensive thermal envelope designed specifically for the Texas City coastal climate. By analyzing the unique ventilation needs of Gulf Coast homes, we ensure that your property breathes correctly while maintaining maximum thermal resistance against the harsh summer sun.</p>
            </div>
        </div>
        
        <!-- Article Block 2 -->
        <div class="mb-20 grid lg:grid-cols-2 gap-12 items-center">
            <div class="order-2 lg:order-1 relative rounded-3xl overflow-hidden shadow-2xl">
                <img src="assets/images/gen/electricians-wearing-safety-gear-work-on-power-l-9e553efe.webp" alt="Energy Efficiency" class="w-full h-full object-cover">
            </div>
            <div class="order-1 lg:order-2">
                <h2 class="text-3xl font-bold text-foreground mb-6">Energy Efficiency in "The City That Would Not Die"</h2>
                <div class="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
                    <p>Texas City is proudly known as "The City That Would Not Die," a testament to its incredible resilience following the 1947 disaster and numerous powerful Gulf Coast hurricanes. Its residents are exceptionally resilient, and their homes should be too. A poorly insulated home is completely vulnerable to the extreme temperature swings and severe weather events typical of the upper Texas Gulf Coast.</p>
                    <p>By upgrading your attic and wall insulation, you instantly transform your home's energy profile and structural resilience. Our premium materials block radiant heat transfer, seal microscopic air leaks, and prevent dangerous moisture buildup. The result is a home that stays perfectly cool in the sweltering heat of August, requires significantly less HVAC maintenance, and provides superior comfort for your family.</p>
                    <p>Furthermore, with the rapidly rising costs of electricity in Texas, a premium insulation upgrade is one of the only home improvements that actively pays for itself. Most Texas City homeowners see a massive 20% to 30% reduction in their monthly cooling costs immediately after installation. Over the lifespan of your home, this equates to thousands of dollars in pure savings.</p>
                </div>
            </div>
        </div>

        <!-- Article Block 3 -->
        <div class="mb-20">
            <h2 class="text-4xl font-bold text-foreground mb-6">Air Quality & Industrial Proximity</h2>
            <div class="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
                <p>As a major deepwater port and one of the largest petroleum refining centers in the United States, Texas City is an undisputed industrial powerhouse. The Texas City Industrial Complex is home to massive facilities operated by Marathon, BP, and numerous other petrochemical giants. While this immense industrial infrastructure drives the local economy and provides thousands of jobs, living near a massive petrochemical complex means that indoor air quality must be an absolute priority for local homeowners.</p>
                <p>Microscopic airborne pollutants, industrial exhaust, dust, and particulate matter can easily infiltrate a drafty home through thousands of tiny, invisible cracks in the attic, walls, and foundation. If your home relies on outdated fiberglass batting with poor air sealing, your HVAC system acts like a vacuum, pulling these outdoor pollutants directly into your living space.</p>
                <p>This is where our advanced insulation and professional air sealing services become critical. By creating a completely airtight seal around your home’s envelope—particularly through the application of closed-cell spray foam or dense-packed cellulose—we physically prevent outdoor pollutants from entering your home. This creates a highly controlled, purified indoor environment that protects your family's respiratory health. For anyone living near the Texas City industrial sector or the port, professional air sealing is not a luxury; it is a vital health and safety upgrade.</p>
            </div>
        </div>

        <!-- Article Block 4 -->
        <div class="mb-20 bg-card/50 backdrop-blur-lg border border-border p-10 rounded-3xl shadow-xl">
            <h2 class="text-3xl font-bold text-foreground mb-6">Protecting Your Investment from Hurricane Storm Surges</h2>
            <div class="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
                <p>Texas City has a long, documented history of battling powerful storms, from the catastrophic 1900 hurricane to the massive storm surge of Hurricane Ike in 2008. While the city's impressive 17-mile-long levee system, towering pump stations, and the famous 5-mile Texas City Dike provide incredible municipal protection against Gulf surges, homeowners must still take proactive steps to prepare their individual properties for high winds and driving rain.</p>
                <p>Closed-cell spray foam insulation is a revolutionary game-changer for coastal homes. Unlike traditional fiberglass batting—which completely loses its insulation value when wet and acts like a massive sponge for toxic mold—closed-cell foam is 100% waterproof and water-resistant. More importantly, when applied to your roof deck and interior walls, closed-cell spray foam acts as a high-strength structural adhesive. It essentially "glues" your home together, dramatically increasing the sheer strength of your walls and making your roof significantly more resistant to catastrophic uplift from hurricane-force winds.</p>
                <p>If your home is ever subjected to flooding or severe roof leaks during a major tropical storm, closed-cell foam will not absorb the water. It will not breed mold, and it will not need to be ripped out and replaced. By investing in closed-cell spray foam today, you are potentially saving yourself tens of thousands of dollars in post-storm remediation costs tomorrow.</p>
            </div>
        </div>
        
        <!-- Article Block 5 -->
        <div class="mb-20">
            <h2 class="text-4xl font-bold text-foreground mb-8">Comprehensive Services Available in Texas City</h2>
            <p class="text-xl text-muted-foreground mb-10">From historic 1940s builds to brand-new coastal construction, we provide cutting-edge solutions tailored to the exact specifications of your Texas City property.</p>
            
            <div class="grid md:grid-cols-2 gap-8">
                <div class="bg-card/80 border border-border p-8 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all">
                    <h3 class="text-2xl font-bold text-foreground mb-4">Premium Attic Insulation</h3>
                    <p class="text-muted-foreground text-lg">The attic is where you lose up to 40% of your home's energy. We install extremely thick, high R-value fiberglass and premium cellulose materials to stop radiant heat dead in its tracks. A properly insulated attic is the fastest way to lower your energy bills.</p>
                </div>
                <div class="bg-card/80 border border-border p-8 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all">
                    <h3 class="text-2xl font-bold text-foreground mb-4">Advanced Blown-In Solutions</h3>
                    <p class="text-muted-foreground text-lg">Perfect for irregular attic spaces, low-clearance roofs, and older home retrofits. We use powerful commercial pneumatic blowers to create a dense, gap-free thermal blanket across your entire ceiling, ensuring maximum coverage even in the tightest corners.</p>
                </div>
                <div class="bg-card/80 border border-border p-8 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all">
                    <h3 class="text-2xl font-bold text-foreground mb-4">Airtight Spray Foam</h3>
                    <p class="text-muted-foreground text-lg">The absolute ultimate defense for coastal living. Closed-cell spray foam provides unmatched R-value while simultaneously sealing every microscopic crack against humidity, pests, and industrial pollutants. It is the gold standard for Texas City homes.</p>
                </div>
                <div class="bg-card/80 border border-border p-8 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all">
                    <h3 class="text-2xl font-bold text-foreground mb-4">Precision Air Sealing</h3>
                    <p class="text-muted-foreground text-lg">Insulation is only half the battle. We utilize advanced thermal imaging and blower door testing technology to identify and seal hidden air leaks around recessed lighting, plumbing stacks, windows, and leaky HVAC ducts.</p>
                </div>
            </div>
        </div>

        <!-- Article Block 6 -->
        <div class="mb-10 text-center max-w-4xl mx-auto">
            <h2 class="text-4xl font-bold text-foreground mb-6">Why Choose Us for Your Texas City Home?</h2>
            <div class="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
                <p>We deeply understand the unique architectural demands of the Texas Gulf Coast. Our installation crews are highly trained, fully licensed, and equipped with state-of-the-art commercial machinery. We do not believe in high-pressure sales tactics, hidden fees, or cutting corners. Instead, we offer 100% transparent pricing, industry-leading lifetime warranties, and flawless execution on every single job.</p>
                <p>When you choose us for your Texas City insulation project, you are choosing a local partner dedicated to your family's comfort, respiratory health, and long-term financial savings. Let us help you fortify your home against the brutal Texas heat, the suffocating coastal humidity, and the rising costs of electricity.</p>
                <div class="mt-10">
                    <a href="contact" class="inline-flex items-center justify-center h-16 px-10 rounded-full font-bold text-xl text-white bg-gradient-to-r from-primary to-blue-600 shadow-[0_8px_30px_rgba(14,165,233,0.4)] hover:shadow-[0_12px_40px_rgba(14,165,233,0.6)] hover:-translate-y-1 transition-all duration-300">
                        Schedule Your Free Energy Assessment Today
                    </a>
                </div>
            </div>
        </div>

      </div>
    </section>
`;

$('main').html(massiveContent);

fs.writeFileSync(targetFile, $.html(), 'utf8');
console.log('Successfully generated insulation-texas-city.html with 1200+ words of rich content.');
