import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  Calendar
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
    id: 'timeline',
    title: 'Časový plán',
    icon: Calendar,
    color: 'orange',
  },
  {
    id: 'gallery',
    title: 'Galerie',
    icon: ImageIcon,
    color: 'pink',
  },
  {
    id: 'related',
    title: 'Související projekty',
    icon: Users,
    color: 'yellow',
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
        {currentSubpage === 'gallery' && <GalleryPage />}
        {currentSubpage === 'related' && <RelatedProjectsPage />}
      </div>
    </div>
  );
}

// Subpage Components

function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Project Summary SVG */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Přehled projektu</h2>
        <div className="w-full overflow-hidden rounded-lg">
          <img 
            src="/palmovka_project_summary.svg" 
            alt="Project Summary" 
            className="w-full h-auto"
          />
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
    },
    {
      title: 'Parklety',
      subtitle: 'Mobiliář',
      icon: '🪑',
      color: 'orange',
      description: 'Dočasná přeměna parkovacích míst na prostor pro setkávání - recyklovaný mobiliář z palet',
      artist: 'Martin Tomek',
      status: 'Realizováno',
      details: ['Dřevěné palety', 'Komunitní náměstí', 'Reversibilní'],
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
    },
  ];

  const guerillaArt = [
    {
      title: 'Detournement - Boj s reklamou',
      subtitle: 'Guerilla Art',
      icon: '🎭',
      color: 'pink',
      description: 'Přelepování nelegálních reklam uměleckými zásahy. Autorská reakce na vizuální smog.',
      artist: 'Ptáček',
      status: 'Probíhá',
      details: ['Reakce na reklamy', 'Kritické umění', 'Anonymní akce'],
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
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-300 hover:shadow-lg transition-all"
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
              <div className="mt-4 pt-3 border-t border-blue-200">
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
              className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-300 hover:shadow-lg transition-all"
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
              <div className="mt-4 pt-3 border-t border-red-200">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
              <p className="font-bold text-purple-900">🎮 Hra / aktivizace</p>
              <p className="text-sm text-gray-600">Křídové hry, panák, herní prvky</p>
            </div>
            <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
              <p className="font-bold text-blue-900">🪑 Komfort / pobyt</p>
              <p className="text-sm text-gray-600">Lavička z palet, parklet</p>
            </div>
            <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
              <p className="font-bold text-green-900">🌸 Estetika / pozornost</p>
              <p className="text-sm text-gray-600">Guerillová galerie, slunečnice</p>
            </div>
            <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
              <p className="font-bold text-red-900">🗳️ Čistota / etika</p>
              <p className="text-sm text-gray-600">Hlasovací popelník na špačky</p>
            </div>
            <div className="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
              <p className="font-bold text-yellow-900">💡 Bezpečí / orientace</p>
              <p className="text-sm text-gray-600">Dočasná solární světla</p>
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🎬 Hlavní výstupy</h2>
        
        {/* Main Output - Film */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-8 border-2 border-red-500 mb-6">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-red-500 rounded-lg flex items-center justify-center">
                <Film className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Experimentální dokumentární film</h3>
              <p className="text-lg text-gray-700 mb-3">Délka: 20–30 minut</p>
              <p className="text-gray-600 mb-3">
                Využití 8mm, VHS estetiky, digitálu a animace. Zachycení atmosféry, proměn a komunitních reakcí.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  Anifilm
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  Ji.hlava
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  Projekce na Palmovce
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Outputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
            <FileText className="w-10 h-10 text-blue-600 mb-3" />
            <h4 className="font-bold text-lg text-blue-900 mb-2">Závěrečná zpráva</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Vyhodnocení intervencí</li>
              <li>• Doporučení pro město</li>
              <li>• Data a poznatky</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
            <FileText className="w-10 h-10 text-green-600 mb-3" />
            <h4 className="font-bold text-lg text-green-900 mb-2">Otevřené manuály</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Návody mikro-intervencí</li>
              <li>• Inspirace pro komunity</li>
              <li>• Open-source přístup</li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
            <ImageIcon className="w-10 h-10 text-purple-600 mb-3" />
            <h4 className="font-bold text-lg text-purple-900 mb-2">Fotodokumentace</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Před/po záběry</li>
              <li>• Proces a reakce</li>
              <li>• Vizuální archiv</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelinePage() {
  const timeline = [
    { phase: 'Fáze 1', period: 'Měsíce 1-3', title: 'Příprava a výzkum', tasks: ['Antropologická zpráva', 'Mapping lokality', 'Konzultace s komunitou'] },
    { phase: 'Fáze 2', period: 'Měsíce 4-9', title: 'První intervence', tasks: ['Instalace houpačky', 'Guerillová výsadba', 'Dokumentace reakcí'] },
    { phase: 'Fáze 3', period: 'Měsíce 10-15', title: 'Rozšíření projektu', tasks: ['Parklety', 'Hlasovací popelníky', 'Game Jam'] },
    { phase: 'Fáze 4', period: 'Měsíce 16-21', title: 'Dlouhodobé pozorování', tasks: ['Sledování vývoje', 'Sběr dat', 'Rozhovory'] },
    { phase: 'Fáze 5', period: 'Měsíce 22-24', title: 'Finalizace', tasks: ['Postprodukce filmu', 'Závěrečná zpráva', 'Projekce a prezentace'] },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📅 Časový plán (2 roky)</h2>
        
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div key={index} className="relative pl-8 pb-8 border-l-4 border-teal-500 last:border-l-0 last:pb-0">
              <div className="absolute left-0 top-0 -ml-3 w-6 h-6 rounded-full bg-teal-500 border-4 border-white"></div>
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-6 border-2 border-teal-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-teal-600 text-white rounded-full text-sm font-bold">
                    {item.phase}
                  </span>
                  <span className="text-sm text-gray-600">{item.period}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <ul className="space-y-1">
                  {item.tasks.map((task, i) => (
                    <li key={i} className="text-gray-700 flex items-center gap-2">
                      <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GalleryPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📸 Galerie vizualizací</h2>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-12 text-center border-2 border-purple-200">
          <ImageIcon className="w-24 h-24 mx-auto mb-6 text-purple-400" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Galerie bude doplněna</h3>
          <p className="text-gray-600 mb-6">
            Zde budou vizualizace, mockupy a fotografie z průzkumu lokality.
          </p>
          <p className="text-sm text-gray-500">
            Můžeš přidat obrázky do složky <code className="bg-purple-100 px-2 py-1 rounded">public/projects/palmovka/</code>
          </p>
        </div>
      </div>
    </div>
  );
}

function RelatedProjectsPage() {
  const relatedProjects = [
    {
      title: 'Banány pro Palmovku',
      author: 'Tomáš Vrána',
      description: 'Guerilla instalace na Pražské Palmovce v podobě laviček pro veřejnost ve formě pořádně velkého banánu!',
      url: 'https://www.startovac.cz/projekty/banany-pro-palmovku',
      platform: 'Startovač',
      budget: '~20 000 Kč',
      features: [
        'Betonové lavičky ve tvaru banánů',
        'Crowdfunding kampaň',
        'Personalizované "etikety" pro podporovatele',
        'Stejná lokalita: Palmovka',
      ],
      color: 'yellow',
      emoji: '🍌',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🤝 Související projekty</h2>
        <p className="text-gray-600 mb-6">
          Inspirace a podobné guerillové intervence v Palmovce a okolí
        </p>

        <div className="space-y-6">
          {relatedProjects.map((project, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-8 border-2 border-yellow-400 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">{project.emoji}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                    <p className="text-gray-600">
                      <span className="font-semibold">Autor:</span> {project.author}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded-full text-sm font-medium">
                        {project.platform}
                      </span>
                      <span className="px-3 py-1 bg-green-200 text-green-900 rounded-full text-sm font-medium">
                        {project.budget}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 text-lg">
                {project.description}
              </p>

              <div className="mb-4">
                <h4 className="font-bold text-gray-900 mb-2">Klíčové prvky:</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition-colors shadow-lg"
                >
                  Navštívit projekt →
                </a>
              </div>
            </div>
          ))}

          {/* Add Your Own Section */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border-2 border-dashed border-gray-400">
            <div className="text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Znáš další podobné projekty?</h3>
              <p className="text-gray-600 mb-4">
                Palmovka má potenciál pro více guerillových intervencí! Pokud znáš další projekty, přidej je zde.
              </p>
              <p className="text-sm text-gray-500">
                Edit <code className="bg-gray-100 px-2 py-1 rounded">ProjectPage.jsx</code> → RelatedProjectsPage
              </p>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <h3 className="text-xl font-bold text-blue-900 mb-4">🔍 Srovnání s mým projektem</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">🍌 Banány pro Palmovku</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Jeden typ intervence (lavičky)</li>
                <li>• Crowdfunding (veřejné financování)</li>
                <li>• Konkrétní produkt</li>
                <li>• Rychlá realizace</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">🎨 Guerillové intervence (můj projekt)</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Různé typy intervencí (5+)</li>
                <li>• Akademický projekt (FAMU)</li>
                <li>• Dokumentární film + výzkum</li>
                <li>• Dlouhodobé pozorování (2 roky)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
