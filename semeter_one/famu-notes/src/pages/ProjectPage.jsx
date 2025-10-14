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
  ExternalLink,
  Video,
  BookOpen,
  Building2,
  Eye,
  Recycle,
  DollarSign,
  Clock,
  TrendingUp,
  Package,
  Presentation,
  CheckCircle2,
  Circle,
  Lightbulb,
  Palette,
  Sprout,
  Armchair,
  Gamepad2,
  Camera,
  Trash2,
  Banana,
  Sun,
  Vote,
  PaintBucket,
  Flower2,
  Sparkles,
  Hammer,
  Leaf,
  TreePine,
  Sofa,
  School,
  PartyPopper,
  Zap,
  Droplets,
  Scissors,
  Brush,
  Image as Gallery,
  Lamp,
  Waves,
  MapPin,
  Award,
  Rocket,
  Heart,
  Star,
  Smile,
  MessageCircle,
  Share2,
  ThumbsUp,
  Info,
  AlertCircle,
  ChevronRight,
  Home,
  Settings,
  Search,
  Bell,
  Menu
} from 'lucide-react';

// Icon mapping helper - converts emoji to Lucide icons
const getProjectIcon = (iconKey, className = "w-6 h-6") => {
  const iconMap = {
    '🗳️': Vote,
    '🍌': Banana,
    '🌻': Sun,
    '🪑': Armchair,
    '🎮': Gamepad2,
    '🎭': Palette,
    '🎨': Brush,
    '🖼️': Gallery,
    '🪢': Waves,
    '💡': Lamp,
    '🎬': Film,
    '🏗️': Hammer,
  };
  
  const IconComponent = iconMap[iconKey] || Circle;
  return <IconComponent className={className} />;
};

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
  const isScrolled = true; // Always keep it compact

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
                    <div className="flex items-center gap-2">
                    <Palette className="w-6 h-6" />
                    <h1 className="text-xl font-bold">Guerillové intervence</h1>
                  </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <Palette className="w-10 h-10" />
                    <h1 className="text-4xl font-bold">Guerillové intervence</h1>
                  </div>
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
      {/* Introduction */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-xl border-2 border-purple-300 p-8">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-8 h-8 text-purple-600" />
          <h2 className="text-3xl font-bold text-gray-900">Úvod</h2>
        </div>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p className="text-lg">
            <strong className="text-purple-900">Zásadním východiskem mého současného uvažování je koncept města jako galerie.</strong> Ulice a veřejná 
            prostranství chápu jako otevřený výstavní prostor, kde stěny domů mohou fungovat podobně jako 
            galerijní zdi. Svá díla proto záměrně situuji do městských zákoutí a na opomíjená místa – tak, aby je 
            mohlo objevit náhodné kolemjdoucí publikum, nejen návštěvníci oficiálních kulturních institucí.
          </p>
          
          <p>
            Chci tím jednak <strong>zpřístupnit umění širší veřejnosti</strong>, jednak <strong>povzbudit obyvatele, aby si svého okolí více všímali</strong>. 
            Současná městská zkušenost je totiž často charakterizována vizuálním přetížením a návykovou slepotou: 
            lidé si vlivem záplavy reklam a informací podvědomě „vypínají" vnímání veřejného prostoru, nebo ho 
            celé projdou s pohledem upřeným do mobilu.
          </p>
          
          <div className="bg-white rounded-lg p-6 border-l-4 border-purple-500">
            <p className="italic">
              <strong>Mým cílem je tuto apatii narušit</strong> – nalézat místa, která zdánlivě k ničemu nejsou a ničemu už neslouží, 
              a vdechnout jim druhý život tak, aby znovu přinášela hodnotu.
            </p>
          </div>
          
          <p>
            Je fascinující, že je <strong className="text-red-700">společensky přijatelnější veřejný prostor ničit, než ho svévolně 
            vylepšovat či opravovat</strong>. Svými zásahy tuto normu zpochybňuji.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 text-center border-2 border-purple-200">
              <Building2 className="w-10 h-10 text-purple-600 mb-2 mx-auto" />
              <h3 className="font-bold text-purple-900 mb-1">Město jako galerie</h3>
              <p className="text-sm text-gray-600">Ulice = výstavní prostor</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border-2 border-blue-200">
              <Eye className="w-10 h-10 text-blue-600 mb-2 mx-auto" />
              <h3 className="font-bold text-blue-900 mb-1">Narušení apatii</h3>
              <p className="text-sm text-gray-600">Probuzení vnímání prostoru</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border-2 border-pink-200">
              <Recycle className="w-10 h-10 text-pink-600 mb-2 mx-auto" />
              <h3 className="font-bold text-pink-900 mb-1">Druhý život míst</h3>
              <p className="text-sm text-gray-600">Opomíjená místa → hodnota</p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Documentation */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Video className="w-7 h-7 text-gray-900" />
          <h2 className="text-2xl font-bold text-gray-900">Video dokumentace projektu</h2>
        </div>
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
            <h3 className="font-bold text-gray-900 mb-1">Rozhovory s ulicí</h3>
            <p className="text-sm text-gray-600">Video dokumentace guerillových intervencí na Palmovce</p>
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
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-7 h-7 text-gray-900" />
          <h2 className="text-2xl font-bold text-gray-900">Tým projektu</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-5 border-2 border-teal-200">
            <div className="flex items-center gap-3 mb-2">
              <Film className="w-10 h-10 text-teal-600" />
              <div>
                <h3 className="font-bold text-gray-900">Martin Tomek</h3>
                <p className="text-sm text-teal-700 font-medium">Režisér, autor projektu</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <Camera className="w-10 h-10 text-blue-600" />
              <div>
                <h3 className="font-bold text-gray-900">Jiří Kejkula</h3>
                <p className="text-sm text-blue-700 font-medium">Produkce</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-5 border-2 border-yellow-200">
            <div className="flex items-center gap-3 mb-2">
              <Banana className="w-10 h-10 text-yellow-600" />
              <div>
                <h3 className="font-bold text-gray-900">Tomáš Vrána</h3>
                <p className="text-sm text-yellow-700 font-medium">Spolupracující umělec</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-2">
              <Gamepad2 className="w-10 h-10 text-purple-600" />
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Výzkumné podklady a dokumenty</h2>
        
        <div className="space-y-4">
          {/* Anthropological Research */}
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

          {/* Mentoring Plan */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6 border-2 border-teal-200">
            <div className="flex items-start gap-4">
              <FileText className="w-12 h-12 text-teal-600" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-4">Plán mentoringu - Magisterský program</h3>
                
                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-teal-900">Student:</p>
                      <p className="text-gray-700">Martin Tomek</p>
                    </div>
                    <div>
                      <p className="font-semibold text-teal-900">Obor / Program:</p>
                      <p className="text-gray-700">CAS FAMU - Magisterský program</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-teal-900 mb-2">Anotace praktického projektu:</p>
                    <p className="text-gray-700">
                      Experimentální dokumentární film o guerillových intervencích ve veřejném prostoru Palmovky. 
                      Projekt zahrnuje participativní umění, tactical urbanism a komunitní aktivaci prostoru.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-teal-900 mb-2">Mentor/ka pro praktický projekt:</p>
                    <p className="text-gray-700">Georgy Bagdasarov</p>
                  </div>

                  <div>
                    <p className="font-semibold text-teal-900 mb-2">Anotace teoretického projektu:</p>
                    <p className="text-gray-700">
                      Výzkum vlivu participativního umění na aktivaci zanedbaných veřejných prostorů. 
                      Analýza metodologie tactical urbanism a komunitního zapojení.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-teal-900 mb-2">Mentor/ka pro teoretickou práci:</p>
                    <p className="text-gray-700">Georgy Bagdasarov</p>
                  </div>

                  <div>
                    <p className="font-semibold text-teal-900 mb-2">Harmonogram:</p>
                    <p className="text-gray-700">2 roky (2025-2027) - Viz časový plán projektu</p>
                  </div>

                  <div>
                    <p className="font-semibold text-teal-900 mb-2">Externí konzultace:</p>
                    <p className="text-gray-700">Bývalý student Časů Turner - veřejně prospěšné práce</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grants & Funding */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-6">
        <div className="flex items-center gap-3 mb-6">
          <DollarSign className="w-7 h-7 text-gray-900" />
          <h2 className="text-2xl font-bold text-gray-900">Financování projektu</h2>
        </div>
        
        {/* Budget Breakdown */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-gray-900" />
            <h3 className="font-bold text-gray-900">Rozpočet jednotlivých intervencí</h3>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div className="flex items-center gap-2">
                <Vote className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Hlasovací popelníky</span>
              </div>
              <span className="font-bold text-gray-900">1 500 Kč</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div className="flex items-center gap-2">
                <Banana className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Betonové banány - lavičky</span>
              </div>
              <span className="font-bold text-gray-900">3 000 Kč</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-100 rounded-lg border-2 border-green-300">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Slunečnice (realizováno)</span>
              </div>
              <span className="font-bold text-green-700">800 Kč</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div className="flex items-center gap-2">
                <Armchair className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Parklety</span>
              </div>
              <span className="font-bold text-gray-900">3 500 Kč</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Křídový Game Jam</span>
              </div>
              <span className="font-bold text-gray-900">1 000 Kč</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Interaktivní kamerová hra</span>
              </div>
              <span className="font-bold text-gray-900">5 000 Kč</span>
            </div>
          </div>

          <div className="border-t-2 border-blue-300 pt-3 mb-4">
            <div className="flex justify-between items-center p-3 bg-blue-100 rounded-lg">
              <span className="text-lg font-bold text-blue-900">Oficiální projekty celkem:</span>
              <span className="text-xl font-bold text-blue-900">14 800 Kč</span>
            </div>
          </div>

          <h4 className="font-bold text-gray-900 mb-3 mt-6">Guerilla Art intervence:</h4>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Detournement - Boj s reklamou</span>
              </div>
              <span className="font-bold text-gray-900">750 Kč</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div className="flex items-center gap-2">
                <Brush className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Street Art - Obrazy v ulicích</span>
              </div>
              <span className="font-bold text-gray-900">400 Kč</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div className="flex items-center gap-2">
                <Gallery className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Guerillová galerie</span>
              </div>
              <span className="font-bold text-gray-900">350 Kč</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-100 rounded-lg border-2 border-green-300">
              <div className="flex items-center gap-2">
                <Waves className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Houpačka (realizováno)</span>
              </div>
              <span className="font-bold text-green-700">200 Kč</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div className="flex items-center gap-2">
                <Lamp className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Dočasná solární světla</span>
              </div>
              <span className="font-bold text-gray-900">750 Kč</span>
            </div>
          </div>

          <div className="border-t-2 border-blue-300 pt-3 mb-4">
            <div className="flex justify-between items-center p-3 bg-purple-100 rounded-lg">
              <span className="text-lg font-bold text-purple-900">Guerilla Art celkem:</span>
              <span className="text-xl font-bold text-purple-900">2 450 Kč</span>
            </div>
          </div>

          <div className="border-t-4 border-blue-500 pt-4">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border-2 border-green-400">
              <span className="text-xl font-bold text-gray-900">💰 CELKOVÝ ROZPOČET:</span>
              <span className="text-2xl font-bold text-green-700">17 250 Kč</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <p className="text-sm text-gray-700">
              <strong>Poznámka:</strong> Rozpočet nezahrnuje náklady na filmovou dokumentaci a techniku (~3 000 Kč).
              Celkový rozpočet projektu včetně dokumentace: <strong>~20 000 Kč</strong>
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
          <div className="flex items-start gap-4">
            <FileText className="w-12 h-12 text-green-600" />
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
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-6 h-6 text-blue-900" />
            <h3 className="font-bold text-lg text-blue-900">Cíl</h3>
          </div>
          <p className="text-gray-700">Oživit zanedbaná místa Palmovky pomocí participativního umění a mikro-intervencí</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border-2 border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-6 h-6 text-green-900" />
            <h3 className="font-bold text-lg text-green-900">Délka</h3>
          </div>
          <p className="text-gray-700">2 roky průběžných intervencí s dokumentací celého procesu</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-6 h-6 text-purple-900" />
            <h3 className="font-bold text-lg text-purple-900">Rozpočet</h3>
          </div>
          <p className="text-gray-700">~20 000 Kč (materiál, film, technika)</p>
        </div>
      </div>
    </div>
  );
}

// Project data - shared between InterventionsPage and GalleryPage
const officialProjects = [
    {
      title: 'Hlasovací popelníky',
      subtitle: 'Interaktivní mobiliář',
      icon: '🗳️',
      color: 'red',
      description: 'Experiment s veřejným zapojením skrze herní mechanismus "hlasování nedopalky"',
      artist: 'Martin Tomek',
      status: 'V plánu',
      details: ['Gamifikace', 'Zapojení komunity', 'Čistší prostor'],
      fullDescription: '**Pozorování a problém**\n\nCigaretové nedopalky jsou jedním z nejběžnějších odpadků na ulici. Mnoho lidí (zejména starší generace) ani nevnímá nedopalky jako odpad – odhodit ho na zem je pro ně normální. Přitom nedopalky znečišťují prostředí a jejich úklid stojí nemalé peníze.\n\n**Koncept hlasovacího popelníku**\n\nPopelník rozdělený na dvě přihrádky s otázkou, na kterou kuřák "hlasuje" tím, že vhodí nedopalek do jedné či druhé části.\n\n**Příklad:** "Je lepší káva, nebo čaj?" – jedna strana "káva", druhá "čaj"; lidé házejí špačky podle svého názoru.\n\nTento hravý prvek motivuje kuřáky dávat nedopalek do popelníku, ne na zem, a zároveň je to anketa.\n\n**Motivace projektu**\n\n• **Zlepšit čistotu Palmovky** - praktický dopad na prostředí\n\n• **Nenásilná komunikace problému** - místo moralizování použít hravost\n\n• **Mnohé kampaně nefungují, protože moralizují** - hravost by mohla fungovat lépe\n\n**Plán realizace**\n\n• Vyrobit či upravit stávající popelník\n\n• Doplnit ho **průhlednou dvoukomorovou nádobou** s nápisem vyzývajícím k hlasování\n\n• Téma může být neutrální nebo lokální (např. "Libeň nebo Karlín?" jako vtípek)\n\n• Sledovat, zda se zvýší počet nedopalků v popelníku a sníží na zemi\n\n**Metodologie výzkumu - Srovnání dvou lokalit**\n\n• **Experimentální místo** - s hlasovacím popelníkem\n\n• **Kontrolní místo** - bez hlasovacího popelníku\n\n**Postup měření:**\n\n1. Najít místo hodně znečištěné od nedopalků\n\n2. Vyčistit místo a dokumentovat (baseline)\n\n3. Počkat měsíc bez intervence\n\n4. Znovu vyčistit a **spočítat/zvážit nedopalky**\n\n5. Instalovat hlasovací popelník\n\n6. Po týdnu sesbírat nedopalky z obou lokalit a zvážit či spočítat\n\n**Sledované parametry:**\n\n• Volby lidí (jaké odpovědi vyhrávají)\n\n• Míru znečištění místa (počet nedopalků mimo popelník)\n\n• Before/after data - funguje intervence?\n\n**Vizualizace neviditelného**\n\nPrůhledná skleněná komora ukazuje nahromaděné nedopalky. Mnozí si možná vůbec poprvé **uvědomí, kolik nedopalků se denně vyhodí**. Forma vizualizace neviditelného problému.\n\n**Potenciál pro město**\n\nZískám **tvrdá data**, která mohou posloužit městu. Kdyby se to osvědčilo, mohla by radnice takové popelníky instalovat oficiálně.\n\n**Časový harmonogram**\n\n• **Zima 2025** (leden-březen) - Příprava, design, výroba\n\n• **Jarní klauzurní práce** - Prezentace projektu a metodologie\n\n• **Jaro 2026** - Instalace a testování (2 měsíce)\n\n• **Léto 2026** - Vyhodnocení dat\n\nPopelník lze vyrábět i v zimě, instalace a testování na jaře.',
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
      title: 'Betonové banány - lavičky',
      subtitle: 'Mobiliář',
      icon: '🍌',
      color: 'yellow',
      description: 'Série betonových laviček ve tvaru banánů. Funkční urbánní mobiliář s hravým designem inspirovaný "Tropical Palmbeach".',
      artist: 'Martin Tomek',
      status: 'V plánu',
      details: ['Recyklovaný beton', 'Veřejné sedání', 'Tropical Palmbeach'],
      fullDescription: '**Koncept: Tropical Palmbeach**\n\nProjekt vychází z lokální identity Palmovky. Podle antropologické zprávy místní obyvatelé říkají této čtvrti "Tropical Palmbeach" - inspirováno graffiti, které zde dříve bylo. Koncept tropického lesa: palmy, banány... tropická Palmovka.\n\nSérie betonových laviček ve tvaru banánů jako funkční urbánní mobiliář. Každá lavička bude mít personalizovanou "etiketu" s názvem Palmovka, připomínající banánové etikety z obchodu.\n\n**Časový harmonogram:**\n\n• **Zima 2025** (leden-březen) - Návrh, výroba formy, postupné odlévání\n• **Jaro-Léto 2026** - Instalace a uvedení do provozu\n\nBeton lze pracovat i v zimě (vnitřní prostory), instalace ideálně v teplém počasí.',
      materials: ['Rychletuhnoucí beton (12x 25kg)', 'Forma na odlévání', 'Pletivo pro výztuž', 'Nátěr/barva', 'Montážní materiál'],
      budget: '~3000 Kč na 1 lavičku',
      timeline: 'Zima 2025 (výroba) → Jaro-Léto 2026 (instalace)',
      location: 'Křižovatka před KB, okolí Palmovky',
      images: [],
    },
    {
      title: 'Slunečnice a květiny na Palmovce',
      subtitle: 'Výsadba + Guerilla Gardening',
      icon: '🌻',
      color: 'green',
      description: 'Guerillová výsadba 120 sazenic slunečnic do zanedbaných betonových květináčů - nejambicióznější akce z hlediska úsilí',
      artist: 'Martin Tomek',
      status: 'Realizováno',
      details: ['120 sazenic', 'Recyklace', '12 lokalit', 'Reflexní vesty'],
      fullDescription: '**Realizace 2025 - Testovací intervence**\n\nV roce 2025 jsem realizoval testovací intervenci - výsadbu slunečnic a dalších květin do zanedbaných betonových květináčů na Palmovce. Tato testovací akce měla za cíl zjistit limity a možnosti guerillového zahradničení v městském prostoru.\n\n**Kontext a motivace**\n\nV lokalitě Palmovka je řada velkých kruhových nebo čtvercových záhonů a květináčů, které jsou však léta prázdné nebo v nich roste jen plevel a tráva, již komunální technika vždy poseká a tím udržuje místo mrtvé.\n\nPřitom ještě v 90. letech při vzniku pěší zóny Palmovky tam byla vysázena zeleň. Dodnes lze na Google Street View najít, že v těch betonových ostrůvcích kdysi byly keře nebo stromky. Dnes nic. Palmovka tím působí obzvlášť nevlídně: minimum stínu, žádná barva, jen beton.\n\nMotivace: zazelenit a rozveselit Palmovku aspoň symbolicky. Zjistit, jak lidé zareagují, když se ve "veřejném" květináči objeví květiny, aniž by to instalovala radnice.\n\n**Postup výsadby**\n\nZjara jsem v bytě předpěstoval asi **120 sazenic** – semena slunečnic a popínavky jsem zasel do kelímků od kávy a jiných vyřazených nádob (recyklace). Mladé rostlinky jsem přesadil do větších nádob a po dvou měsících vyrostly do síly, že mohly ven.\n\nS kamarádem jsme vytipovali **12 konkrétních květináčů a záhonů** na Palmovce. Den výsadby: za plného dne, v **reflexních vestách** (nalezených v kontejneru), s motykou a konví. Transparentní taktika - lidé nás pokládali za pracovníky města a nikdo se nepozastavoval. Naopak jsme dostali pochvalu.\n\n**Interakce a vandalismus**\n\nPo výsadbě nastalo několik týdnů péče. Ukázalo se, že největším nepřítelem nejsou zahradníci města, ale samotní lidé. Plůtky se staly terčem kopanců a vandalismu - děti i dospělí do nich kopali pro zábavu. Při každé návštěvě jsem našel některý plůtek vyvrácený. Trpělivě jsem je obnovoval.\n\nAktivní zalévání co dva dny - v horkém létě až 10 litrů vody z dálky. Při zalévání docházelo k přímým interakcím: lidé se ptali, většinou projevili překvapení a uznání. Cítil jsem, že osobní přítomnost a komunikace umí otočit vnímání lidí k pozitivnímu.\n\n**Výsledek a úspěch**\n\nPo dvou měsících přežily **tři slunečnice** z původních třiceti. Důvody nízkého přežití: komunální sekáči, vandalismus, vyčerpaná půda.\n\nAle jedna slunečnice dosáhla úžasných **3 metrů výšky** - byla viditelná z celé Palmovky! Lidé se na ni chodili dívat z dálky a stala se dominantou prostoru.\n\nZajímavý fenomén: Postupně si **někdo odnášel květy domů**. Tím si lidé přivlastňovali kus té instalace - spontánní interakce s dílem, kterou jsem neplánoval. Instalace se tak stala participativní i v tomto nečekaném směru.\n\n**Poučení z testovací intervence 2025**\n\nPráce s živým materiálem ve městě je náročná - květiny potřebují stálou péči. Půda v betonových květináčích je vyčerpaná, tvrdá, neudrží vlhkost.\n\n**Plán pro rok 2026 - Poučení z chyb**\n\nNa základě zkušeností z roku 2025 plánuji v roce 2026 více škálovat projekt s těmito vylepšeními:\n\n• **Větší nádoby** - použít větší cihly/květináče pro lepší růst kořenů\n\n• **Kvalitní substrát** - sehnat **černozem z lesa** a dovézt na místo místo vyčerpané městské hlíny\n\n• **Lepší předpěst** - více času na růst sazenic před výsadbou\n\n• **Škálovat nahoru** - cíl vysadit **alespoň 100 rostlin** místo 30\n\n• **Systematický přístup** - aplikovat poučení z testovací fáze\n\nMá guerilová akce v roce 2025 splnila symbolický účel: ukázala, že by to šlo, ale také proč to vyžaduje lepší přípravu. Rok 2026 bude o aplikaci těchto poznatků.',
      materials: ['Semena/sazenice slunečnic (120 ks)', 'Recyklované kelímky', 'Hlína', 'Kravské hnojivo', 'Plůtky (plastové pletivo)', 'Reflexní vesty', 'Motyka, konev'],
      budget: '~800 Kč (sazenice, hlína, hnojivo, plůtky)',
      timeline: 'Jaro 2025 (předpěstování) → Léto 2025 (výsadba, péče)',
      location: '12 betonových záhonů a květináčů na Palmovce',
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
      title: 'Parklety',
      subtitle: 'Mobiliář / Tactical Urbanism',
      icon: '🪑',
      color: 'orange',
      description: 'Dočasná přeměna parkovacích míst na prostor pro setkávání - kompletní obývací pokoj pod širým nebem',
      artist: 'Martin Tomek',
      status: 'V plánu',
      details: ['Dřevěné palety', 'Komunitní náměstí', 'Reversibilní', 'Obývák venku'],
      fullDescription: '**Parklet a komunitní mikronáměstí**\n\nPalmovce chybí příjemný veřejný prostor k posezení a setkávání – něco jako malé náměstí, které by nebylo jen tranzitní. Identifikoval jsem místo před pobočkou Komerční banky, kde je široký chodník a asfaltová plocha, dnes využívaná jen pro rychlý průchod. Antropologický výzkum zmiňoval, že by zde šlo vytvořit odpočinkovou zónu. Rozhodl jsem se tedy naplánovat jednodenní akci ve formě parkletu neboli dočasného parku.\n\n**Realizace**\n\nRealizace by spočívala v tom, že bych na jeden den „obsadil" pár parkovacích míst nebo kus asfaltové plochy a vybavil ji dočasným mobiliářem: přinesu tam své paletové lavičky, stoly, několik velkých květináčů s rostlinami (půjčených či vyrobených), případně deštníky pro stín. Pozvu místní komunitu, aby se zastavila – mohu zajistit konvici s čajem nebo drobné občerstvení. Mohla by tam proběhnout i mini výstava fotek „Palmovka včera a dnes" pro oživení debaty.\n\n**Cíl experimentu**\n\nCílem je na vlastní oči vidět, jak lidé reagují, když najednou mají možnost se v místě zastavit. Sednou si a začnou si povídat? Ignorují to? Přijdou teenageři, senioři, rodiny? Takový jednodenní experiment mi umožní změřit zájem – mohu spočítat účastníky, sbírat jejich názory (umístím například nástěnku s papíry „Co byste zde rádi natrvalo?").\n\n**Veřejná prezentace projektu**\n\nZároveň to bude veřejná prezentace mé dosavadní práce v praxi: mohu tam vystavit plakáty dokumentující předchozí menší zásahy, pouštět z projektoru krátké záběry filmů, které jsem natočil při intervencích, atd. Bude to taková živá galerie a fórum v jednom. Pokud se akce povede, mohu ji opakovat třeba každé jaro a tím budovat tradici.\n\n**Mobiliář**\n\n• **Lavičky z palet** - sedací prostor pro 4-6 lidí\n\n• **Stolek** - centrální bod, možnost na kávu/knihu\n\n• **Koberec** - definuje prostor, přidává domácí atmosféru\n\n• **Květináč s květinami** - přináší zeleň a život do betonu\n\n• **Polštáře** - komfort a barva\n\n• **Deštníky** - stín v horkém počasí\n\n• **Nástěnka** - sběr názorů komunity\n\n• **Projektor** - prezentace dokumentace\n\n**Cíl projektu**\n\nUkázat potenciál městského prostoru a vyvolat debatu o prioritách ve veřejném prostoru. Změřit zájem komunity o trvalé komunitní náměstí.\n\n**Časový harmonogram**\n\n• **Jaro 2026** - Sběr palet, příprava materiálů\n\n• **Léto 2026** - Jednodenní akce parklet\n\nIdeální pro teplé počasí, kdy lidé tráví čas venku.',
      materials: ['Dřevěné EURO palety (6-8 ks)', 'Venkovní koberec', 'Malý stolek', 'Polštáře/sedáky', 'Květináč + rostliny', 'Deštníky', 'Nástěnka + papíry', 'Projektor', 'Čaj/občerstvení', 'Výstavní plakáty', 'Nářadí (šroubovák, bruska)'],
      budget: '~3000-4000 Kč (palety zdarma, materiály, rostliny, občerstvení)',
      timeline: 'Jaro-Léto 2026 (příprava) → 1 den (akce) → možné opakování',
      location: 'Před pobočkou Komerční banky na Palmovce - široký chodník a asfaltová plocha',
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
      details: ['Festival Closur', 'Mezioborová spolupráce', 'Hernost ve veřejném prostoru', 'Křídové hry'],
      fullDescription: '**Křídové hry a „panák" na asfaltu - Inspirace pro Game Jam**\n\nV mnoha vnitroblocích a sídlištích se nacházejí rozlehlé asfaltové plochy, které dnes nemají žádné využití. Dříve na nich stávaly prolézačky, pískoviště či jiné dětské prvky, nebo sloužily jako plácky pro míčové hry. Postupnou „modernizací" a možná i kvůli bezpečnostním normám však spousta těchto plácků zanikla, prolézačky byly odvezeny, a zbyl jen holý asfalt, který se v létě rozpaluje a v zimě klouže.\n\nDospělí ho obcházejí, děti nemají důvod tam jít. Motivací mé intervence bylo ukázat, že i takové místo lze vrátit do hry – doslova. Chtěl jsem zároveň protestovat proti zbytečnému odnímání funkčnosti prostoru (někdy město instaluje třeba automobilové zátarasy bez ohledu na chodce, čímž de facto znemožní pohyb i hru na části chodníku).\n\n**Provedení**\n\nProvedení bylo prosté: opatřil jsem si dětské pouliční křídy a nakreslil na vybrané plochy klasické hry, jako je **skákací panák**, **slalomová opičí dráha** či **obrysy fotbalových branek**. V jednom případě šlo o místo, kde byly zmíněné žluté betonové zátarasy – kolem nich jsem křídou vyznačil cestu a panáka, aby se to „nehratelné" místo paradoxně stalo hřištěm.\n\nVýhodou křídy je, že je dočasná a nikomu trvale nevadí, zároveň je ale dost výrazná, aby upoutala pozornost.\n\n**Výsledek byl okamžitý**\n\nJeště než křída pořádně zaschla, děti z blízkého domu si toho všimly a začaly si hrát. V jednom vnitrobloku ke mně dokonce doběhly a s radostí mi poděkovaly, že jsem jim tam „udělal hřiště". Jeden tatínek mi potřásl rukou – byl překvapen, že někdo z vlastní iniciativy oživuje prostor pro děti.\n\nTyto reakce byly veskrze pozitivní. Hra nakreslená na zemi je něco natolik nevinného a apolitického, že ji přijali všichni – vlastně jsem poprvé pocítil jednohlasný souhlas okolí. Nikdo si nestěžoval, že by panák vadil; naopak se brzy vedle objevily další křídové kresby od dětí, které dostaly chuť tvořit také.\n\nUkázalo se tak, že **děti jsou skvělými spojenci v oživování prostoru** – mají přirozenou touhu proměňovat prostředí hrou, jen k tomu často nedostávají příležitost.\n\n**Badatelský zájem a výzva**\n\nTato intervence vyvolala i můj vlastní badatelský zájem. Začal jsem se zajímat, jaké hry na chodník či asfalt existují, a objevil jsem iniciativy věnující se této tématice. Například projekt **„Hry na chodník"** nabízí sady šablon a realizuje herní malby pro obce, dokonce pořádá dětské dny, kde učí děti méně známé hry (např. různé varianty skákání panáka, bludiště atd.).\n\nTo mě inspirovalo a zároveň upozornilo na výzvu: mnoho her nakreslených na zemi je pro neznalé těžko pochopitelných. Dospělý, který nezná pravidla, často netuší, jak se daná hra hraje, pokud mu to někdo nevysvětlí. Profesionální projekty to řeší organizovaně – např. formou soutěží a instruktáže pro děti. Guerrillový umělec jako já ale takové zázemí nemá; nemohu u každé kresby stát a vysvětlovat pravidla.\n\n**Plán Game Jamu**\n\nNapadlo mě tedy spojit se s kamarádem herním designérem a vymyslet úplně novou hru na chodník, která by byla intuitivní a srozumitelná na první pohled, bez potřeby vysvětlení. Rýsuje se tu plán uspořádat **malý game jam** ve spolupráci s **katedrou herního designu**, jehož zadáním by bylo vytvořit jednoduchou pouliční hru pro křídu. Ideálně takovou, kterou si může nakreslit kdokoliv před domem a která bude zároveň bavit děti i dospělé.\n\nTo by byl krásný příklad, jak umění, hra a design splynou s komunitní praxí.\n\n**Mezioborová spolupráce**\n\nMezioborová spolupráce s Katedrou herního designu FAMU. Jednodenní game jam zaměřený na tvorbu her a interaktivních instalací ve veřejném prostoru. Propojení herních principů s guerillovým uměním. Vlastní spontánní křídové zásahy tedy považuji za velmi úspěšné – rozhýbaly jinak mrtvý asfalt a nastartovaly větší úvahy o herním využití veřejného prostoru.',
      materials: ['Křídy různých barev', 'Šablony (volitelné)', 'Interaktivní prvky', 'Dokumentační technika'],
      budget: '~1000 Kč',
      timeline: '1 den (game jam) + příprava + dokumentace',
      location: 'Palmovka, možná festival Closur',
      images: [],
      partner: 'Michal z Herního designu FAMU',
      inspiration: {
        name: 'Hry na chodník',
        description: 'Projekt věnující se pouličním hrám a herním malbám',
      },
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
        instagram: 'https://www.instagram.com/oxpostertime/',
      },
    },
    {
      title: 'Street Art - Obrazy v ulicích',
      subtitle: 'Guerilla Art / Stop Motion',
      icon: '🎨',
      color: 'blue',
      description: 'Street art, spray art, malba na různých materiálech, poster bombing a sticker bombing ve veřejném prostoru',
      artist: 'Ptáček',
      status: 'Probíhá',
      details: ['Různé techniky', 'Linoritové samolepky', 'Stop motion animace', 'Participativní umění'],
      fullDescription: '**Street Art v ulicích**\n\nKomplexní přístup k street artu zahrnující různé techniky: **spray art**, **malbu na různých materiálech**, **poster bombing** a **sticker bombing**. Guerillové lepení autorských tisků, grafik a obrazů do městského prostoru. Přeměna šedých stěn a prázdných ploch na venkovní galerii dostupnou všem.\n\n**Linoritové samolepky - Stop Motion projekt**\n\nSpeciální projekt kombinující street art s animací. Vytvořil jsem sérii samolepek s natiskem linoritu, kde každá samolepka má své unikátní číslo. Proces probíhá ve třech fázích:\n\n**1. Digitalizace**\n\nVšechny samolepky jsou naskenované ještě před tím, než se dostanou do veřejného prostoru. Z těchto skenů vzniká stop motion animace.\n\n**2. Projekce**\n\nVýsledná stop motion animace byla promítána na **Anifest** (festival animovaného filmu) v Třeboni, kde představovala propojení street artu s animací.\n\n**3. Distribuce do veřejného prostoru**\n\nSamolepky jsou následně lepeny do ulic, ale zároveň jsou distribuovány lidem, kteří se sami stávají součástí projektu.\n\n**Participativní element - "HelloMyNameIs" formát**\n\nPoužívám formát **"HelloMyNameIs"**, který je klasický pro graffiti kulturu a lidé ho okamžitě rozpoznávají. Tento formát má zajímavý psychologický efekt - když se lidé setkají s touto relativně velkou samolepkou, mají přirozenou tendenci ji někam nalepit.\n\n**Experiment na Anifestu**\n\nBěhem festivalu jsem každý den vystavoval samolepky na festivalových místech - na stolech, různých stanovištích. Bylo fascinující pozorovat, jak si lidé samolepky brali přímo před mýma očima a následně je lepili na:\n\n• Záchody\n\n• Přímo před festivalový stan\n\n• Na sebe nebo na jiné lidi\n\n• Různá nečekaná místa\n\n**Zajímavé zjištění:** Na stejných místech byly k dispozici i jiné samolepky, ale lidé lepili **výhradně moje**. Nikdo jiné samolepky nikam nenalepil. To ukazuje sílu rozpoznatelného formátu a participativního designu.\n\n**Výsledek**\n\nProjekt je kombinací:\n\n• **Street artu** - fyzické intervence ve veřejném prostoru\n\n• **Site-specific intervention** - samolepky se objevují na místech, kam je lidé sami umístí\n\n• **Stop motion animace** - digitální záznam před fyzickou distribucí\n\n• **Participativního umění** - lidé se stávají spolutvůrci díla tím, že rozhodují, kam samolepky nalepí\n\n**Cíl projektu**\n\nOživit městský prostor uměním, vytvořit neoficiální veřejnou galerii a přinést umění tam, kde se ho lidé nenadějí. Zároveň zkoumat, jak lidé interagují s uměním, když mají možnost se stát jeho součástí.',
      materials: ['Linoritové samolepky', 'Vlastní tisky/grafiky', 'Spray barvy', 'Malby na různých materiálech', 'Postery', 'Lepidlo na plakáty', 'Ochranná vrstva'],
      budget: '~300-500 Kč (tisk, materiály)',
      timeline: 'Průběžně - spontánní instalace + Anifilm projekce',
      location: 'Palmovka a okolí - prázdné plochy, stěny, vývěsky + Anifilm Třeboň',
      videoUrl: 'https://youtu.be/P-Wx6zbYfiE',
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
      details: ['Prázdné plochy', 'Kolektivní akce', 'Neoficiální galerie', 'Experiment s viditelností'],
      fullDescription: '**Guerillová galerie v ulici**\n\nDalší intervencí, která proběhla zejména v okolí Kolbenky, je vytváření improvizované pouliční galerie v místech, jež kdysi sloužila k informování veřejnosti, ale dnes zejí prázdnotou. Mnoho zastávek MHD má například rámy na vývěsky pro případ náhradní autobusové dopravy – pokud se ale dlouho žádná výluka nekonala, zůstává v rámech prázdný bílý papír nebo nic. Podobně na některých zdech visí opuštěné nástěnky či tabule, kam se kdysi vyvěšovaly třeba obvodové informace, ale dnes už je nikdo neaktualizuje.\n\n**Motivace**\n\nMotivace pro tuto akci byla dvojí: jednak opět oživit zanedbaný prvek prostoru (prázdný rám), jednak přímo vystavit umění mimo galerie a sledovat, jaké má publikum.\n\n**Realizace**\n\nRealizace probíhala tak, že jsem si připravil několik vlastních grafických tisků a také vybral pár děl od svých přátel (grafiky, fotografie), kteří souhlasili s takovou „guerrillovou výstavou". Tyto výtisky formátu A3 či A2 jsem v noci nebo časně ráno vylepil do vybraných rámů a na plochy, kde nic nebylo – typicky dovnitř prázdné informační tabule na zastávce, nebo na zeď vedle legální vývěsky. Dával jsem si pozor, abych nezakrýval žádné oficiální oznámení – spíše šlo o místa, jež byla prázdná nebo využitá načerno.\n\nTak vznikla malá venkovní galerie: obrazy v ulici, které denně míjely desítky lidí. Zvlášť mě zajímalo místo hned vedle známé galerie Pragovka – tamní rušná ulice sice vede kolem oficiální galerie, ale většina lidí dovnitř nezavítá. Napadlo mě, kolik kolemjdoucích uvidí můj plakát na lampě ve srovnání s tím, kolik jich za stejný den projde dveřmi galerie o pár metrů vedle.\n\n**Reakce a pozorování**\n\nReakce na guerillovou galerii byly smíšené a poučné. Některé vývěsní rámy s mými plakáty zůstaly nedotčené i několik týdnů, zřejmě nikomu nevadily, možná si jich mnozí ani nevšimli. Jiné ale zmizely překvapivě rychle. Například plakát v rámečku náhradní autobusové dopravy visí dodnes. Když jsem ho však přidal i na oficiální informační místa, zmizel prakticky okamžitě, společně se starými letáky, takže jsem tím paradoxně prostor „vyčistil".\n\n**Komerční vs. nekomerční prostor**\n\nJeště výraznější bylo zjištění u plakátu, který jsem nalepil na reklamní sloup typu citylight. Dal jsem ho zvenčí na sklo sloupu, vedle velkého billboardu, ale tak, abych nezakrýval placenou reklamu, a můj plakát visel na okraji, kde dříve stejně byla jiná nelegální nálepka. Během dvou dnů byl pryč, zatímco podobné nálepky na přilehlé zdi zůstaly.\n\nVyvodil jsem z toho, že tam, kde jde o potenciální zisk a plochy určené k reklamě, je jakýkoli cizorodý prvek promptně odstraňován. Naopak v šedé zóně na zdech a sloupech mimo oficiální plochy mohou mé výtvory přežít déle, protože nikoho „neohrožují" finančně. Je to takový paradox: pouliční umění v nekomerčním prostoru příliš nevzbuzuje pozornost, ani pozitivní, ani negativní, a může se tam uchytit, zatímco v prostoru komerčním, kontrolovaném reklamními firmami, je vnímáno téměř jako narušení pořádku a rychle likvidováno.\n\n**Poznatky**\n\nPro mě tento experiment byl cenný. **Viditelnost vs. trvalost:** čím exponovanější a viditelnější místo (reklamní sloup na hlavní třídě), tím rychlejší zásah a odstranění; na skrytějším místě mohl obraz tiše působit na kolemjdoucí déle. Nedokážu přesně změřit, kolik lidí si obrázků všimlo a co si pomysleli – snad to budu moci částečně zjistit budoucím dotazováním kolemjdoucích nebo pomocí sčítací kamery.\n\nAle už teď mohu říct, že **ulice jako galerie funguje:** obrazy venku reálně osloví násobně více náhodných diváků než v uzavřené galerii, i když jen letmo a bez kontextu. Otázkou zůstává jejich vnímání – kolik lidí je skutečně zaregistruje v záplavě jiných podnětů.\n\n**Budoucí plány**\n\nTahle intervence mi každopádně pomohla identifikovat nová vhodná místa (další prázdné rámy čekající na využití) a také slabá místa (tam, kde hrozí rychlá cenzura). Do budoucna určitě s konceptem guerrillové galerie počítám, možná i ve větším měřítku: dokážu si představit celou ulici proměněnou v otevřenou galerii s reprodukcemi umění na každém druhém sloupu, která by aspoň částečně neutralizovala tu nekonečnou asfaltovou a reklamní šedi.\n\n**Kolektivní akce**\n\nProjekt je otevřený pro další umělce a kreativce, kteří chtějí přispět svými díly do veřejného prostoru.',
      materials: ['Vlastní tisky/grafiky (A2, A3)', 'Díla od přátel umělců', 'Lepidlo na plakáty', 'Ochranná vrstva'],
      budget: '~200-500 Kč (tisk, materiály)',
      timeline: 'Průběžně - noční/ranní instalace',
      location: 'Okolí Kolbenky, Palmovka, prázdné rámy MHD, vývěsky, zdi',
      images: [],
    },
    {
      title: 'Houpačka na zapomenutém sušáku',
      subtitle: 'Guerilla Art / Aktivace prostoru',
      icon: '🪢',
      color: 'cyan',
      description: 'Instalace houpačky na opuštěném kovové sušáku ve vnitrobloku - intervence která motivovala obyvatele k trvalé proměně místa',
      artist: 'Ptáček',
      status: 'Realizováno',
      details: ['První intervence', 'Komunitní odezva', 'DIY', 'Trvalý efekt'],
      fullDescription: '**Kontext a motivace**\n\nJedním z prvních zásahů byla instalace houpačky ve vnitrobloku libeňského sídliště, na konstrukci starých kovových sušáků na prádlo. Tyto sušáky – typický relikt z dob socialismu – už dnes obyvatelé nevyužívali; stály opuštěné na travnaté ploše, kterou nikdo nepovažoval za hřiště či místo k trávení času.\n\nNapadlo mě propůjčit jim nový smysl. Motivací bylo ukázat, že i zdánlivě mrtvý prvek může znovu ožít a přinést radost, pokud se změní úhel pohledu. Zároveň mě zajímalo, jak lidé zareagují: zda houpačku přijmou, ignorují, či odmítnou.\n\n**Realizace - DIY přístup**\n\nRealizace proběhla svépomocí z dostupných materiálů:\n\n• Z odložené **dřevěné palety** (nalezené u kontejneru) jsem pomocí páčidla a pily vyrobil pevné prkno na sezení\n\n• Vše jsem obrousil a natřel pro delší životnost\n\n• Zakoupil jsem dostatečně dlouhé pevné lano\n\n• Musel jsem se naučit **správné uzly** pro bezpečné zavěšení - osobní posun, protože předtím jsem vázat uzly neuměl\n\nHoupačku jsem instaloval za víkendového podvečera: lano jsme uvázali na vodorovnou tyč sušáku. **První pokus ukázal chybu** - lano bylo příliš krátké, sedátko viselo dost vysoko. Než jsem stihl sehnat delší, nechal jsem provizorní houpačku na místě.\n\n**Spontánní komunitní reakce**\n\nBěhem dvou dnů se stalo něco pozoruhodného: **někdo z místních houpačku okamžitě použil a dokonce poopravil její zavěšení**, aby se na ní dalo lépe houpat. Jinými slovy, prostor začal žít: anonymní uživatel nejen akceptoval můj zásah, ale aktivně ho vylepšil.\n\nJakmile to bylo možné, pořídil jsem delší lano, vrátil se na místo a houpačku znovu zavěsil, tentokrát už pořádně. Houpačka poté plnila svou funkci po několik týdnů. **Děti z okolí ji používaly, dospělí ji tolerovali.**\n\nIntervence splnila cíl:\n• Upozornila na nevyužitý sušák\n• Nabídla kolemjdoucím nečekanou atrakci\n• Otevřela otázku, proč podobné prvky vymizely\n\n**Trvalá proměna místa**\n\nPo delší době jsem se na místo vrátil a čekalo mě **milé překvapení**:\n\n• Celý kovový mobiliář sušáků byl **obroušen a nově natřen**\n\n• Zásah očividně motivoval obyvatele či správce, aby prostředí zvelebili\n\n• Na konstrukci se objevilo **nové lanko na prádlo**, které tam dříve nebylo\n\n• Sušáky znovu slouží svému původnímu účelu\n\n• Moji provizorní houpačku někdo **šetrně odložil vedle** místo aby ji vyhodil\n\n**Reflexe a úspěch**\n\nToto finále považuji za **velký úspěch**: původní nevyužívané místo nezískalo jen dočasnou atrakci, ale dočkalo se trvalejší proměny a údržby.\n\nMá intervence tak otevřela oči místním, že i starý sušák může mít smysl – a oni ho sami vzali za vlastní, převzali iniciativu. Lepší výsledek jsem si nemohl přát.\n\nOdloženou dřevěnou houpačku mám nyní u sebe a přemýšlím, kam ji zavěsím příště, aby opět rozproudila život jinde.',
      materials: ['Dřevěná paleta (nalezená)', 'Pevné lano', 'Páčidlo, pila', 'Brusný papír', 'Nátěr/lak', 'Uzly (nová dovednost)'],
      budget: '~200 Kč (lano, nátěr)',
      timeline: 'Víkend (instalace) → Několik týdnů (používání) → Trvalá proměna',
      location: 'Vnitroblok libeňského sídliště, kovové sušáky',
      images: [
        {
          original: import.meta.env.BASE_URL + 'projects/houpacka/IMG_2332.png',
          thumbnail: import.meta.env.BASE_URL + 'projects/houpacka/IMG_2332.png',
          description: 'Kovové sušáky ve vnitrobloku - místo instalace houpačky',
        },
      ],
    },
    {
      title: 'Dočasná solární světla',
      subtitle: 'Guerilla Art / Tactical Urbanism',
      icon: '💡',
      color: 'yellow',
      description: 'Instalace recyklovaných LED světel na tmavá místa - kritika konzumní kultury a zlepšení bezpečnosti',
      artist: 'Ptáček',
      status: 'V přípravě',
      details: ['Recyklace baterií', 'Bezpečnost', 'Ekologický aktivismus', 'DIY elektronika'],
      fullDescription: '**Dočasná solární světla**\n\nDalším připravovaným projektem reagujícím na konkrétní problém Palmovky je instalace dočasných pouličních světel na tmavá místa. Některé podchody, vchody do metra nebo zákoutí jsou nedostatečně osvětlené, což snižuje pocit bezpečí. Zároveň jsem si všiml ekologického paradoxu: objevily se jednorázové elektronické cigarety, které obsahují malé Li-ion akumulátory, ale po jednom použití se vyhazují. Tyto baterie lze přitom snadno vyjmout a znovu využít.\n\n**Trojí motivace**\n\nMotivace je tedy trojí:\n\n1. **Zlepšit bezpečnost a orientaci** v nočním prostoru\n\n2. **Prakticky demonstrovat možnosti recyklace** elektronického odpadu\n\n3. **Kriticky poukázat na absurditu konzumní kultury**, která vyhazuje funkční baterie po jediném použití\n\n**Realizace**\n\nPlánuji sestrojit jednoduché LED lampičky napájené buď solárním panelem a baterií, nebo jen baterií nabíjecí (kterou bych nabíjel ručně jednou za čas). Tyto lampy umístím na místa, kde chybí světlo – například ke schodům u výstupu z metra Palmovka, nebo u zastávky tramvaje. Světlo bude slabší než veřejné osvětlení, spíše orientační, ale i to může pomoci.\n\nKe světlu umístím malou cedulku nebo QR kód s vysvětlením projektu: že jde o recyklované baterie a dočasné řešení, které upozorňuje na problém (tmu v místě a plýtvání zdroji).\n\n**Očekávaný dopad - Dvě roviny**\n\n**1. Praktická rovina:**\n\nLidé chodící tudy večer si možná s úlevou všimnou, že „někdo to tu nasvítil" – a třeba to přiměje odpovědné činitele k trvalému řešení, když uvidí zájem.\n\n**2. Environmentální rovina:**\n\nTi, kdo prozkoumají cedulku, se dozvědí o environmentálním aspektu: že jejich elektronická cigareta mohla třeba svítit ještě dál sloužit, místo aby skončila na skládce.\n\n**Aktivismus + Praktičnost**\n\nProjekt je tedy lehce aktivistický (kritika korporací prodávajících jednorázové baterie) a zároveň praktický. Samozřejmě budu opět sledovat životnost – jak dlouho lampy vydrží, než je někdo ukradne či poškodí, nebo než se vybije baterie. To vše zapíšu a použiji jako argumenty, proč či proč ne takové věci dělat v oficiálním měřítku.\n\n**Recyklace jednorázových cigaret**\n\nJednorázové elektronické cigarety obsahují:\n\n• **Li-ion akumulátory** - plně funkční baterie\n\n• **LED diody** - využitelné pro světla\n\n• **Elektronické komponenty** - možnost dalšího využití\n\nVšechny tyto komponenty končí na skládce po jediném použití - absurdní plýtvání zdroji.\n\n**Sledování a dokumentace**\n\n• Jak dlouho lampy vydrží?\n\n• Budou ukradeny nebo poškozeny?\n\n• Jak často je třeba nabíjet baterie?\n\n• Všimnou si lidé? Změní to jejich chování?\n\n• Zareagují odpovědné orgány?',
      materials: ['Recyklované Li-ion baterie (z e-cigaret)', 'LED diody', 'Solární panely (malé)', 'Voděodolné krabičky', 'Nabíjecí obvody', 'Cedulky/QR kódy', 'Montážní materiál'],
      budget: '~500-1000 Kč (solární panely, krabičky, komponenty)',
      timeline: 'Zima 2025-2026 (stavba) → Jaro 2026 (instalace) → Sledování',
      location: 'Tmavá místa na Palmovce - schody u metra, zastávky tramvaje, podchody',
      images: [],
    },
  ];

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

  return (
    <div className="space-y-8">
      {/* Explanation Box */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl border-2 border-purple-300 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-7 h-7 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">O typech intervencí</h2>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <Hammer className="w-10 h-10 text-blue-600" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">OFICIÁLNÍ projekty</h3>
                <p className="text-gray-700 mb-2">
                  Veřejně podepsané intervence pod <strong>reálným jménem Martin Tomek</strong>. Tyto projekty jsou transparentní, 
                  zaměřené na urbánní mobiliář, komunitní aktivity a herní instalace. Cílem je pozitivní změna prostoru 
                  s možností oficiální spolupráce s městem.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Příklady: Hlasovací popelníky, Betonové lavičky, Parklety, Křídový Game Jam
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-pink-200">
            <div className="flex items-start gap-3">
              <Palette className="w-10 h-10 text-pink-600" />
              <div>
                <h3 className="font-bold text-pink-900 mb-2">GUERILLA ART projekty</h3>
                <p className="text-gray-700 mb-2">
                  Neoficiální intervence pod <strong>pseudonymem "Ptáček"</strong>. Tyto akce jsou anonymní, spontánní 
                  a často kritické vůči současnému stavu veřejného prostoru. Guerilla art umožňuje svobodnější vyjádření 
                  bez nutnosti oficiálních povolení.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Příklady: Detournement reklam, Street Art, Guerillová galerie, Houpačka, Solární světla
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong>Proč dva přístupy?</strong> Oficiální projekty umožňují legální spolupráci a trvalé změny. 
              Guerilla art poskytuje svobodu experimentovat, kritizovat a reagovat rychle bez byrokratických překážek. 
              Oba přístupy se vzájemně doplňují a společně tvoří komplexní pohled na možnosti intervencí ve veřejném prostoru.
            </p>
          </div>
        </div>
      </div>

      {/* Official Projects - Martin Tomek */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold">
              OFICIÁLNÍ
            </div>
            <div className="text-sm text-gray-600">Podpis: Martin Tomek</div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Hammer className="w-7 h-7 text-gray-900" />
            <h2 className="text-2xl font-bold text-gray-900">Mobiliář & Oficiální intervence</h2>
          </div>
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
                <div>{getProjectIcon(project.icon, "w-12 h-12 text-blue-600")}</div>
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
          <div className="flex items-center gap-2 mb-2">
            <Brush className="w-7 h-7 text-gray-900" />
            <h2 className="text-2xl font-bold text-gray-900">Neoficiální street art & detournement</h2>
          </div>
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
                <div>{getProjectIcon(project.icon, "w-12 h-12 text-pink-600")}</div>
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
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-6 h-6 text-white" />
          <h3 className="text-xl font-bold">Rozdělení projektu</h3>
        </div>
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
              {selectedProject.fullDescription ? (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">📝 Popis projektu</h3>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    {selectedProject.fullDescription.split('\n\n').map((paragraph, idx) => {
                      // Handle bullet points
                      if (paragraph.trim().startsWith('•')) {
                        return (
                          <ul key={idx} className="list-disc list-inside space-y-1 ml-4">
                            {paragraph.split('\n').filter(line => line.trim()).map((line, i) => (
                              <li key={i} className="text-gray-700">
                                {line.replace('•', '').trim().split('**').map((part, j) => 
                                  j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                                )}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      
                      // Handle regular paragraphs with bold text
                      return (
                        <p key={idx} className="text-gray-700">
                          {paragraph.split('**').map((part, i) => 
                            i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-900">{part}</strong> : part
                          )}
                        </p>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">📝 Popis projektu</h3>
                  <p className="text-gray-600 italic">Detailní popis bude doplněn.</p>
                </div>
              )}

              {/* Video if exists */}
              {selectedProject.videoUrl && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
            <Video className="w-6 h-6 text-gray-900" />
            <h3 className="text-xl font-bold text-gray-900">Video dokumentace</h3>
          </div>
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
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-8 h-8 text-gray-900" />
          <h2 className="text-3xl font-bold text-gray-900">Metodologie výzkumu</h2>
        </div>
        <p className="text-lg text-gray-600 mb-8">
          Smíšený výzkumný design kombinující kvalitativní a kvantitativní přístupy pro ověření dopadu guerillových intervencí.
        </p>

        {/* Research Objectives */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-300 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-7 h-7 text-blue-900" />
            <h3 className="text-2xl font-bold text-blue-900">Cíl a výzkumné otázky</h3>
          </div>
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
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-7 h-7 text-green-900" />
            <h3 className="text-2xl font-bold text-green-900">Výzkumný design (Mixed-Methods)</h3>
          </div>
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
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-7 h-7 text-orange-900" />
            <h3 className="text-2xl font-bold text-orange-900">Protokol „před–během–po“</h3>
          </div>
          
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
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-7 h-7 text-cyan-900" />
            <h3 className="text-2xl font-bold text-cyan-900">Hodnotcí ukazatele (KPI)</h3>
          </div>
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
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-7 h-7 text-gray-900" />
          <h3 className="text-2xl font-bold text-gray-900">Harmonogram (12 týdnů)</h3>
        </div>
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
        <div className="flex items-center gap-2 mb-2">
          <Film className="w-7 h-7 text-gray-900" />
          <h2 className="text-2xl font-bold text-gray-900">Hlavní výstupy projektu</h2>
        </div>
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
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-6 h-6 text-gray-900" />
            <h3 className="text-xl font-bold text-gray-900">Doplněkové výstupy</h3>
          </div>
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
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-7 h-7 text-gray-900" />
          <h2 className="text-2xl font-bold text-gray-900">Časový plán projektu</h2>
        </div>
        <p className="text-gray-600 mb-6">Kompletní timeline od přípravy po finální prezentaci (2 roky)</p>
        
        {/* Visual Timeline */}
        <div className="mb-8 overflow-x-auto">
          <div className="min-w-[800px] relative">
            {/* Timeline bar */}
            <div className="flex items-center gap-1 mb-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex-1">
                  <div className={`h-3 bg-gradient-to-r ${item.color} rounded-full relative group cursor-pointer transition-all hover:h-4`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.phase}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Timeline labels */}
            <div className="flex items-start gap-1">
              {timeline.map((item, index) => (
                <div key={index} className="flex-1 text-center">
                  <div className="text-xs font-bold text-gray-900 mb-1">{item.phase}</div>
                  <div className="text-xs text-gray-600">{item.period}</div>
                </div>
              ))}
            </div>
            
            {/* Progress indicator */}
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Aktuálně: Zima 2025 - Přípravná fáze</span>
            </div>
          </div>
        </div>
        
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
      title: 'Křídové chodníky',
      description: 'Pouliční hry nakreslené křídou na asfaltu'
    },
    {
      src: import.meta.env.BASE_URL + 'projects/gallery/IMG_1719.png',
      title: 'Guerillová galerie',
      description: 'Umělecké výlepy v prázdných městských rámech'
    },
    {
      src: import.meta.env.BASE_URL + 'projects/gallery/IMG_2332.png',
      title: 'Houpačka',
      description: 'Instalace houpačky na zapomenutém sušáku'
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
              <div className="aspect-square bg-gray-100">
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
                <div className="aspect-square bg-gray-100">
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
