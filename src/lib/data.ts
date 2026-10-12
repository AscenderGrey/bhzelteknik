// Content data (services, projects, founders, FAQ). Facts only — anything
// unverified belongs in TODO.md, not here.

export type Faq = { q: string; a: string };
export type Photo = { src: string; alt: string; caption: string; w: number; h: number };

const img = (name: string, w: number, h: number, alt: string, caption: string): Photo => ({
  src: `/img/work/${name}.jpg`, w, h, alt, caption,
});

export const photos = {
  trappa: img("trappa-led", 1080, 1080, "LED-belysning under trappsteg i en bostad i Stockholm", "LED-belysning i trappa – bostad"),
  tak: img("tak-led", 1080, 809, "Indirekt LED-belysning i takfris i ett vardagsrum", "Indirekt LED i takfris – bostad"),
  entre: img("entre-kvall", 805, 537, "Entré och gång med fasad- och markbelysning en kväll, villa i Stockholm", "Entré- och markbelysning – villa"),
  tradgard: img("tradgard-gang", 805, 536, "Trädgårdsgång med uppljusta buskar och pollare på kvällen", "Trädgårdsbelysning längs gång – villa"),
  altan: img("altan-belysning", 1080, 1080, "Vägglampor monterade på plank vid altan med solstolar", "Utebelysning på altan och plank"),
  kok: img("kok", 1080, 608, "Ljust kök med infällda spotlights och pendellampor över köksön", "Spotlights och pendlar i kök – bostad"),
  trappaVit: img("trappa-vit", 266, 465, "Svängd trappa med LED-ljus i varje steg", "LED i trappsteg – bostad"),
  nisch: img("nisch-belysning", 265, 465, "Inbyggd hylla med belysning i varje nisch", "Belysta hyllnischer – bostad"),
  matsal: img("matsal", 1080, 536, "Matsal med pendlar över långbord och infällda spotlights", "Belysning i matsal – bostad"),
  vardagsrum: img("vardagsrum", 1080, 537, "Vardagsrum på kvällen med taklampa och belysta fönsternischer", "Vardagsrum på kvällen – bostad"),
  dusch: img("dusch-marmor", 528, 519, "Marmordusch med infälld LED-list i taket", "LED-list i marmordusch – badrum"),
  sovrum: img("sovrum-vagglampor", 528, 554, "Två klotformade vägglampor kring en rund spegel", "Vägglampor vid spegel – bostad"),
  badrum: img("badrum-spegel", 268, 465, "Badrum med spotlights och belysning ovanför spegeln", "Spotlights och spegelljus – badrum"),
  reception: img("reception-rgb", 983, 1080, "Receptionsdisk med RGB-belyst front i ett kontor", "RGB-belyst receptionsdisk – kontor"),
  butik: img("butik-belysning", 1080, 827, "Butikslokal med spotlights och belysta väggnischer", "Butiksbelysning – klädbutik"),
  central: img("elcentral-1", 720, 960, "Stora elcentraler under installation med inkopplade kablar", "Elcentraler under installation"),
  lidingo: img("elcentral-lidingo", 720, 960, "Nya elcentraler och kabelbuntar inför inkoppling på Lidingö", "Elcentraler inför inkoppling – Lidingö"),
} satisfies Record<string, Photo>;

export const projectGroups: { name: string; items: Photo[] }[] = [
  { name: "Bostad", items: [photos.trappa, photos.entre, photos.tak, photos.kok, photos.matsal, photos.tradgard, photos.dusch, photos.sovrum] },
  { name: "Kommersiellt", items: [photos.reception, photos.butik] },
  { name: "Elcentraler", items: [photos.lidingo, photos.central] },
];

export type Founder = {
  slug: string;
  letter: "B" | "H" | "Z";
  name: string;
  title: string;
  mobileDisplay: string;
  mobileHref: string;
  email: string;
  /** Set to "/img/team/{slug}.jpg" once a headshot exists — the tile becomes a badge. */
  photo?: string;
};

export const founders: Founder[] = [
  { slug: "stefan-blidborg", letter: "B", name: "Stefan Blidborg", title: "Grundare & delägare", mobileDisplay: "070-754 76 04", mobileHref: "tel:+46707547604", email: "stefan@bhzelteknik.se" },
  { slug: "mattias-heden", letter: "H", name: "Mattias Hedén", title: "Grundare & delägare", mobileDisplay: "070-754 76 03", mobileHref: "tel:+46707547603", email: "mattias@bhzelteknik.se" },
  { slug: "magnus-zakrisson", letter: "Z", name: "Magnus Zakrisson", title: "Grundare & delägare", mobileDisplay: "070-754 76 02", mobileHref: "tel:+46707547602", email: "magnus@bhzelteknik.se" },
];

export const areas = ["Hägersten", "Liljeholmen", "Västertorp", "Älvsjö", "Bromma", "Södermalm", "Stockholm"];

export const quoteOptions = {
  services: ["Elinstallation", "Belysning", "KNX/smart hem", "Data/nätverk", "Säkerhet/larm", "Elcentral/byte", "Service/felsökning", "Annat"],
  propertyTypes: ["Villa", "Lägenhet", "BRF", "Företag", "Butik/restaurang"],
  areas: [...areas, "Annan"],
  timings: ["Så snart som möjligt", "Inom 1–3 månader", "Längre fram", "Vill bara ha en uppskattning"],
};

export type Service = {
  slug: string;
  /** pre-selected option in the quote form */
  quoteKey: string;
  name: string;
  metaDescription: string;
  short: string;
  intro: string;
  includes: string[];
  forWho: string[];
  rot: boolean;
  image?: Photo;
  gallery: Photo[];
  explainer?: { title: string; steps: { h: string; p: string }[] };
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: "elinstallation",
    quoteKey: "Elinstallation",
    name: "Elinstallation & service",
    metaDescription:
      "Elinstallationer i Stockholm sedan 2005: kraft, uttag, belysning, elcentraler, service och felsökning. Egen projektering och konstruktion. BHZ Elteknik, Hägersten.",
    short: "Kraft, uttag, elcentraler, service och felsökning – med egen projektering.",
    intro:
      "Vi gör alla typer av elinstallationer – från en ny grupp i köket till el i hela fastigheter. Eftersom vi projekterar och konstruerar elsystemen själva hänger planering och utförande ihop, och du har samma personer att prata med hela vägen.",
    includes: [
      "Nyinstallation vid nybygge, ombyggnad och renovering",
      "Kraftinstallationer, uttag och strömbrytare",
      "Byte och uppgradering av elcentraler",
      "Projektering och konstruktion av elsystem",
      "Service, felsökning och åtgärder i befintliga anläggningar",
    ],
    forWho: ["Villaägare", "Lägenheter & BRF", "Företag", "Fastighetsägare"],
    rot: true,
    image: photos.central,
    gallery: [photos.lidingo, photos.central, photos.kok],
    faqs: [
      { q: "Projekterar ni själva?", a: "Ja. Vi gör egen projektering och konstruktion av elsystem, vilket betyder att samma företag planerar och utför installationen." },
      { q: "Byter ni elcentraler?", a: "Ja, vi byter och uppgraderar elcentraler, både i bostäder och i större fastigheter. Berätta om din anläggning så återkommer vi med ett förslag." },
      { q: "Kan ni hjälpa till med felsökning?", a: "Ja, vi gör service och felsökning. Beskriv felet så gott du kan när du hör av dig – då kan vi förbereda oss bättre inför besöket." },
    ],
  },
  {
    slug: "belysning",
    quoteKey: "Belysning",
    name: "Belysning & ljusdesign",
    metaDescription:
      "Belysning i Stockholm: LED i trappor och tak, spotlights, utebelysning och butiksbelysning. Vi planerar ljuset och installerar det. BHZ Elteknik sedan 2005.",
    short: "LED i trappor och tak, spotlights, ute- och butiksbelysning.",
    intro:
      "Rätt ljus förändrar ett rum mer än nästan något annat. Vi hjälper dig att planera var ljuset ska sitta och installerar allt – från LED i trappsteg och indirekt ljus i takfrisen till belysning av entré, trädgård och butikslokaler.",
    includes: [
      "Planering av belysning tillsammans med dig",
      "LED-belysning i trappor, nischer och takfriser",
      "Spotlights, pendlar och vägglampor",
      "Ute-, entré- och trädgårdsbelysning",
      "Belysning för butiker, kontor och receptioner",
    ],
    forWho: ["Villaägare", "Lägenheter", "Butiker", "Kontor"],
    rot: true,
    image: photos.tak,
    gallery: [photos.trappa, photos.entre, photos.matsal, photos.butik],
    faqs: [
      { q: "Kan ni hjälpa till att planera belysningen?", a: "Ja. Vi går igenom hur rummen används och var ljuset gör mest nytta, och föreslår en lösning innan vi installerar." },
      { q: "Gör ni utebelysning?", a: "Ja, till exempel entré-, fasad-, trädgårds- och altanbelysning. Flera exempel finns bland våra projekt." },
      { q: "Gäller ROT-avdrag för belysning?", a: "ROT-avdraget gäller arbetskostnaden för elarbete i din bostad, inte för materialet. Vi går igenom vad som gäller för just ditt jobb i offerten." },
    ],
  },
  {
    slug: "knx",
    quoteKey: "KNX/smart hem",
    name: "KNX & smarta hem",
    metaDescription:
      "KNX i Stockholm: vi projekterar och programmerar kompletta KNX-installationer för ljus, värme och styrning i hem och fastigheter. BHZ Elteknik, Hägersten.",
    short: "Vi projekterar och programmerar kompletta KNX-installationer.",
    intro:
      "KNX är en öppen standard för att styra belysning, värme, ventilation, persienner och mycket mer i en byggnad – från ett gemensamt system. Vi tar hand om hela kedjan: vi projekterar installationen, drar och kopplar in den, och programmerar den så att huset fungerar som du vill.",
    includes: [
      "Projektering av kompletta KNX-installationer",
      "Programmering av KNX-system",
      "Styrning av belysning, scener och dimring",
      "Installation och inkoppling av hela anläggningen",
    ],
    forWho: ["Villaägare", "Nybygge & totalrenovering", "Företag", "Fastighetsägare"],
    rot: true,
    gallery: [],
    explainer: {
      title: "Så fungerar KNX – på vanlig svenska",
      steps: [
        { h: "Givare", p: "Brytare, rörelsevakter, termostater och sensorer känner av vad som händer och skickar signaler." },
        { h: "Bussen", p: "En gemensam styrkabel kopplar ihop alla delar i huset, så att de kan prata med varandra." },
        { h: "Ställdon", p: "Ställdonen i elcentralen tänder, dimrar och styr – precis som programmeringen säger." },
      ],
    },
    faqs: [
      { q: "Vad är skillnaden mot vanliga smarta lampor?", a: "KNX är en trådbunden standard som byggs in i elinstallationen. Systemet är inte beroende av en enskild app eller tillverkare, och det kan byggas ut över tid." },
      { q: "Vad betyder projektering och programmering?", a: "Projektering är planen: vad som ska styras, var givare och ställdon sitter och hur allt kopplas. Programmering är när vi ställer in systemet så att varje knapp, scen och funktion gör det den ska." },
      { q: "Passar KNX bara i nybygge?", a: "Det är enklast vid nybygge eller större renovering, eftersom styrkabeln dras tillsammans med övrig el. Berätta om ditt projekt så säger vi vad som är rimligt." },
    ],
  },
  {
    slug: "data-tele-tv",
    quoteKey: "Data/nätverk",
    name: "Data, tele & tv",
    metaDescription:
      "Installation av data, tele och tv i Stockholm: nätverksuttag, kabeldragning och uttag i bostäder och lokaler. BHZ Elteknik i Hägersten sedan 2005.",
    short: "Nätverk, kabeldragning samt tele- och tv-uttag i hem och lokaler.",
    intro:
      "Ett stabilt nätverk börjar med kablarna. Vi installerar data, tele och tv i bostäder, kontor och fastigheter – och samordnar det med övrig el så att allt hamnar rätt från början.",
    includes: [
      "Installation av datanät och nätverksuttag",
      "Tele- och tv-uttag",
      "Kabeldragning i bostäder, kontor och fastigheter",
      "Samordning med övrig elinstallation",
    ],
    forWho: ["Villaägare", "Lägenheter & BRF", "Kontor", "Fastighetsägare"],
    rot: true,
    image: photos.lidingo,
    gallery: [photos.lidingo, photos.central],
    faqs: [
      { q: "Kan ni dra nätverk till flera rum?", a: "Ja. Vi installerar nätverksuttag där du behöver dem och drar kablarna så snyggt som möjligt för just din bostad eller lokal." },
      { q: "Gör ni installationer i kontor och lokaler?", a: "Ja, vi arbetar både med bostäder och med företag och fastigheter." },
      { q: "Kan det göras samtidigt som annan el?", a: "Gärna. Det blir oftast både enklare och billigare när data, tele och el planeras tillsammans." },
    ],
  },
  {
    slug: "sakerhet-larm",
    quoteKey: "Säkerhet/larm",
    name: "Säkerhet & larm",
    metaDescription:
      "Säkerhetsinstallationer i Stockholm: installation och kabeldragning för säkerhets- och larmsystem i hem och lokaler. BHZ Elteknik, Hägersten, sedan 2005.",
    short: "Installationer för säkerhet och larm, samordnat med övrig el.",
    intro:
      "Säkerhet är en av de installationer vi gör, i både bostäder och lokaler. Vi planerar installationen tillsammans med dig och samordnar den med övrig el, så att allt fungerar ihop.",
    includes: [
      "Installation av säkerhetssystem",
      "Kabeldragning och inkoppling",
      "Samordning med el, data och belysning",
    ],
    forWho: ["Villaägare", "Företag", "Butiker", "Fastighetsägare"],
    rot: false,
    gallery: [],
    faqs: [
      { q: "Vilka typer av säkerhetsinstallationer gör ni?", a: "Hör av dig och berätta vad du behöver, så säger vi direkt om det är något vi kan hjälpa dig med." },
      { q: "Kan säkerheten kombineras med KNX?", a: "Säkerhetsfunktioner kan ofta samordnas med styrning av belysning och övrig el. Vi går igenom möjligheterna för ditt projekt." },
      { q: "Arbetar ni med både hem och företag?", a: "Ja, vi gör installationer i bostäder såväl som i lokaler och fastigheter." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const homeFaqs: Faq[] = [
  { q: "Kan jag få ROT-avdrag för elarbete?", a: "Ja, som privatperson kan du få ROT-avdrag för arbetskostnaden när vi gör elarbete i din bostad. Avdraget gäller arbetet, inte materialet. Vi visar vad som gäller i offerten." },
  { q: "Tar ni mindre jobb också?", a: "Hör av dig och berätta vad det gäller. Vi gör både större installationer och service, och säger direkt om det är något vi kan hjälpa dig med." },
  { q: "Vad är KNX och varför välja det?", a: "KNX är en öppen standard för att styra belysning, värme och annat i en byggnad från ett gemensamt system. Vi både projekterar och programmerar kompletta KNX-installationer – läs mer på vår KNX-sida." },
  { q: "Vilka områden jobbar ni i?", a: "Vi utgår från vårt kontor och lager i Hägersten och jobbar i Stockholm, till exempel Hägersten, Liljeholmen, Västertorp, Älvsjö, Bromma och Södermalm." },
  { q: "Hur snabbt kan ni komma ut?", a: "Det beror på hur mycket vi har inbokat just då. Ring kontoret eller skicka en förfrågan så får du ett ärligt besked om när vi kan komma." },
];
