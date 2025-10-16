function AV3Content() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4">K čemu je umělcům věda?</h1>
        <p className="text-xl opacity-90">Věda, umění a artistic research</p>
      </div>

      {/* Úvod - K čemu je umělcům věda */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">K čemu je umělcům věda?</h2>
        <div className="space-y-4 text-gray-700">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-semibold mb-2">Možné odpovědi:</p>
            <ul className="space-y-2 ml-4">
              <li>• K využití technologií</li>
              <li>• K zaštítění nějakého tématu</li>
              <li>• Nějaký základ, od kterého se odvíjí umělecká praxe</li>
              <li>• <strong>Artistic research?</strong></li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold mb-2">Věda jako zdroj:</p>
            <ul className="space-y-2 ml-4">
              <li>• Věda umí generovat nová média</li>
              <li>• Věda jako data a materiál pro zpracování uměleckého díla</li>
              <li>• Inspirace</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Autorita vědy */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-purple-600">
        <h2 className="text-2xl font-bold text-purple-900 mb-4">Autorita vědy</h2>
        <div className="space-y-4 text-gray-700">
          <p className="text-lg">
            <strong>Co se stane, když věda vstupuje s autoritou?</strong> Když je vědecká teorie potvrzena?
          </p>
          <p>Pak to vychází z reality a je to potvrzené, že to existuje - <strong className="text-purple-900">legitimizuje</strong></p>

          <div className="bg-white p-4 rounded-lg">
            <p className="font-bold text-purple-900 mb-2">Věda má autoritu, kterou umění asi tolik nemá</p>
            <p className="text-red-700 font-semibold">Je to mocenská figura</p>
          </div>

          <p>
            Věda si to moc neuvědomovala - což se děje posledních 50 let, a to vědu proměňuje.
          </p>
          <p>
            Ve chvíli, kdy umělec vstupuje do společnosti s tím co děláme, když se odvoláváme na vědu, 
            tak používáme její autoritu.
          </p>
        </div>
      </section>

      {/* Heidegger - Kritika vědy */}
      <section className="bg-gradient-to-br from-gray-50 to-slate-100 p-6 rounded-lg shadow-lg border-2 border-gray-400">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Martin Heidegger - Kritika vědy</h2>
        
        <div className="space-y-4 text-gray-700">
          <div className="bg-white p-4 rounded-lg">
            <p>Dříve než se začalo mluvit o krizi reprezentace, byla kritika vědy zevnitř filosofie</p>
            <p className="mt-2 italic">Někdo vybízí učence, aby se dívali k věcem samotným</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">V 50. letech Heidegger píše:</h3>
            <p className="text-lg font-semibold">Kniha: <span className="text-blue-900">Otázka techniky</span></p>
            <p className="mt-2 italic">Poslední z velkých platoniků s ambicí dozvědět se pravdu</p>
          </div>

          <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 rounded-lg border-2 border-gray-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Jeho text: VĚC</h3>
            <p className="text-lg mb-3">Rozlišuje dva pojmy, které se dají použít na kritiku vědy:</p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-blue-100 p-4 rounded-lg border-2 border-blue-400">
                <h4 className="text-xl font-bold text-blue-900 mb-2">OBJEKT (Object)</h4>
                <p className="mb-2">Něco, co lze plně vysvětlit vědeckým způsobem</p>
                <p className="text-sm italic">Hrníček má rozměry, tvar, chemické složení - dá se vysvětlit sociologicky, přírodovědně</p>
              </div>
              
              <div className="bg-green-100 p-4 rounded-lg border-2 border-green-400">
                <h4 className="text-xl font-bold text-green-900 mb-2">VĚC (Thing)</h4>
                <p className="mb-2">Hrníček je vždy pouze víc než vědecký objekt</p>
                <p className="text-sm italic">To věda ignoruje - a to liší věc od objektu</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg">
            <h4 className="font-bold text-lg mb-3">Ilustrace na hliněném džbánu:</h4>
            <p className="mb-2">Můžeme to vzít jako objekt a vysvětlit...</p>
            <p className="mb-2">Ale zároveň je nositelem něčeho:</p>
            <ul className="space-y-2 ml-4">
              <li>• Vztah k zemi, ze které je hlína</li>
              <li>• V antropologickém smyslu je prostředkem, médiem pohostinnosti</li>
              <li>• Určitá duchovní rovina</li>
            </ul>
            <p className="mt-3 font-semibold text-red-700">Věda tyto přístupy odsouva stranou a bere je jako barbarské</p>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold mb-2">Příklad: Plechovka Coca-Coly</h4>
            <p>Jedna jako druhá na páse, nemá individualitu</p>
            <p className="mt-2 font-semibold">Vidí mezi věcí a objektem esenciální rozdíl</p>
          </div>
        </div>
      </section>

      {/* Předmět vs Věc */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-orange-900 mb-4">Předmět je to, čemu se podaří stát se věcí</h2>
        
        <div className="space-y-4 text-gray-700">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-3">Příklad: Coca-Cola</h3>
            <p>Coca-Cola - odosob něná, multiplicitní...</p>
            <p className="mt-2">Dokud třeba ta lahev nevypadne z letadla, a z toho objektu se stane něco 
            až nábožensky nabitého, duchovního</p>
          </div>

          <div className="bg-red-100 p-6 rounded-lg border-l-4 border-red-600">
            <h3 className="font-bold text-lg mb-3">Příklad: Raketoplán Challenger</h3>
            <p>Je to jen raketa, pak umřeli lidi...</p>
            <p className="mt-2 font-semibold">A tím, jak to zkoumáš, tak z toho děláš tu věc</p>
          </div>

          <p className="bg-orange-100 p-4 rounded-lg text-lg font-bold text-center">
            Věc má lidské zájmy
          </p>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="italic">Báseň: <strong>Jiří Wolker - Věci</strong></p>
          </div>
        </div>
      </section>

      {/* Eliminativní materialismus */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Eliminativní materialismus</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Je vědecký postoj, který říká: Ano, kromě různých měřitelných jevů máme spoustu neměřitelných 
            pojmů platných v kultuře, každodennosti, než v přímé vědě
          </p>
          <p className="font-semibold">Postupem času věda vede k objektivnímu vysvětlení všeho</p>
          <p className="italic">Jak pojmout to, co věda ignorovala?</p>
        </div>
      </section>

      {/* Paul Feyerabend */}
      <section className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border-2 border-indigo-400">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">Americký epistemolog Paul Feyerabend</h2>
        
        <div className="space-y-4 text-gray-700">
          <p>Autor anarchistické metody výzkumu: <strong>"Věda jako umění"</strong></p>
          <p>Dospívá k postoji, který si pak přijali kritici postmoderny</p>

          <div className="bg-white p-6 rounded-lg">
            <p className="mb-2">Když nemám univerzální pravdu, tak můžeme říkat úplně cokoliv</p>
            <p className="mb-2">Když není objektivní pravda, tak objektivní neplatí</p>
            
            <div className="bg-red-100 p-4 rounded-lg mt-3">
              <p className="text-2xl font-bold text-red-900 text-center">"Anything goes"</p>
              <p className="mt-2 text-sm">
                Je to druh rezignace - že můžeme psát o osvětě básně a vyjde to nastejno jako věda
              </p>
            </div>
          </div>

          <p className="bg-yellow-50 p-4 rounded-lg">
            <strong>Je to tedy nepochopení toho, co poststrukturalismus říkal</strong>
          </p>
          <p>Propadají k relativismu absolutistickým způsobem, než dělat relativismus relativisticky</p>
        </div>
      </section>

      {/* Bruno Latour */}
      <section className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-lg shadow-lg border-2 border-cyan-400">
        <h2 className="text-3xl font-bold text-cyan-900 mb-4">Bruno Latour</h2>
        <p className="text-xl mb-6">Francouzský filosof a sociolog</p>
        
        <div className="space-y-4 text-gray-700">
          <div className="bg-white p-4 rounded-lg">
            <p className="font-semibold">Vzdělaní: Antropolog</p>
            <p className="mt-2">Napsal článek: <span className="italic">"Coming Out as a Philosopher"</span></p>
          </div>

          <div className="bg-cyan-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Velká událost na začátku jeho díla:</h3>
            <p className="text-2xl font-bold text-cyan-900">Laboratory Life</p>
            <p className="mt-2 text-sm italic">Ještě jedna dřívější práce - studia sakrálních obrazů</p>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Vědecký obraz vs. sakrální obraz</h3>
            <p className="mb-2">Jde mu touha o pravdu</p>
            <p className="mb-3">Zjišťuje, že pravda je přítomna ve více případech</p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2">Informační režim</h4>
                <p className="text-sm">Druhý text, který označuje jako "nulový stupeň rukopisu" - 
                tam, kde je stilizace textu potlačena</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-green-900 mb-2">Transformační režim</h4>
                <p className="text-sm mb-2">Důvod sakrálních obrazů - transformovat člověka, 
                udělat z nich lepšího člověka</p>
                <p className="text-sm font-semibold">Další: kdy je transformační důležitější než informativní</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="font-semibold mb-2">Kde je transformační režim důležitější:</p>
            <ul className="space-y-2 ml-4">
              <li>• <strong>Umění</strong> (pracuje s reprezentacemi - ne vždy)</li>
              <li>• <strong>Politika</strong></li>
            </ul>
            <p className="mt-3 italic">Transformační režim se nerovná pravda</p>
            <p className="mt-2 text-sm">Ve světě, kde neexistuje lež, se baví dokumenty o minulosti</p>
          </div>
        </div>
      </section>

      {/* Laboratory Life */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg shadow-lg border-2 border-purple-400">
        <h2 className="text-3xl font-bold text-purple-900 mb-4">Laboratory Life</h2>
        <p className="text-xl mb-6 italic">Etnologové pozorovali vědce tak jako domorodce</p>
        
        <div className="space-y-4 text-gray-700">
          <p className="text-lg font-semibold">Zajímavé je, jak domněnky se mění v tvrdá fakta</p>

          <div className="bg-white p-6 rounded-lg">
            <p className="mb-3">Když se ptali vědců, jak rozumí své práci - důležitý talent a pracovitost etc.</p>
            <p className="font-semibold text-purple-900">
              Latour s Woolgar si všimli, že je nejméně důležité:
            </p>
            <ul className="space-y-2 ml-4 mt-2">
              <li>• Kromě vědců jsou také různé motivy, proč to dělají</li>
              <li>• Velkou roli hrají nástroje, záznamové techniky</li>
              <li>• Když něco měří, srovnávají, testují etc.</li>
            </ul>
          </div>

          <div className="bg-purple-100 p-4 rounded-lg">
            <p className="font-bold mb-2">Latour to pak dodatečně artikuluje:</p>
            <p>Že vědci chovají hluboce zakořeněné ontologické předpoklady</p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-600">
            <p className="font-bold text-red-900 mb-2">Evidence-based research:</p>
            <p>Má v sobě tuhle slepotu - třídit realitu na to podstatné a nepodstatné</p>
            <p className="mt-2 font-semibold">V samotném srdci vědy používají mocenský nástroj</p>
          </div>
        </div>
      </section>

      {/* Matters of facts vs concerns */}
      <section className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-lg shadow-lg border-2 border-green-400">
        <h2 className="text-3xl font-bold text-green-900 mb-4">Později Latour zavádí dva pojmy</h2>
        
        <div className="space-y-4 text-gray-700">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-100 p-6 rounded-lg border-2 border-blue-400">
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Matters of facts</h3>
              <p className="text-lg">FAKTA</p>
            </div>
            
            <div className="bg-orange-100 p-6 rounded-lg border-2 border-orange-400">
              <h3 className="text-2xl font-bold text-orange-900 mb-2">Matters of concern</h3>
              <p className="text-lg">ZÁJMY</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg mt-4">
            <p className="mb-2">Vědci se zajímali a soustředili na <strong>fakta</strong></p>
            <p className="mb-2">Programově vylučovali <strong>zájmy</strong></p>
            <p className="text-sm italic">Ať už osobní, nebo tělesné, nebo společenské zájmy</p>
          </div>

          <div className="bg-gradient-to-r from-red-100 to-orange-100 p-6 rounded-lg border-2 border-red-400">
            <p className="text-lg font-bold text-red-900 mb-3">
              Latour si dal důslednou práci, kde ukazuje, jak ta politika a zájmy do té vědy vstupovali
            </p>
            <p className="text-xl font-bold text-center">
              Že tam ta politika v té vědě vždy byla
            </p>
          </div>

          <div className="bg-teal-50 p-6 rounded-lg">
            <h4 className="font-bold text-lg mb-3">Příklad: Osud francouzského mořeplavce</h4>
            <p className="mb-2">Příběh spočívá v sázce o tom, zestli je Sachalin ostrov nebo poloostrov</p>
            <p className="mb-2">Týpek se vydal zmapovat to a vrátil se</p>
            <p className="font-semibold text-teal-900">
              Ilustrace toho, jak vědecké poznání využívá zájmy
            </p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="font-bold mb-2">Další způsob, jak vyjádřit:</p>
            <p className="mb-2">Odmítání politického</p>
            <p className="text-lg font-semibold">Věda má v sobě agonistický moment</p>
            <p className="mt-2 italic">
              Musíš sehnat ty spojence v rámci nástrojů, díky kterým porazíme oponenta - 
              myšlenkového a nebo ignoranta
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <p className="font-semibold">Druhy vědeckých objevů</p>
            <p className="mt-2">Zdroj: <span className="text-blue-600">theconversation.com</span></p>
            <p className="mt-2 italic">Sledovat nějakou kauzu a problém a sledovat, jak se o tom píše</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AV3Content;
