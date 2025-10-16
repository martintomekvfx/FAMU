function AV4Content() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4">LED/OLED - Digitalizace světla</h1>
        <p className="text-xl opacity-90">Světlo jako nové médium a kolonializace noci</p>
        <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-lg p-3 inline-block">
          <p className="text-sm font-semibold">📝 Domácí úkol / Prezentace</p>
        </div>
      </div>

      {/* Úvod */}
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg shadow-md border-l-4 border-blue-600">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Původní inspirace</h2>
        <div className="space-y-4 text-gray-700">
          <p className="text-lg">
            Původně v článku: sken fingerprintu, měnění neuronů, ambientní světlo...
          </p>
          <p className="mt-4 font-semibold text-blue-900">
            Pak jsem se nad tím zamyslel:
          </p>
          <div className="bg-white p-6 rounded-lg mt-3 border-2 border-blue-300">
            <p className="text-xl font-bold text-blue-900 mb-2">
              OLED a předchůdce LED nám vlastně změnili svět před očima
            </p>
          </div>
        </div>
      </section>

      {/* Digitalizace světla */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg shadow-lg border-2 border-yellow-400">
        <h2 className="text-3xl font-bold text-orange-900 mb-4">Světlo prošlo svou érou digitalizace</h2>
        
        <div className="space-y-4 text-gray-700">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg mb-3">
              <strong className="text-orange-900">Nyní světlo je packet</strong> - je to kus kódu, který definuje, jak má vypadat
            </p>
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-lg mt-3">
              <p className="text-xl font-bold text-center">
                Stal se programovatelným, dynamickým - novým médiem
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Jak venku, tak doma */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Jak venku, tak doma</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Vnitř */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-lg border-2 border-green-400">
            <h3 className="text-2xl font-bold text-green-900 mb-4">🏠 Vnitř</h3>
            
            <div className="space-y-4 text-gray-700">
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-green-900 mb-2">Programovatelné světlo:</p>
                <p>Máme možnost měnit světelné podmínky vnitřních prostorů příkazem</p>
                <p className="mt-2 text-sm italic">Teplé vs. studené světlo</p>
              </div>

              <div className="bg-green-100 p-4 rounded-lg">
                <p className="font-semibold mb-2">Nové možnosti:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Ambientní osvětlení</li>
                  <li>• Ohebné displeje</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-teal-100 p-4 rounded-lg">
                <p className="font-bold text-green-900 mb-2">Displeje budeme mít stále více spojené s realitou:</p>
                <ul className="space-y-1 ml-4 text-sm">
                  <li>• Obrazovka</li>
                  <li>• Chytrá realita</li>
                  <li>• Virtual production</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Venku */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-400">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">🌃 Venku</h3>
            
            <div className="space-y-4 text-gray-700">
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-blue-900 mb-2">Změnily se veřejná osvětlení:</p>
                <p>Tak moc, že to jde vidět z vesmíru</p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <p className="font-semibold text-red-900 mb-2">Dopady na živé organismy:</p>
                <ul className="space-y-2 ml-4">
                  <li>• Na to reagují i zvířata a lidé</li>
                  <li>• <strong>Více modrého světla = méně melatoninu</strong></li>
                  <li>• Květiny to může stimulovat k jinému ročnímu období</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border-2 border-purple-400">
                <p className="text-lg font-bold text-purple-900 text-center">
                  Kolonializace noci
                </p>
                <p className="mt-2 text-sm">Máme větší moc nad pozorností lidí a pravem na tmu</p>
                <p className="mt-2 text-sm font-semibold text-red-700">Zvětšil se světelný smog</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LED/OLED jako médium reprezentace */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg shadow-lg border-2 border-purple-400">
        <h2 className="text-3xl font-bold text-purple-900 mb-4">LED/OLED jako médium reprezentace reality</h2>
        
        <div className="space-y-4 text-gray-700">
          <p className="text-lg">
            Můžeme říct, že v tenhle moment <strong className="text-purple-900">LED a OLED technologie je nejvíc užité médium 
            na reprezentaci reality</strong>
          </p>

          <div className="bg-white p-6 rounded-lg">
            <p className="mb-3">
              Vznikly proto určité protokoly, na kterých se lidstvo shodlo, že to je ta správná reprezentace reality:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-blue-100 p-4 rounded-lg border-2 border-blue-400">
                <h3 className="text-xl font-bold text-blue-900 mb-2">sRGB</h3>
                <p className="text-sm">Standard RGB color space</p>
              </div>
              
              <div className="bg-green-100 p-4 rounded-lg border-2 border-green-400">
                <h3 className="text-xl font-bold text-green-900 mb-2">Rec709</h3>
                <p className="text-sm">ITU-R Recommendation BT.709</p>
              </div>
            </div>

            <p className="mt-4 font-semibold text-purple-900">
              To jsou tedy dva color spaces, které jsou správná reprezentace těch barev
            </p>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
            <p className="text-lg mb-3">
              <strong>Člověk totiž vidí mnohem větší gamut barev, než dovoluje zobrazit monitor</strong>
            </p>
            <p className="mb-3">Shodli jsme se proto na tomhle jako lidstvo</p>
            
            <div className="bg-white p-4 rounded-lg mt-3">
              <p className="text-red-700 font-semibold">
                → Optimalizujeme pak realitu, aby vypadala co nejlépe v digitálním světě
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Okna do perfektní reality */}
      <section className="bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 p-8 rounded-lg shadow-xl border-2 border-cyan-400">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 mb-6">
            Zároveň tyhlety digitální nosiče jsou okna do perfektní reality, která neexistuje
          </h2>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg inline-block">
            <p className="text-xl text-gray-700 italic">
              Vytváříme standardy reprezentace světa, který je bohatší, než dokážeme zobrazit
            </p>
          </div>
        </div>
      </section>

      {/* Shrnutí pro prezentaci */}
      <section className="bg-gradient-to-br from-slate-100 to-gray-200 p-8 rounded-xl shadow-lg border-2 border-gray-300">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">📋 Shrnutí pro prezentaci</h2>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
            <h3 className="text-xl font-bold mb-2 text-purple-900">1. Digitalizace světla</h3>
            <p className="text-gray-700">Světlo jako packet, kus kódu - programovatelné, dynamické, nové médium</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
            <h3 className="text-xl font-bold mb-2 text-green-900">2. Vnitřní prostory</h3>
            <p className="text-gray-700">Programovatelné světlo, ambientní osvětlení, ohebné displeje, virtual production</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-xl font-bold mb-2 text-blue-900">3. Venkovní prostory</h3>
            <p className="text-gray-700">Viditelné z vesmíru, dopady na zvířata a lidi, kolonializace noci, světelný smog</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
            <h3 className="text-xl font-bold mb-2 text-orange-900">4. Standardy reprezentace</h3>
            <p className="text-gray-700">sRGB a Rec709 - lidstvo se shodlo na "správné" reprezentaci reality</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
            <h3 className="text-xl font-bold mb-2 text-red-900">5. Paradox</h3>
            <p className="text-gray-700">Optimalizujeme realitu pro digitální svět, ale displeje jsou okna do perfektní reality, která neexistuje</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AV4Content;
