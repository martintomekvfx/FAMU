// Data structure for subjects and their classes
export const subjects = [
  {
    id: 'ddf',
    name: 'DDF - Dějiny dokumentárního filmu',
    shortName: 'DDF',
    description: 'Zimní semestr 2025/26',
    color: 'blue',
    classes: [
      {
        id: 1,
        date: '1. 10.',
        lecturer: 'Tomáš Hirt',
        title: 'Historické výkladové rámce, vývoj definice pojmu DF a „non-fiction"',
        description: 'Historické výkladové rámce, vývoj definice pojmu DF a „non-fiction", estetické a společenské kontexty, konstituce samostatné disciplíny.',
      },
      {
        id: 2,
        date: '8. 10.',
        lecturer: 'Tomáš Hirt',
        title: 'Sovětská montážní škola',
      },
      {
        id: 3,
        date: '15. 10.',
        lecturer: 'Hana Muchová',
        title: 'Etnografický film po II. světové válce',
      },
      {
        id: 4,
        date: '22. 10.',
        lecturer: 'David Čeněk',
        title: 'První „actualités" – bratři Lumièrové',
        description: 'Etnografické a vědecké filmy. Dokumentární produkce v období rané kinematografie (do let 1908-1910).',
      },
      {
        id: 5,
        date: '5. 11.',
        lecturer: 'Alice Růžičková',
        title: 'Regionální fokus na Československo 1918-1939',
        description: 'Dokument a instituce, dokument a reklama, dokument a umění.',
      },
      {
        id: 6,
        date: '12. 11.',
        lecturer: 'Petr Kubica',
        title: 'Československé poválečné filmy',
        description: 'Tematizující válečnou zkušenost – příklady a diskurzy reflexe s odstupem.',
      },
      {
        id: 7,
        date: '19. 11.',
        lecturer: 'David Čeněk',
        title: 'Vlna poetismu a romantismu',
        description: 'Robert Flaherty, Ernest B. Schoedsack a Merian C. Cooper, Jean Epstein.',
      },
      {
        id: 8,
        date: '26. 11.',
        lecturer: 'David Čeněk',
        title: 'Třetí avantgarda a její dokumentární pohled',
        description: 'Městské symfonie. Joris Ivens, Jean Epstein, René Clair, Luis Buñuel.',
      },
      {
        id: 9,
        date: '3. 12.',
        lecturer: 'David Čeněk',
        title: 'Dokumentární film a státní agenda',
        description: 'Nový model institucionální praxe: John Grierson a Britská dokumentární škola.',
      },
      {
        id: 10,
        date: '10. 12.',
        lecturer: 'Alice Růžičková',
        title: 'Poválečná konstituce dokumentu',
        description: 'V kontextu umělecké kinematografie – příklady a kontext Československa.',
      },
      {
        id: 11,
        date: '17. 12.',
        lecturer: 'David Čeněk',
        title: 'Rozvoj politického dokumentárního filmu',
        description: 'Bída v Borinage, Země bez chleba. Témata na okraji.',
      },
      {
        id: 12,
        date: '7. 1.',
        lecturer: 'Petr Kubica',
        title: 'Československo 60. let a dokument I.',
      },
    ],
    links: [
      {
        name: 'Studijní opory FAMU',
        url: 'https://kdt.famu.cz/studijni-opory/',
      },
    ],
  },
  {
    id: 'av',
    name: 'AV - Audiovizuální studia',
    shortName: 'AV',
    description: 'Poznámky z přednášek',
    color: 'purple',
    classes: [
      {
        id: 1,
        date: '2025',
        lecturer: 'AV přednášející',
        title: 'Otázka reprezentace',
        description: 'Fenomenologie, reprezentace, Plato, Kant, Nietzsche, Whitehead a další.',
      },
      {
        id: 2,
        date: '2025',
        lecturer: 'AV přednášející',
        title: 'Ballard, Žižek a kritika přítomnosti',
        description: 'J.G. Ballard, Slavoj Žižek, habitualizace, politika percepce.',
      },
    ],
    links: [],
  },
  {
    id: 'ai',
    name: 'AI - Umělá inteligence',
    shortName: 'AI',
    description: 'Poznámky z přednášek o AI',
    color: 'green',
    classes: [
      {
        id: 1,
        date: '2. 16.',
        lecturer: 'ditamorg@gmail.com',
        title: 'Emergentní jevy a AlphaGo',
        description: 'Emergentní jevy, fázové jevy, Lee Sedol vs AlphaGo',
      },
    ],
    links: [],
  },
];

// Obecné poznámky - separate from subjects
export const generalNotes = {
  id: 'general',
  name: 'Obecné poznámky',
  shortName: 'Poznámky',
  description: 'Různé důležité informace',
  icon: '📝',
  classes: [
    {
      id: 1,
      date: '2025/26',
      lecturer: 'Různé',
      title: 'Důležité termíny a informace',
      description: 'Konzultační díla, pedagogická praxe, termíny akcí.',
    },
  ],
};

// Helper function to get subject by ID
export const getSubjectById = (id) => {
  if (id === 'general') return generalNotes;
  return subjects.find((subject) => subject.id === id);
};

// Helper function to get class by subject ID and class ID
export const getClassById = (subjectId, classId) => {
  const subject = getSubjectById(subjectId);
  if (!subject) return null;
  return subject.classes.find((cls) => cls.id === parseInt(classId));
};
