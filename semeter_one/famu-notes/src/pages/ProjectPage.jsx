import { useState } from 'react';
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
];

function ProjectPage() {
  const { subpage } = useParams();
  const currentSubpage = subpage || 'overview';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:text-gray-100 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zpět domů
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">🎨 Guerillové intervence</h1>
              <p className="text-xl text-gray-100">ve veřejném prostoru</p>
              <p className="text-sm text-gray-200 mt-2">Palmovka, Praha | Autorský projekt | Martin Tomek</p>
            </div>
            <a
              href="/palmovka_project_proposal.pdf"
              download
              className="flex items-center gap-2 bg-white text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Download className="w-5 h-5" />
              Stáhnout PDF
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
  const interventions = [
    {
      title: 'Houpačky',
      icon: '🪢',
      color: 'blue',
      description: 'Guerillové houpačky v zanedbaných prostorech – přinesení hravosti do veřejného prostoru',
    },
    {
      title: 'Guerillová výsadba',
      icon: '🌸',
      color: 'green',
      description: 'Výsadba květin a zelené v opuštěných koutech – oživení šedivých ploch',
    },
    {
      title: 'Parklety',
      icon: '🪑',
      color: 'orange',
      description: 'Dočasné veřejné sedání z palet – vytvoření míst pro setkávání',
    },
    {
      title: 'Hlasovací popelníky',
      icon: '🗳️',
      color: 'red',
      description: 'Interaktivní popelníky s hlasováním – zapojení komunity zábavnou formou',
    },
    {
      title: 'Křídový Game Jam',
      icon: '🎮',
      color: 'purple',
      description: 'Spolupráce s Katedrou herního designu – pouliční hry a interaktivní instalace',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🎨 Typy intervencí</h2>
        <p className="text-gray-600 mb-6">
          Projekt zahrnuje různé typy mikro-intervencí, které jsou nekomerční, reversibilní a založené na etice.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interventions.map((intervention, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-900 hover:shadow-lg transition-all"
            >
              <div className="text-5xl mb-4">{intervention.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{intervention.title}</h3>
              <p className="text-gray-600">{intervention.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MethodologyPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🔬 Metodologie</h2>
        
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Akční participativní výzkum</h3>
            <p className="text-gray-700">
              Založeno na antropologické zprávě lokality. Aktivní zapojení komunity do procesu plánování a realizace.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
            <h3 className="text-xl font-bold text-green-900 mb-3">Experimentální dokumentace</h3>
            <p className="text-gray-700">
              Kombinace 8mm, VHS estetiky, digitálu a animace pro vytvoření unikátního vizuálního jazyka.
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-600">
            <h3 className="text-xl font-bold text-purple-900 mb-3">Pozorování reakcí komunity</h3>
            <p className="text-gray-700">
              Systematické sledování a zaznamenávání reakcí obyvatel na jednotlivé intervence.
            </p>
          </div>

          <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-600">
            <h3 className="text-xl font-bold text-orange-900 mb-3">Etika a inkluze</h3>
            <p className="text-gray-700">
              Všechny intervence jsou nekomerční, reversibilní a respektující místní komunitu.
            </p>
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

export default ProjectPage;
