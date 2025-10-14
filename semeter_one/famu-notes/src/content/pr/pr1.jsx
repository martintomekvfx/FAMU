export default function PR1() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Profesní rozvoj - Dotace a granty</h1>
      <p className="text-gray-600">
        <strong>Vyučující:</strong> LUKÁČOVÁ M. | <strong>Čas:</strong> Úterý 17:20-18:55 | <strong>Místnost:</strong> LAZ-423
      </p>

      <hr className="my-8" />

      <h2>📋 Přehled dotací a možností</h2>

      <h3>🎓 Školní dotace</h3>
      <p>
        <strong>Dvě školní dotace</strong> - tyto dotace si zkusím podat.
      </p>

      <h3>🎨 Multi AMU dotace</h3>
      <p>
        Multi AMU dotace - kterou asi nemůžu využít (specifické podmínky).
      </p>

      <h3>🏛️ Grant kultury Prahy 8</h3>
      <p>
        <strong>Cíl:</strong> Chtěl bych získat grant kultury Prahy 8 pro svůj projekt.
      </p>

      <hr className="my-8" />

      <h2>👤 Status umělce</h2>

      <h3>📝 Národní registr umělců</h3>
      <ul>
        <li><strong>Novinka:</strong> REGIST - systém, do kterého se dá zalogovat za 1000 Kč</li>
        <li>Po registraci můžeš lépe žádat o stipendium</li>
        <li>Národní plán zlepšení</li>
      </ul>

      <h3>💡 Kreativní vouchery</h3>
      <p>
        Možnost získat podporu přes kreativní vouchery.
      </p>

      <hr className="my-8" />

      <h2>💰 Profesionální granty</h2>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
        <p className="font-semibold">⏰ Důležité:</p>
        <p>Profesionální umělecké granty - <strong>všechny granty jsou vyhlašovány na podzim!</strong></p>
      </div>

      <hr className="my-8" />

      <h2>🔗 Užitečné odkazy</h2>

      <ul>
        <li>
          <a 
            href="https://www.mk.gov.cz/zadosti-o-dotace-cs-2023" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            MK ČR - Žádosti o dotace
          </a>
        </li>
        <li>
          <a 
            href="https://mk.gov.cz/oborova-dotacni-rizeni-na-rok-2026-vyhlasovaci-podminky" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Oborová dotační řízení na rok 2026 - vyhlašovací podmínky
          </a>
        </li>
      </ul>

      <hr className="my-8" />

      <h2>📌 Akční body</h2>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
        <ul className="list-none space-y-2">
          <li>✅ Zkusit podat dvě školní dotace</li>
          <li>✅ Zvážit grant kultury Prahy 8</li>
          <li>✅ Registrace do národního registru umělců (1000 Kč)</li>
          <li>✅ Sledovat výzvy na podzim pro profesionální granty</li>
          <li>✅ Prozkoumat kreativní vouchery</li>
        </ul>
      </div>
    </div>
  );
}
