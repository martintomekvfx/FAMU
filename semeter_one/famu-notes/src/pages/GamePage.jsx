import { Link } from 'react-router-dom';
import { ArrowLeft, Gamepad2 } from 'lucide-react';

function GamePage() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gray-950 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:text-gray-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zpět
          </Link>
          
          <div className="flex items-center gap-4">
            <Gamepad2 className="w-10 h-10" />
            <div>
              <h1 className="text-2xl font-bold">🍺 Skrytá hra - běSnění</h1>
              <p className="text-gray-400 text-sm">Easter egg pro ty, kdo znají tajemství piva...</p>
            </div>
          </div>
        </div>
      </header>

      {/* Game Container */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden border-2 border-orange-500">
            <iframe 
              frameBorder="0" 
              src="https://itch.io/embed-upload/15110547?color=802020" 
              allowFullScreen={true}
              width="100%" 
              height="660"
              className="w-full"
              title="běSnění Game"
            >
              <a href="https://jamiiethetrashman.itch.io/besneni">Play běSnění on itch.io</a>
            </iframe>
          </div>
          
          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>🍺 Našel jsi Easter egg! 🎮</p>
            <p className="mt-2">3 kliknutí na pivo = hra odhalena</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default GamePage;
