import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { 
  ArrowLeft, 
  Download, 
  Play, 
  Image as ImageIcon, 
  FileText, 
  Map,
  Users,
  Target,
  Film,
  Calendar,
  X,
  ExternalLink
} from 'lucide-react';

// Project subpages data
const subpages = [
  {
    id: 'overview',
    title: 'Přehled projektu',
    icon: Target,
    color: 'blue',
  },
  {
    id: 'interventions',
    title: 'Typy intervencí',
    icon: Map,
    color: 'green',
  },
  {
    id: 'timeline',
    title: 'Časový plán',
    icon: Calendar,
    color: 'orange',
  },
  {
    id: 'methodology',
    title: 'Metodologie',
    icon: Users,
    color: 'purple',
  },
  {
    id: 'outputs',
    title: 'Výstupy',
    icon: Film,
    color: 'red',
  },
  {
    id: 'gallery',
    title: 'Galerie',
    icon: ImageIcon,
    color: 'pink',
  },
];

function ProjectPage() {
  const { subpage } = useParams();
  const currentSubpage = subpage || 'overview';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white shadow-lg sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!isScrolled && (
            <Link
              to="/"
              className="inline-flex items-center text-white hover:text-gray-100 mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Zpět domů
            </Link>
          )}
          
          <div className="flex items-center justify-between">
            <div className={`transition-all duration-300 ${isScrolled ? 'flex items-center gap-4' : ''}`}>
              {isScrolled ? (
                <>
                  <Link to="/" className="hover:text-gray-100 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                  <div>
                    <h1 className="text-xl font-bold">🎨 Guerillové intervence</h1>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-4xl font-bold mb-2">🎨 Guerillové intervence</h1>
                  <p className="text-xl text-gray-100">ve veřejném prostoru</p>
                  <p className="text-sm text-gray-200 mt-2">Palmovka, Praha | Autorský projekt | Martin Tomek</p>
                </>
              )}
            </div>
            <a
              href="/palmovka_project_proposal.pdf"
              download
              className={`flex items-center gap-2 bg-white text-teal-600 rounded-lg font-medium hover:bg-gray-100 transition-all shadow-lg ${isScrolled ? 'px-3 py-2 text-sm' : 'px-6 py-3'}`}
            >
              <Download className={`${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
              {!isScrolled && 'Stáhnout PDF'}
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subpage Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {subpages.map((page) => {
            const Icon = page.icon;
            const isActive = currentSubpage === page.id;
            return (
              <Link
                key={page.id}
                to={`/project/${page.id}`}
                className={`
                  p-4 rounded-xl border-2 transition-all hover:scale-105 hover:shadow-lg
                  ${isActive 
                    ? 'bg-gradient-to-br from-teal-500 to-cyan-500 text-white border-teal-600 shadow-lg' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-teal-400'
                  }
                `}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${isActive ? 'text-white' : 'text-teal-600'}`} />
                <p className="text-center text-sm font-medium">{page.title}</p>
              </Link>
            );
          })}
        </div>

        {/* Content based on subpage */}
        {currentSubpage === 'overview' && <OverviewPage />}
        {currentSubpage === 'interventions' && <InterventionsPage />}
        {currentSubpage === 'methodology' && <MethodologyPage />}
        {currentSubpage === 'outputs' && <OutputsPage />}
        {currentSubpage === 'timeline' && <TimelinePage />}
        {currentSubpage === 'gallery' && <GalleryPage officialProjects={officialProjects} guerillaArt={guerillaArt} />}
      </div>
    </div>
  );
}

// Subpage Components

function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Video Documentation */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🎬 Video dokumentace projektu</h2>
        <div className="aspect-video rounded-xl overflow-hidden bg-black mb-4">
          <iframe
            width="100%"
            height="100%"
            src="https://youtube.com/embed/AKgS2maI94k"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Slunečnice na Palmovce</h3>
            <p className="text-sm text-gray-600">První realizovaná intervence - guerillová výsadba květin</p>
          </div>
          <a
            href="https://youtu.be/AKgS2maI94k"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            YouTube
          </a>
        </div>
      </div>

      {/* Team */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">👥 Tým projektu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-5 border-2 border-teal-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🎬</span>
              <div>
                <h3 className="font-bold text-gray-900">Martin Tomek</h3>
                <p className="text-sm text-teal-700 font-medium">Režisér, autor projektu</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🎥</span>
              <div>
                <h3 className="font-bold text-gray-900">Jiří Kejkula</h3>
                <p className="text-sm text-blue-700 font-medium">Produkce</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-5 border-2 border-yellow-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🍌</span>
              <div>
                <h3 className="font-bold text-gray-900">Tomáš Vrána</h3>
                <p className="text-sm text-yellow-700 font-medium">Spolupracující umělec</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🎮</span>
              <div>
                <h3 className="font-bold text-gray-900">Michal Tancjura</h3>
                <p className="text-sm text-purple-700 font-medium">Spolupracující umělec - Game Design FAMU</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Research Resources */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Výzkumné podklady</h2>
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border-2 border-indigo-200">
          <div className="flex items-start gap-4">
            <div className="text-4xl">📄</div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">Sociologicko-antropologický výzkum žitého prostoru v lokalitě Palmovka</h3>
              <p className="text-gray-700 mb-4">
                Souhrnná zpráva z antropologického výzkumu Palmovky (Praha 8) - klíčový podklad pro metodologii projektu.
              </p>
              <a
                href="https://m.praha8.cz/file/GbS/Souhrnna-zprava-Sociologicko-antropologicky-vyzkum-ziteho-prost%20oru-v-lokalite-Palmovka.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Stáhnout PDF zprávu
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Grants & Funding */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">💰 Financování projektu</h2>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
          <div className="flex items-start gap-4">
            <div className="text-4xl">📋</div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">Granty Praha 8 - Kultura 2025</h3>
              <p className="text-gray-700 mb-3">
                Grantový program pro kulturní a komunitní projekty na území Prahy 8.
              </p>
              <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                <p className="text-sm font-bold text-yellow-900">⚠️ Deadline: Do konce roku 2025</p>
              </div>
              <a
                href="https://www.praha8.cz/Granty-Kultura-2025"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Více informací o grantech
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
          <h3 className="font-bold text-lg text-blue-900 mb-2">🎯 Cíl</h3>
          <p className="text-gray-700">Oživit zanedbaná místa Palmovky pomocí participativního umění a mikro-intervencí</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border-2 border-green-200">
          <h3 className="font-bold text-lg text-green-900 mb-2">⏱️ Délka</h3>
          <p className="text-gray-700">2 roky průběžných intervencí s dokumentací celého procesu</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
          <h3 className="font-bold text-lg text-purple-900 mb-2">💰 Rozpočet</h3>
          <p className="text-gray-700">~20 000 Kč (materiál, film, technika)</p>
        </div>
      </div>
    </div>
  );
}

function InterventionsPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  // ESC key handler to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedProject]);

  const officialProjects = [
    {
      title: 'Betonové banány - lavičky',
      subtitle: 'Mobiliář',
      icon: '🍌',
      color: 'yellow',
      description: 'Série betonových laviček ve tvaru banánů. Funkční urbánní mobiliář s hravým designem.',
      artist: 'Martin Tomek',
      status: 'V plánu',
      details: ['Recyklovaný beton', 'Veřejné sedání', 'Palmovka branding'],
      fullDescription: 'Inspirováno projektem "Banány pro Palmovku" - vytvoření série betonových laviček ve tvaru banánů jako funkčního urbánního mobiliáře. Každá lavička bude mít personalizovanou "etiketu" s názvem Palmovka.\n\nČasový harmonogram:\n• **Zima 2025** (leden-březen) - Návrh, výroba formy, postupné odlévání\n• **Jaro-Léto 2026** - Instalace a uvedení do provozu\n\nBeton lze pracovat i v zimě (vnitřní prostory), instalace ideálně v teplém počasí.',
      materials: ['Rychletuhnoucí beton (12x 25kg)', 'Forma na odlévání', 'Pletivo pro výztuž', 'Nátěr/barva', 'Montážní materiál'],
      budget: '~3000 Kč na 1 lavičku',
      timeline: 'Zima 2025 (výroba) → Jaro-Léto 2026 (instalace)',
      location: 'Křižovatka před KB, okolí Palmovky',
      images: [],
    },
    {
      title: 'Slunečnice na Palmovce',
      subtitle: 'Mobiliář + Výsadba',
      icon: '🌻',
      color: 'green',
      description: 'Guerillová výsadba slunečnic a květin v zanedbaných betonových prostorech',
      artist: 'Martin Tomek',
      status: 'Realizováno',
      details: ['Komunitní spoluúčast', 'Oživení prostoru', 'Sezónní instalace'],
      fullDescription: 'Celoroční projekt výsadby slunečnic v zanedbaných betonových plochách Palmovky. Od předpěstování až po rozkvetlou slunečnici - kompletní cyklus.\n\nČasový plán:\n• **Březen 2025** - Předsadba na balkoně (hlína + sazenice)\n• **Duben 2025** - Přesadba do větších květináčů (10l)\n• **Duben-Květen 2025** - Sadba ven do Palmovky\n• **Léto 2025** - Péče, zalívání, hnojení\n• **Konec léta** - Hnojení na květ\n• **Podzim 2026** - Finální výsledek: rozkvetlé slunečnice!\n\nProjekt spojuje estetiku s komunitní aktivitou a přináší zeleň do šedého prostoru.',
      materials: ['Semena/sazenice slunečnic', 'Hlína (substrátu)', 'Květináče 10l', 'Hnojivo', 'Zalévačky', 'Nářadí na výsadbu'],
      budget: '~800 Kč (sazenice, hlína, květináče, hnojivo)',
      timeline: 'Celoroční projekt: Březen 2025 - Podzim 2026',
      location: 'Betonové plochy kolem Palmovky',
      images: [
        {
          original: import.meta.env.BASE_URL + 'projects/slunecnice/IMG_4417.jpeg',
          thumbnail: import.meta.env.BASE_URL + 'projects/slunecnice/IMG_4417.jpeg',
          description: 'Slunečnice na Palmovce - výsadba',
        },
        {
          original: import.meta.env.BASE_URL + 'projects/slunecnice/IMG_4421.jpeg',
          thumbnail: import.meta.env.BASE_URL + 'projects/slunecnice/IMG_4421.jpeg',
          description: 'Slunečnice rostou v betonovém prostoru',
        },
        {
          original: import.meta.env.BASE_URL + 'projects/slunecnice/IMG_4702.jpeg',
          thumbnail: import.meta.env.BASE_URL + 'projects/slunecnice/IMG_4702.jpeg',
          description: 'Rozkvetlé slunečnice na Palmovce',
        },
      ],
    },
    {
      title: 'Hlasovací popelníky',
      subtitle: 'Interaktivní mobiliář',
      icon: '🗳️',
      color: 'red',
      description: 'Experiment s veřejným zapojením skrze herní mechanismus "hlasování nedopalky"',
      artist: 'Martin Tomek',
      status: 'V plánu',
      details: ['Gamifikace', 'Zapojení komunity', 'Čistší prostor'],
      fullDescription: 'Interaktivní popelníky s hlasovacím mechanismem - lidé "hlasují" nedopalky do jedné ze dvou možností. Gamifikace motivuje k čistějšímu prostoru a poskytuje data o preferencích komunity.\n\nMetodologie výzkumu:\n1. Najít místo hodně znečištěné od nedopalků\n2. Vyčistit místo a dokumentovat (baseline)\n3. Počkat měsíc bez intervence\n4. Znovu vyčistit a počítat nedopalky\n5. Instalovat hlasovací popelník\n6. Sledovat:\n   • Volby lidí (jaké odpovědi vyhrávají)\n   • Míru znečištění místa (počet nedopalků mimo popelník)\n   • Zda intervence měla smysl (before/after data)\n\nČasový harmonogram:\n• **Zima 2025** (leden-březen) - Příprava, design, výroba\n• **Jarní klauzurní práce** - Prezentace projektu\n• **Jaro 2026** - Instalace a testování\n\nPopelník lze vyrábět i v zimě, instalace na jaře.',
      materials: ['Dřevo/kov pro konstrukci', 'Průhledný plexisklo', 'Popisky/otázky', 'Montážní materiál', 'Ochranný lak'],
      budget: '~1500 Kč na 1 popelník',
      timeline: 'Zima 2025 (příprava) → Jaro 2026 (instalace) → 2 měsíce testování',
      location: 'Frekventovaná místa s kuřáky na Palmovce',
      images: [
        {
          original: import.meta.env.BASE_URL + 'projects/hlasovaci-popelnik/design.jpeg',
          thumbnail: import.meta.env.BASE_URL + 'projects/hlasovaci-popelnik/design.jpeg',
          description: 'Design hlasovacího popelníku',
        },
      ],
    },
    {
      title: 'Parklety',
      subtitle: 'Mobiliář / Tactical Urbanism',
      icon: '🪑',
      color: 'orange',
      description: 'Dočasná přeměna parkovacích míst na prostor pro setkávání - kompletní obývací pokoj pod širým nebem',
      artist: 'Martin Tomek',
      status: 'V plánu',
      details: ['Dřevěné palety', 'Komunitní náměstí', 'Reversibilní', 'Obývák venku'],
      fullDescription: 'Přeměna parkovacího místa na dočasné komunitní náměstí pomocí recyklovaných dřevěných palet. Vytvoření kompletního obývacího pokoje ve veřejném prostoru - místo, kde předtím stálo pouze auto.\n\nKoncept: Vytvořit plnohodnotný obývák venku s lavičkami, stolkem, kobercem a květinami. Symbolické znovudobytí prostoru pro lidi místo aut.\n\nMobiliář:\n• **Lavičky z palet** - sedací prostor pro 4-6 lidí\n• **Stolek** - centrální bod, možnost na kávu/knihu\n• **Koberec** - definuje prostor, přidává domácí atmosféru\n• **Květináč s květinami** - přináší zeleň a život do betonu\n• **Polštáře** - komfort a barva\n\nCíl: Ukázat potenciál městského prostoru a vyvolat debatu o prioritách ve veřejném prostoru.\n\nČasový harmonogram:\n• **Jaro 2026** - Sběr palet, příprava materiálů\n• **Léto 2026** - Stavba a instalace parkletů\n• Ideální pro teplé počasí, kdy lidé tráví čas venku',
      materials: ['Dřevěné EURO palety (6-8 ks)', 'Venkovní koberec', 'Malý stolek', 'Polštáře/sedáky', 'Květináč + rostliny', 'Dekorace', 'Nářadí (šroubovák, bruska)'],
      budget: '~3000-4000 Kč (palety zdarma, materiály, rostliny)',
      timeline: 'Jaro-Léto 2026 (sběr palet, stavba, instalace)',
      location: 'Vybrané parkovací místo na Palmovce (viditelné, bezpečné)',
      images: [],
    },
    {
      title: 'Křídový Game Jam',
      subtitle: 'Interaktivní hra',
      icon: '🎮',
      color: 'purple',
      description: 'Spolupráce s Herní katedrou FAMU - venkovní interaktivní instalace a pouliční hry',
      artist: 'Martin Tomek + Game Design FAMU',
      status: 'V přípravě',
      details: ['Festival Closur', 'Mezioborová spolupráce', 'Hernost ve veřejném prostoru'],
      fullDescription: 'Mezioborová spolupráce s Katedrou herního designu FAMU. Jednodenní game jam zaměřený na tvorbu her a interaktivních instalací ve veřejném prostoru. Propojení herních principů s guerillovým uměním.',
      materials: ['Křídy různých barev', 'Interaktivní prvky', 'Dokumentační technika'],
      budget: '~1000 Kč',
      timeline: '1 den (game jam) + příprava + dokumentace',
      location: 'Palmovka, možná festival Closur',
      images: [],
      partner: 'Michal z Herního designu FAMU',
    },
    {
      title: 'Interaktivní kamerová hra',
      subtitle: 'Game Design x Veřejný prostor',
      icon: '🎮',
      color: 'purple',
      description: 'Spolupráce s game designem na vytvoření interaktivní hry s kamerou. Témata: internetová bezpečnost a veřejný prostor.',
      artist: 'Martin Tomek',
      status: 'V plánu',
      details: ['Computer vision', 'Interaktivní instalace', 'Edukace hrou'],
      fullDescription: 'Mezioborová spolupráce s Katedrou herního designu FAMU na vytvoření interaktivní hry využívající kameru a computer vision. Hra bude instalována ve veřejném prostoru a zaměří se na témata jako internetová bezpečnost, soukromí ve veřejném prostoru, nebo sledování a datová stopa. Herní mechaniky pomohou lidem zážitkově pochopit digitální témata v offline prostředí.',
      materials: ['Webkamera/tablet', 'Display/projekce', 'Počítač/Raspberry Pi', 'Software (Processing, Unity, web)', 'Ochranný kryt'],
      budget: '~5000 Kč (technika, výroba, instalace)',
      timeline: '2-3 měsíce (design, prototyping, testování, instalace)',
      location: 'Palmovka - frekventované místo, možná čekárna/zastávka',
      images: [],
      partner: 'Katedra herního designu FAMU',
    },
  ];

  const guerillaArt = [
    {
      title: 'Detournement - Boj s reklamou',
      subtitle: 'Guerilla Art / Reclaiming Public Space',
      icon: '🎭',
      color: 'pink',
      description: 'Přelepování nelegálních reklam uměleckými zásahy. Autorská reakce na vizuální smog a reclaiming public space.',
      artist: 'Ptáček',
      status: 'Probíhá',
      details: ['Subvertising', 'Kritické umění', 'Anonymní akce', 'Reclaiming space'],
      fullDescription: 'Systematická práce s reklamním prostorem na Palmovce jako forma kritického umění a "reclaiming public space".\n\nMetodologie:\n\n1. **Mapping nelegálních reklam** - Kompletní kontrola Palmovky a identifikace všech nelegálních reklam (bez povolení)\n\n2. **Odstranění nelegálních reklam** - 100% odstranění identifikovaných nelegálních reklam (legální akce)\n\n3. **Práce s reklamními rámy** - Hackování legálních reklamních sloupů a billboardů:\n   • Použití reklamy jako rámu pro umění\n   • Subvertising - přetvoření reklamního sdělení\n   • Detournement - odklon významu reklamy\n   • Instalace vlastních děl do prázdných rámů\n\n4. **Reclaiming Public Space** - Symbolické znovudobytí veřejného prostoru od komerčního využití zpět pro komunitu a umění.\n\nInspirováno prací @oxpostertime - umělecké intervence v městském prostoru, které využívají reklamní infrastrukturu jako médium pro kritické umění.',
      materials: ['Vlastní tisky/plakáty', 'Lepidlo na plakáty', 'Ochranná vrstva (lak)', 'Dokumentační fotoaparát', 'Rukavice'],
      budget: '~500-1000 Kč (tisk, materiály)',
      timeline: 'Průběžně - mapping 1 týden, intervence opakovaně',
      location: 'Palmovka - reklamní sloupy, billboardy, nelegální plochy',
      images: [],
      inspiration: {
        name: '@oxpostertime',
        url: 'https://www.instagram.com/oxpostertime/',
        description: 'Umělecké posters ve veřejném prostoru',
      },
    },
    {
      title: 'Street Art - Obrazy v ulicích',
      subtitle: 'Guerilla Art',
      icon: '🎨',
      color: 'blue',
      description: 'Lepění autorských tisků, grafik a obrazů na různých materiálech do městského prostoru',
      artist: 'Ptáček',
      status: 'Probíhá',
      details: ['Různé techniky', 'Spontánní instalace', 'Městská galerie'],
      fullDescription: 'Guerillové lepení autorských tisků, grafik a obrazů na různých materiálech do městského prostoru. Přeměna šedých stěn a prázdných ploch na venkovní galerii dostupnou všem.\n\nCíl: Oživit městský prostor uměním, vytvořit neoficiální veřejnou galerii a přinést umění tam, kde se ho lidé nenadějí.',
      materials: ['Vlastní tisky/grafiky', 'Lepidlo na plakáty', 'Ochranná vrstva', 'Různé papíry a materiály'],
      budget: '~300-500 Kč (tisk, materiály)',
      timeline: 'Průběžně - spontánní instalace',
      location: 'Palmovka a okolí - prázdné plochy, stěny, vývěsky',
      images: [
        {
          original: import.meta.env.BASE_URL + 'projects/streetart/IMG_4740.jpeg',
          thumbnail: import.meta.env.BASE_URL + 'projects/streetart/IMG_4740.jpeg',
          description: 'Street art instalace v Palmovce',
        },
      ],
    },
    {
      title: 'Guerillová galerie',
      subtitle: 'Guerilla Art',
      icon: '🖼️',
      color: 'teal',
      description: 'Výlep uměleckých děl do prázdných městských rámů, vývěsek a prázdných ploch',
      artist: 'Ptáček + další umělci',
      status: 'Probíhá',
      details: ['Prázdné plochy', 'Kolektivní akce', 'Neoficiální galerie'],
    },
    {
      title: 'Houpačka na sušáku',
      subtitle: 'Guerilla Art',
      icon: '🪢',
      color: 'cyan',
      description: 'Aktivace opomíjeného prostoru ve vnitrobloku - spontánní reakce obyvatel',
      artist: 'Ptáček',
      status: 'Realizováno',
      details: ['První intervence', 'Komunitní odezva', 'Neformální'],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Official Projects - Martin Tomek */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold">
              OFICIÁLNÍ
            </div>
            <div className="text-sm text-gray-600">Podpis: Martin Tomek</div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🏗️ Mobiliář & Oficiální intervence</h2>
          <p className="text-gray-600">
            Veřejně podepsané projekty zaměřené na urbánní mobiliář, komunitní aktivity a herní instalace
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {officialProjects.map((project, index) => (
            <div 
              key={index}
              onClick={() => setSelectedProject(project)}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-300 hover:shadow-xl transition-all cursor-pointer hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{project.icon}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  project.status === 'Realizováno' ? 'bg-green-200 text-green-800' :
                  project.status === 'Probíhá' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-gray-200 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{project.title}</h3>
              <p className="text-sm text-blue-600 font-semibold mb-3">{project.subtitle}</p>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="border-t border-blue-200 pt-3">
                <p className="text-xs font-bold text-gray-500 mb-2">KLÍČOVÉ PRVKY:</p>
                <ul className="space-y-1">
                  {project.details.map((detail, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              {project.timeline && (
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-xs font-bold text-gray-500 mb-1">⏱️ TIMELINE:</p>
                  <p className="text-xs text-gray-700">{project.timeline}</p>
                </div>
              )}
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-xs text-gray-500">
                  <span className="font-semibold">Autor:</span> {project.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guerilla Art - Ptáček */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold">
              GUERILLA ART
            </div>
            <div className="text-sm text-gray-600">Pseudonym: Ptáček</div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🎨 Neoficiální street art & detournement</h2>
          <p className="text-gray-600">
            Anonymní intervence kritizující vizuální smog a obohacující městský prostor o umění
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guerillaArt.map((project, index) => (
            <div 
              key={index}
              onClick={() => setSelectedProject(project)}
              className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-300 hover:shadow-xl transition-all cursor-pointer hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{project.icon}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  project.status === 'Realizováno' ? 'bg-green-200 text-green-800' :
                  project.status === 'Probíhá' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-gray-200 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{project.title}</h3>
              <p className="text-sm text-red-600 font-semibold mb-3">{project.subtitle}</p>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="border-t border-red-200 pt-3">
                <p className="text-xs font-bold text-gray-500 mb-2">CHARAKTERISTIKY:</p>
                <ul className="space-y-1">
                  {project.details.map((detail, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              {project.timeline && (
                <div className="mt-3 pt-3 border-t border-red-200">
                  <p className="text-xs font-bold text-gray-500 mb-1">⏱️ TIMELINE:</p>
                  <p className="text-xs text-gray-700">{project.timeline}</p>
                </div>
              )}
              <div className="mt-3 pt-3 border-t border-red-200">
                <p className="text-xs text-gray-500">
                  <span className="font-semibold">Street artist:</span> {project.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">📋 Rozdělení projektu</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-blue-300 mb-2">🏗️ OFICIÁLNÍ (Martin Tomek)</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• Veřejně podepsané projekty</li>
              <li>• Urbánní mobiliář</li>
              <li>• Komunitní aktivity</li>
              <li>• Spolupráce s institucemi</li>
              <li>• Legální intervence</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-red-300 mb-2">🎨 GUERILLA ART (Ptáček)</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• Anonymní pseudonym</li>
              <li>• Boj s reklamou & detournement</li>
              <li>• Street art & lepení obrazů</li>
              <li>• Kritické umění</li>
              <li>• Spontánní akce</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedProject(null);
            }
          }}
        >
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6 flex items-start justify-between rounded-t-2xl">
              <div>
                <div className="text-6xl mb-3">{selectedProject.icon}</div>
                <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                <p className="text-cyan-100">{selectedProject.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Status */}
              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                  selectedProject.status === 'Realizováno' ? 'bg-green-200 text-green-800' :
                  selectedProject.status === 'Probíhá' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-gray-200 text-gray-800'
                }`}>
                  {selectedProject.status}
                </span>
                <span className="text-gray-600">
                  <span className="font-semibold">Autor:</span> {selectedProject.artist}
                </span>
              </div>

              {/* Full Description */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">📝 Popis projektu</h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedProject.fullDescription}
                </div>
              </div>

              {/* Video if exists */}
              {selectedProject.videoUrl && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🎬 Video dokumentace</h3>
                  <div className="aspect-video rounded-xl overflow-hidden bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={selectedProject.videoUrl.replace('youtu.be/', 'youtube.com/embed/').split('?')[0]}
                      title="YouTube video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <a
                    href={selectedProject.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-teal-600 hover:text-teal-700 font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Otevřít na YouTube
                  </a>
                </div>
              )}

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedProject.materials && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-bold text-blue-900 mb-2">🛠️ Materiály</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {selectedProject.materials.map((mat, i) => (
                        <li key={i}>• {mat}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.budget && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-bold text-green-900 mb-2">💰 Rozpočet</h4>
                    <p className="text-gray-700">{selectedProject.budget}</p>
                  </div>
                )}

                {selectedProject.timeline && (
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-bold text-purple-900 mb-2">⏱️ Časový plán</h4>
                    <p className="text-gray-700">{selectedProject.timeline}</p>
                  </div>
                )}

                {selectedProject.location && (
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h4 className="font-bold text-orange-900 mb-2">📍 Lokalita</h4>
                    <p className="text-gray-700">{selectedProject.location}</p>
                  </div>
                )}
              </div>

              {selectedProject.partner && (
                <div className="bg-teal-50 rounded-lg p-4">
                  <h4 className="font-bold text-teal-900 mb-2">🤝 Spolupráce</h4>
                  <p className="text-gray-700">{selectedProject.partner}</p>
                </div>
              )}

              {/* Inspiration */}
              {selectedProject.inspiration && (
                <div className="bg-pink-50 rounded-lg p-4">
                  <h4 className="font-bold text-pink-900 mb-2">💡 Inspirace</h4>
                  <a
                    href={selectedProject.inspiration.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-pink-700 hover:text-pink-900 transition-colors"
                  >
                    <span className="font-medium">{selectedProject.inspiration.name}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="text-sm text-gray-600 mt-1">{selectedProject.inspiration.description}</p>
                </div>
              )}

              {/* Key Points */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-3">✨ Klíčové prvky</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedProject.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo Gallery */}
              {selectedProject.images && selectedProject.images.length > 0 ? (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">📸 Fotodokumentace</h3>
                  <div className="rounded-xl overflow-hidden border-2 border-gray-200">
                    <style>{`
                      .image-gallery-thumbnail img {
                        object-fit: cover !important;
                        height: 80px !important;
                      }
                      .image-gallery-image {
                        object-fit: contain !important;
                      }
                    `}</style>
                    <ImageGallery
                      items={selectedProject.images}
                      showPlayButton={false}
                      showFullscreenButton={true}
                      showIndex={true}
                      autoPlay={false}
                      thumbnailPosition="bottom"
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 text-center border-2 border-purple-200">
                  <ImageIcon className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                  <h4 className="font-bold text-gray-900 mb-2">📸 Fotodokumentace</h4>
                  <p className="text-gray-600 text-sm">
                    Fotky budou přidány během realizace projektu
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MethodologyPage() {
  return (
    <div className="space-y-6">
      {/* Main Overview */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">🔬 Metodologie výzkumu</h2>
        <p className="text-lg text-gray-600 mb-8">
          Smíšený výzkumný design kombinující kvalitativní a kvantitativní přístupy pro ověření dopadu guerillových intervencí.
        </p>

        {/* Research Objectives */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-300 mb-6">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">🎯 Cíl a výzkumné otázky</h3>
          <div className="bg-white rounded-lg p-5 mb-4">
            <p className="font-bold text-gray-900 mb-2">Hlavní cíl:</p>
            <p className="text-gray-700">
              Ověřit, jak drobné nekomerční zásahy mění užívání, vnímání a kvalitu pobytu ve „neviditelných" místech Palmovky a Kolbenky.
            </p>
          </div>
          <div className="space-y-3">
            <p className="font-bold text-blue-900">Klíčové výzkumné otázky:</p>
            <div className="space-y-2">
              <div className="flex gap-3 items-start">
                <span className="text-blue-600 font-bold">1.</span>
                <p className="text-gray-700">Jak se po intervenci mění chování a setrvání lidí v místě (dwell time, typ aktivit)?</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-blue-600 font-bold">2.</span>
                <p className="text-gray-700">Jak se promění vnímaná „čitelnost" a hodnota místa (sentiment, témata v komentářích)?</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-blue-600 font-bold">3.</span>
                <p className="text-gray-700">Jak dlouho zásah přežije a jaké zásahy vyvolá (údržba, adaptace, odpor)?</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-blue-600 font-bold">4.</span>
                <p className="text-gray-700">Jaké jsou limity/vedlejší efekty (vandalismus, komercionalizace, konflikty)?</p>
              </div>
            </div>
          </div>
        </div>

        {/* Research Design */}
        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border-2 border-green-300 mb-6">
          <h3 className="text-2xl font-bold text-green-900 mb-4">📊 Výzkumný design (Mixed-Methods)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-lg p-4">
              <p className="font-bold text-green-900 mb-2">Kvalitativně:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Účastnické pozorování</li>
                <li>• Autoetnografie</li>
                <li>• Neformální rozhovory</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="font-bold text-green-900 mb-2">Kvantitativně:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Sčítání průchodů/užití</li>
                <li>• Měření doby setrvání</li>
                <li>• "Survival time" intervence</li>
                <li>• A/B porovnání míst</li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="font-bold text-green-900 mb-2">Typ srovnání:</p>
            <ul className="text-gray-700 space-y-1">
              <li><span className="font-semibold">Before–After:</span> před vs. po zásahu</li>
              <li><span className="font-semibold">A/B lokality:</span> 1) místo s intervencí, 2) podobné kontrolní místo bez zásahu</li>
            </ul>
          </div>
        </div>

        {/* Intervention Types */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-300 mb-6">
          <h3 className="text-2xl font-bold text-purple-900 mb-4">🎨 Typologie intervencí</h3>
          <p className="text-gray-600 mb-4 text-sm">Pro srovnatelnost – každý typ testován min. na 2 místech (replikace)</p>
          
          <div className="space-y-4">
            {/* Mobiliář */}
            <div className="bg-white rounded-lg p-5 border-l-4 border-blue-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🪑</span>
                <h4 className="font-bold text-blue-900 text-lg">1. Mobiliář</h4>
              </div>
              <p className="text-sm text-gray-700 mb-3">Urbánní mobiliář měnící využití a komfort prostoru</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  Lavičky (banány, palety)
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  Solární světla
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  Hlasovací popelníky
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  Květiny (slunečnice)
                </span>
              </div>
            </div>

            {/* Street Art */}
            <div className="bg-white rounded-lg p-5 border-l-4 border-pink-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🎨</span>
                <h4 className="font-bold text-pink-900 text-lg">2. Street Art</h4>
              </div>
              <p className="text-sm text-gray-700 mb-3">Umělecké intervence obohacující městský prostor</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-medium">
                  Obrazy v ulicích
                </span>
                <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-medium">
                  Výplň prázdných ploch
                </span>
                <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-medium">
                  Street art sprejem
                </span>
                <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-medium">
                  Guerillová galerie
                </span>
              </div>
            </div>

            {/* Boj s reklamou */}
            <div className="bg-white rounded-lg p-5 border-l-4 border-red-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🎭</span>
                <h4 className="font-bold text-red-900 text-lg">3. Boj s reklamou (Detournement)</h4>
              </div>
              <p className="text-sm text-gray-700 mb-3">Kritická reakce na vizuální smog a nelegální reklamy</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                  Přelepování reklam
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                  Subvertising
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                  Kritické umění
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                  Anonymní akce (Ptáček)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Protocol */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-300 mb-6">
          <h3 className="text-2xl font-bold text-orange-900 mb-4">📋 Protokol „před–během–po"</h3>
          
          <div className="space-y-4">
            {/* Before */}
            <div className="bg-white rounded-lg p-5">
              <h4 className="font-bold text-orange-900 mb-3 text-lg">📍 PŘED (T-7 až T-1 dní)</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Mapování místa (fotomapa 360°, náčrt proudů pohybu)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Baseline měření (2× 60 min v různých časech): počty průchodů, zastavení, aktivity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Mikro-rozhovory s 5–8 kolemjdoucími („Co tady děláte? Co vám tu chybí?")</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span className="text-sm italic">Etika: vyhnout se škodám, nezakrývat oficiální info, bez identifikace osob</span>
                </li>
              </ul>
            </div>

            {/* During */}
            <div className="bg-white rounded-lg p-5">
              <h4 className="font-bold text-orange-900 mb-3 text-lg">🔧 BĚHEM (den instalace)</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Vedení Intervenční karty: datum, čas, materiály, náklady, kdo pomáhal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Foto/video záznam (detail + celek, den/noc)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>30–60 min observační okno hned po instalaci</span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="bg-white rounded-lg p-5">
              <h4 className="font-bold text-orange-900 mb-3 text-lg">📈 PO (T+1 až T+21 dní)</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Opakovaná měření v 5 fixních slotech (různé dny/časy, 30–60 min)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Evidence "survival time": vandalismus, opravy, adopce komunitou</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>5–8 neformálních rozhovorů o změně vnímání místa</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>A/B srovnání s kontrolní lokalitou</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-300">
          <h3 className="text-2xl font-bold text-cyan-900 mb-4">📊 Hodnoticí ukazatele (KPI)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="font-bold text-cyan-900 mb-1">K1 – Aktivace</p>
              <p className="text-sm text-gray-700">+X % zastavení / +X % sezení/hry vs. baseline</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="font-bold text-cyan-900 mb-1">K2 – Vydrž</p>
              <p className="text-sm text-gray-700">Dny do zásahu/poškození; komunitní adopce</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="font-bold text-cyan-900 mb-1">K3 – Čistota</p>
              <p className="text-sm text-gray-700">Pokles nedopalků; subjektivní bezpečí</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="font-bold text-cyan-900 mb-1">K4 – Viditelnost</p>
              <p className="text-sm text-gray-700">Počet interakcí; spontánní vylepšení</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="font-bold text-cyan-900 mb-1">K5 – Přenositelnost</p>
              <p className="text-sm text-gray-700">Replikovatelnost na jiné lokaci</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">📅 Harmonogram (12 týdnů)</h3>
        <div className="space-y-3">
          <div className="flex gap-4 items-start">
            <div className="px-3 py-1 bg-teal-600 text-white rounded-lg font-bold text-sm min-w-[80px] text-center">
              T1–2
            </div>
            <p className="text-gray-700 flex-1">Výběr míst, baseline měření, příprava materiálů</p>
          </div>
          <div className="flex gap-4 items-start">
            <div className="px-3 py-1 bg-blue-600 text-white rounded-lg font-bold text-sm min-w-[80px] text-center">
              T3–8
            </div>
            <p className="text-gray-700 flex-1">Instalace 5–7 intervencí (po 1 týdnu), průběžná měření</p>
          </div>
          <div className="flex gap-4 items-start">
            <div className="px-3 py-1 bg-purple-600 text-white rounded-lg font-bold text-sm min-w-[80px] text-center">
              T9–10
            </div>
            <p className="text-gray-700 flex-1">Doplňkové rozhovory, A/B validace</p>
          </div>
          <div className="flex gap-4 items-start">
            <div className="px-3 py-1 bg-green-600 text-white rounded-lg font-bold text-sm min-w-[80px] text-center">
              T11–12
            </div>
            <p className="text-gray-700 flex-1">Analýza, syntéza, komunitní prezentace, metodická zpráva</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OutputsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🎬 Hlavní výstupy projektu</h2>
        <p className="text-gray-600 mb-8">Tři hlavní pilíře výzkumu a umělecké tvorby</p>
        
        {/* Output 1 - Interventions Documentation */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-500 mb-6">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center">
                <Target className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-blue-900 mb-2">1. Zdokumentované intervence</h3>
              <p className="text-gray-700 mb-4">
                Kompletní dokumentace všech realizovaných guerillových intervencí ve veřejném prostoru.
              </p>
              <div className="bg-white rounded-lg p-4 mb-3">
                <h4 className="font-bold text-gray-900 mb-2">Obsah:</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span><strong>Fotodokumentace:</strong> Před/během/po záběry všech intervencí</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span><strong>Proces:</strong> Popis realizace, materiály, časová osa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span><strong>Reakce:</strong> Komunitní odezva, adopce, změny</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span><strong>Měření:</strong> Dwell time, survival time, využití prostoru</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Slunečnice
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Parklety
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Hlasovací popelníky
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Banány
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Game Jam
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Output 2 - Experimental Film */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-8 border-2 border-red-500 mb-6">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-red-500 rounded-lg flex items-center justify-center">
                <Film className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-red-900 mb-2">2. Experimentální dokumentární film</h3>
              <p className="text-lg text-gray-700 mb-3">Délka: 20–30 minut</p>
              <p className="text-gray-700 mb-4">
                Observační a participační dokumentární film zachycující lidi, atmosféru a proměny veřejného prostoru.
              </p>
              <div className="bg-white rounded-lg p-4 mb-3">
                <h4 className="font-bold text-gray-900 mb-2">Filmové techniky:</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span><strong>8mm film:</strong> Poetické a nostalgické pasáže</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span><strong>VHS:</strong> Zrnitá textura a dokumentární autenticita</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span><strong>Digitál:</strong> Přesný záznam procesu a reakcí</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span><strong>Animace:</strong> Introspektivní roviny a metafory</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 mb-3">
                <h4 className="font-bold text-gray-900 mb-2">Přístup:</h4>
                <p className="text-sm text-gray-700">
                  <strong>Observační:</strong> Sledování komunitních reakcí bez ovlivňování<br/>
                  <strong>Participační:</strong> Aktivní zapojení do intervencí, reflexe vlastní role
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  Festival Anifilm
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  Ji.hlava IDFF
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  Projekce na Palmovce
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Output 3 - Anthropological Research */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-8 border-2 border-green-500 mb-6">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-green-500 rounded-lg flex items-center justify-center">
                <FileText className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-green-900 mb-2">3. Antropologický výzkum a magisterská práce</h3>
              <p className="text-gray-700 mb-4">
                Systematické pozorování dat, analýza a teoretické shrnutí guerillových intervencí ve veřejném prostoru.
              </p>
              <div className="bg-white rounded-lg p-4 mb-3">
                <h4 className="font-bold text-gray-900 mb-2">Výzkumná část:</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span><strong>Kvantitativní data:</strong> Before/After měření, dwell time, survival time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span><strong>Kvalitativní data:</strong> Rozhovory, pozorování, terénní deník</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span><strong>Analýza:</strong> Tematické kódování, triangulace metod</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span><strong>KPI evaluace:</strong> Aktivace, vytrvalost, čistota, viditelnost</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 mb-3">
                <h4 className="font-bold text-gray-900 mb-2">Magisterská práce (text):</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span><strong>Teoretický rámec:</strong> Právo na město, tactical urbanism, participativní umění</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span><strong>Metodologie:</strong> Mixed-methods, akční výzkum, autoetnografie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span><strong>Případové studie:</strong> Detailní analýza každé intervence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span><strong>Závěry a doporučení:</strong> Pro město, komunitu, další výzkum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span><strong>Teoretické shrnutí:</strong> Příspěvek k oboru, reflexe procesu</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  FAMU Magisterská
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Publikace
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Data pro město Praha 8
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Outputs */}
        <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-300">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📦 Doplňkové výstupy</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-2">Otevřené manuály</h4>
              <p className="text-sm text-gray-600">Návody pro replikaci intervencí</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-2">Datový balíček</h4>
              <p className="text-sm text-gray-600">Raw data, šablony, měření</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-2">Komunitní prezentace</h4>
              <p className="text-sm text-gray-600">Venkovní výstava na Palmovce</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelinePage() {
  const timeline = [
    { 
      phase: '❄️ Zima 2025', 
      period: 'Leden - Březen 2025', 
      title: 'Příprava a výroba', 
      color: 'from-blue-500 to-cyan-500',
      tasks: [
        '💰 Žádost o grant Praha 8 - Kultura 2025 (deadline do konce roku)',
        '🗳️ Hlasovací popelníky - design, výroba, jarní klauzurní práce',
        '🍌 Betonové banány - návrh, výroba formy, odlévání',
        '📋 Mapping lokality a výběr míst',
        '🎭 Detournement - mapping nelegálních reklam'
      ] 
    },
    { 
      phase: '🌸 Jaro 2026', 
      period: 'Duben - Červen 2026', 
      title: 'Instalace a sadba', 
      color: 'from-green-500 to-teal-500',
      tasks: [
        '🌻 Slunečnice - předsadba na balkoně (březen-duben)',
        '🌻 Slunečnice - přesadba do 10l květináčů (duben)',
        '🌻 Slunečnice - sadba ven do Palmovky (duben-květen)',
        '🗳️ Hlasovací popelníky - instalace a testování',
        '🍌 Betonové banány - instalace laviček',
        '🪑 Parklety - sběr palet a příprava materiálů'
      ] 
    },
    { 
      phase: '☀️ Léto 2026', 
      period: 'Červenec - Září 2026', 
      title: 'Realizace a péče', 
      color: 'from-yellow-500 to-orange-500',
      tasks: [
        '🌻 Slunečnice - péče, zalévání, hnojení',
        '🌻 Slunečnice - hnojení na květ (konec léta)',
        '🪑 Parklety - stavba a instalace obývacího pokoje',
        '🎮 Game Jam - venkovní interaktivní instalace',
        '📸 Kontinuální dokumentace všech intervencí'
      ] 
    },
    { 
      phase: '🍂 Podzim 2026', 
      period: 'Říjen - Prosinec 2026', 
      title: 'Finální výsledky a sběr dat', 
      color: 'from-orange-600 to-red-500',
      tasks: [
        '🌻 Slunečnice - rozkvetlé! Finální dokumentace',
        '📊 Sběr dat z všech intervencí (before/after)',
        '📊 Vyhodnocení KPI (aktivace, vytrvalost, čistota)',
        '🎬 Začátek postprodukce dokumentárního filmu'
      ] 
    },
    { 
      phase: '❄️ Zima 2027', 
      period: 'Leden - Březen 2027', 
      title: 'Postprodukce a psaní', 
      color: 'from-indigo-500 to-blue-600',
      tasks: [
        '🎬 Postprodukce experimentálního dokumentárního filmu',
        '📝 Psaní magisterské práce',
        '📊 Analýza dat a teoretické shrnutí',
        '📝 Příprava prezentací'
      ] 
    },
    { 
      phase: '🌸 Jaro 2027', 
      period: 'Duben - Červen 2027', 
      title: 'Dokončení a prezentace', 
      color: 'from-purple-500 to-pink-500',
      tasks: [
        '🎬 Dokončení experimentálního dokumentárního filmu (20-30 min)',
        '📝 Finalizace magisterské práce',
        '🎥 Festivaly: Anifilm, Ji.hlava IDFF',
        '🎉 Komunitní projekce na Palmovce',
        '🎓 Obhajoba magisterské práce'
      ] 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📅 Časový plán projektu</h2>
        <p className="text-gray-600 mb-6">Kompletní timeline od přípravy po finální prezentaci (2 roky)</p>
        
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <div key={index} className="relative">
              <div className={`bg-gradient-to-r ${item.color} rounded-xl p-6 text-white shadow-lg`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold">
                    {item.phase}
                  </span>
                  <span className="text-sm font-medium">{item.period}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <ul className="space-y-2">
                  {item.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-white/80">•</span>
                      <span className="flex-1">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {index < timeline.length - 1 && (
                <div className="h-6 w-0.5 bg-gradient-to-b from-gray-300 to-gray-200 mx-auto my-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GalleryPage({ officialProjects, guerillaArt }) {
  // Gallery images
  const galleryImages = [
    {
      src: import.meta.env.BASE_URL + 'projects/gallery/IMG_1694.png',
      title: 'Palmovka - průzkum lokality',
      description: 'Dokumentace veřejného prostoru'
    },
    {
      src: import.meta.env.BASE_URL + 'projects/gallery/IMG_1719.png',
      title: 'Palmovka - urbánní prostředí',
      description: 'Analýza městského prostoru'
    },
    {
      src: import.meta.env.BASE_URL + 'projects/gallery/IMG_2332.png',
      title: 'Palmovka - veřejný prostor',
      description: 'Výzkum lokality a komunity'
    },
    {
      src: import.meta.env.BASE_URL + 'projects/gallery/IMG_4702.png',
      title: 'Slunečnice na Palmovce',
      description: 'První realizovaná intervence - guerillová výsadba'
    },
  ];

  // Collect all images from projects
  const projectImages = [];
  
  // Add images from official projects
  if (officialProjects) {
    officialProjects.forEach(project => {
      if (project.images && project.images.length > 0) {
        project.images.forEach(img => {
          projectImages.push({
            ...img,
            projectTitle: project.title,
            projectIcon: project.icon,
          });
        });
      }
    });
  }
  
  // Add images from guerilla art
  if (guerillaArt) {
    guerillaArt.forEach(project => {
      if (project.images && project.images.length > 0) {
        project.images.forEach(img => {
          projectImages.push({
            ...img,
            projectTitle: project.title,
            projectIcon: project.icon,
          });
        });
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Main Gallery */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📸 Galerie projektu</h2>
        <p className="text-gray-600 mb-6">Fotodokumentace lokality Palmovka a realizovaných intervencí</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-teal-500 transition-all hover:shadow-xl">
              <div className="aspect-video bg-gray-100">
                <img
                  src={image.src}
                  alt={image.description}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{image.title}</h3>
                <p className="text-sm text-gray-600">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project-specific images */}
      {projectImages.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎨 Detail intervencí</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectImages.map((image, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-teal-500 transition-all hover:shadow-xl">
                <div className="aspect-video bg-gray-100">
                  <img
                    src={image.original}
                    alt={image.description}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{image.projectIcon}</span>
                    <h3 className="font-bold text-gray-900">{image.projectTitle}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectPage;
