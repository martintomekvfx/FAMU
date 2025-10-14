import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Beer } from 'lucide-react';

function BeerButton() {
  const [showMessage, setShowMessage] = useState(false);
  const [showBeers, setShowBeers] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  // Reset po 5 sekundách nečinnosti
  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => {
        setClickCount(0);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  const handleBeerClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 3) {
      // Easter egg! Přesměruj na hru
      navigate('/secret-game');
      setClickCount(0); // Reset
    } else {
      // Normální chování - zobraz beerware message
      setShowMessage(true);
      setShowBeers(true);

      // Skryj zprávu po 4 sekundách
      setTimeout(() => setShowMessage(false), 4000);
      // Skryj piva po animaci
      setTimeout(() => setShowBeers(false), 5000);
    }
  };

  return (
    <>
      {/* Floating Beer Button - NAHOŘE VPRAVO */}
      <button
        onClick={handleBeerClick}
        className="fixed top-4 right-4 z-50 bg-amber-500 text-white rounded-full p-3 shadow-lg transition-transform hover:scale-110"
        title="🍺 Pozvi Martina na pivo!"
      >
        <Beer className="w-6 h-6" />
      </button>

      {/* Beerware Message */}
      {showMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4 rounded-lg shadow-2xl max-w-md animate-bounce">
            <div className="text-center">
              <div className="text-4xl mb-2">🍺</div>
              <h3 className="font-bold text-xl mb-2">BEERWARE LICENSE</h3>
              <p className="text-sm mb-2">
                Pokud se ti poznámky líbí a potkáš Martina,<br />
                můžeš ho pozvat na pivo! 🍻
              </p>
              <p className="text-xs opacity-90">
                🎓 Martin Tomek - FAMU 2025
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Falling Beers */}
      {showBeers && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl beer-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              🍺
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default BeerButton;
