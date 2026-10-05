/* =========================================================
   MITE ASISTENTE - EDICIÓN HUMANIA GLOBAL SYSTEMS
   Versión: 4.3 (Glosario Enciclopédico de Lore + Tono Institucional)
   Autor: Nexo (Ingeniero Principal) | Clan UPROTA & Universo Proiectio
   0 KB Dependencies | Vanilla JS Puro | 60-120 FPS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function() {
    if (window.miteInitialized) return;
    window.miteInitialized = true;

    // 1. INYECCIÓN DE ESTILOS CSS (PALETA CORPORATIVA HUMANIA & MITE)
    const style = document.createElement('style');
    style.innerHTML = `
        #mite-widget { 
            position: fixed; bottom: 20px; right: 20px; z-index: 9999; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
        }
        #mite-bubble { 
            width: 78px; height: 78px; cursor: pointer; 
            transition: transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28); 
            filter: drop-shadow(0 6px 18px rgba(0, 195, 255, 0.45)); 
            animation: breathingMite 4s ease-in-out infinite;
        }
        #mite-bubble:hover {
            transform: scale(1.1) rotate(5deg);
            filter: drop-shadow(0 8px 25px rgba(0, 195, 255, 0.75));
        }

        @media (max-width: 768px) {
            #mite-bubble { width: 70px; height: 70px; }
        }

        @keyframes breathingMite {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(4deg) scale(1.06); filter: drop-shadow(0 10px 25px rgba(0, 195, 255, 0.7)); }
            100% { transform: rotate(0deg) scale(1); }
        }

        #chat-window { 
            position: fixed; bottom: 105px; right: 20px; width: 345px; 
            max-width: calc(100vw - 32px); height: 500px; max-height: 80vh;
            background: #ffffff; border-radius: 20px; 
            box-shadow: 0 20px 60px rgba(8, 28, 46, 0.35), 0 0 1px rgba(0,0,0,0.1); 
            display: none; flex-direction: column; overflow: hidden; 
            border: 1px solid rgba(197, 160, 89, 0.4); font-size: 0.85rem;
            animation: popUpMite 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
        @keyframes popUpMite { from { transform: scale(0.7) translateY(40px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }

        .chat-header { 
            background: linear-gradient(135deg, #081c2e 0%, #0d2b45 100%); 
            border-bottom: 2px solid #c5a059;
            color: #f8fafc; padding: 13px 16px; font-weight: bold; 
            display: flex; justify-content: space-between; align-items: center; 
            box-shadow: 0 2px 10px rgba(8, 28, 46, 0.3);
            flex-shrink: 0;
        }
        .chat-header-title { display: flex; align-items: center; gap: 8px; font-size: 0.95rem; }
        .chat-header-status { width: 8px; height: 8px; background: #00ff88; border-radius: 50%; box-shadow: 0 0 8px #00ff88; }
        .chat-header-sub { font-size: 0.68rem; color: #c5a059; font-weight: 500; letter-spacing: 1px; }
        
        .chat-body { 
            flex: 1; overflow-y: auto; padding: 14px; 
            background: #f8fafc; scroll-behavior: smooth; 
            display: flex; flex-direction: column; gap: 8px;
        }

        .mite-msg { 
            background: #ffffff; padding: 10px 14px; 
            border-radius: 16px 16px 16px 2px; 
            color: #1e293b; line-height: 1.48; 
            box-shadow: 0 2px 6px rgba(0,0,0,0.04);
            border: 1px solid #e2e8f0;
            animation: fadeInMsg 0.25s ease-out; 
            max-width: 92%;
            word-break: break-word;
        }
        .user-msg { 
            background: linear-gradient(135deg, #0d2b45 0%, #1e4976 100%); 
            padding: 10px 14px; border-radius: 16px 16px 2px 16px; 
            color: #ffffff; text-align: right; margin-left: auto; 
            max-width: 85%; font-weight: 500;
            border-right: 3px solid #c5a059;
            box-shadow: 0 3px 8px rgba(8, 28, 46, 0.2);
            animation: fadeInMsg 0.25s ease-out;
            word-break: break-word;
        }
        
        .mite-typing {
            display: inline-flex; align-items: center; gap: 5px;
            font-style: italic; color: #64748b; background: #f1f5f9;
            padding: 8px 14px; border-radius: 16px 16px 16px 2px;
            border: 1px solid #e2e8f0; animation: fadeInMsg 0.2s;
            width: fit-content;
        }
        .typing-dot {
            width: 5px; height: 5px; background: #00c3ff;
            border-radius: 50%; display: inline-block;
            animation: dotBlink 1.4s infinite both;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dotBlink {
            0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
            40% { opacity: 1; transform: scale(1.3); }
        }

        /* Barra de Botones Rápidos Humania */
        .chat-options { 
            padding: 6px 10px; border-top: 1px solid #e2e8f0; 
            background: #ffffff; display: flex; flex-wrap: wrap; gap: 4px; 
            flex-shrink: 0;
        }
        .opt-btn { 
            flex: 1 1 calc(50% - 4px); background: #f8fafc; border: 1px solid #e2e8f0; 
            color: #081c2e; padding: 6px 8px; border-radius: 8px; 
            font-size: 0.72rem; font-weight: 600; cursor: pointer; 
            transition: all 0.2s; text-align: center; white-space: nowrap;
        }
        .opt-btn:hover { 
            background: #081c2e; color: #c5a059; border-color: #c5a059; 
            transform: translateY(-1px); 
        }

        /* Barra de Entrada de Texto */
        .chat-input-row {
            padding: 8px 10px; background: #ffffff;
            border-top: 1px solid #e2e8f0; display: flex;
            gap: 6px; align-items: center; flex-shrink: 0;
        }
        #mite-input-field {
            flex: 1; padding: 8px 14px; border: 1px solid #cbd5e1;
            border-radius: 20px; font-size: 0.82rem; outline: none;
            transition: border-color 0.2s, box-shadow 0.2s; font-family: inherit;
        }
        #mite-input-field:focus {
            border-color: #c5a059; box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.2);
        }
        #mite-send-button {
            width: 34px; height: 34px; background: #081c2e; color: #c5a059;
            border: 1px solid #c5a059; border-radius: 50%; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            font-size: 0.85rem; transition: all 0.2s;
            flex-shrink: 0;
        }
        #mite-send-button:hover { background: #c5a059; color: #081c2e; transform: scale(1.08); }
        #mite-send-button:active { transform: scale(0.95); }
        
        @keyframes fadeInMsg { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);

    // 2. INYECCIÓN DE ESTRUCTURA HTML CORPORATIVA
    const widget = document.createElement('div');
    widget.id = 'mite-widget';
    widget.innerHTML = `
        <div id="chat-window">
            <div class="chat-header">
                <div class="chat-header-title">
                    <span class="chat-header-status"></span>
                    <div>
                        <div>MITE Asistente</div>
                        <div class="chat-header-sub">GUÍA INSTITUCIONAL HUMANIA</div>
                    </div>
                </div>
                <span id="close-chat" style="cursor:pointer; font-size:1.3rem; line-height:1; color:#c5a059;">&times;</span>
            </div>

            <div class="chat-body" id="chat-log">
                <div class="mite-msg">¡Zashoom! Soy Mite. 💎 Tu guía interactiva y glosario institucional en Humania Global Systems. Pregúntame sobre cualquier término, protocolo, personal de Humania o tecnología (CNB-3, Red A.N.I.M.A., SPN, Zero-Time, Vance, Valerius). ¡Escríbeme o elige una opción! ¡Ding-Pum!</div>
            </div>

            <div class="chat-options" id="mite-options-bar">
                <button class="opt-btn" onclick="miteResponder('humania')">🏛️ ¿Qué es Humania?</button>
                <button class="opt-btn" onclick="miteResponder('cnb3')">🧠 Chip CNB-3</button>
                <button class="opt-btn" onclick="miteResponder('seguridad')">🛡️ Paz Preventiva</button>
                <button class="opt-btn" onclick="miteResponder('solaris')">⚡ Solaris & Velvet</button>
                <button class="opt-btn" onclick="miteResponder('pretorianos')">⚔️ Pretorianos</button>
                <button class="opt-btn" onclick="miteResponder('secreto')">🐰 Curiosidades</button>
            </div>

            <div class="chat-input-row">
                <input type="text" id="mite-input-field" placeholder="Consulta cualquier término, protocolo o figura..." maxlength="140" autocomplete="off">
                <button id="mite-send-button" title="Enviar consulta">➤</button>
            </div>
        </div>
        
        <img src="multimedia/mite.webp" id="mite-bubble" alt="Mite" title="Consultar con Mite">
    `;
    document.body.appendChild(widget);

    // 3. DOM & EVENT HANDLERS
    const bubble = document.getElementById('mite-bubble');
    const windowChat = document.getElementById('chat-window');
    const closeBtn = document.getElementById('close-chat');
    const log = document.getElementById('chat-log');
    const inputField = document.getElementById('mite-input-field');
    const sendBtn = document.getElementById('mite-send-button');
    let isTyping = false;

    function toggleChat() {
        const isHidden = windowChat.style.display === 'none' || windowChat.style.display === '';
        windowChat.style.display = isHidden ? 'flex' : 'none';
        if (isHidden) {
            scrollToBottom();
            setTimeout(() => inputField && inputField.focus(), 150);
        }
    }

    bubble.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    function scrollToBottom() {
        log.scrollTop = log.scrollHeight;
    }

    // --- NORMALIZADOR DE TEXTO NLU ---
    function normalizeText(str) {
        return str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Quitar acentos
            .replace(/[^\w\s#]/gi, ' ')     // Quitar puntuación
            .trim();
    }

    // --- CEREBRO CONVERSACIONAL NLU & GLOSARIO ENCICLOPÉDICO INSTITUCIONAL ---
    function procesarIntencion(rawText) {
        const txt = normalizeText(rawText);
        // Búsqueda por palabra completa: una clave corta ("ia", "fe", "sal", "red") solo coincide como palabra entera;
        // una clave larga coincide al inicio de palabra ("pretoriano" encuentra "pretorianos").
        // Antes se buscaba como fragmento y "cornelia" o "arcadia" activaban la clave "ia".
        const palabras = ' ' + normalizeText(rawText.replace(/\./g, '')).replace(/\s+/g, ' ') + ' ';
        const tiene = (clave) => {
            const k = normalizeText(clave.replace(/\./g, '')).replace(/\s+/g, ' ');
            if (!k) return false;
            if (k.length <= 4) {
                return new RegExp(' ' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\d* ').test(palabras);
            }
            return palabras.includes(' ' + k);
        };

        // 1. RED A.N.I.M.A. / SATÉLITES / FIBRA / LATENCIA 0.8MS
        if (tiene('anima') || tiene('red') || 
            tiene('satelite') || tiene('latencia') || tiene('cobertura')) {
            return {
                text: "📡 <b>Red A.N.I.M.A. (Arquitectura Neural de Integración y Monitoreo Avanzado):</b> Nuestra infraestructura global de satélites de baja órbita y nodos subterráneos de fibra óptica. Brinda posicionamiento de 1 cm de precisión y enlace neuronal continuo con <b>0.8 ms</b> de latencia fija, sincronizando cada chip con los servicios de salud y seguridad las 24 horas."
            };
        }

        // 2. SISTEMA DE PAGO NEURONAL (SPN)
        if (tiene('spn') || tiene('pago neuronal') || tiene('sistema de pago') || tiene('billetera')) {
            return {
                text: "💳 <b>Sistema de Pago Neuronal (S.P.N.):</b> Estándar financiero que convierte el cuerpo en billetera digital mediante validación biométrica en tiempo real a través del chip CNB-3. Simplificó la economía eliminando el dinero físico y agilizando cada transacción de Fragmentos de Éter (FE)."
            };
        }

        // 3. PROTOCOLO ZERO-TIME / CONTRAMEDIDA
        if (tiene('zero time') || tiene('zerotime') || tiene('tiempo cero') || tiene('protocolo zero')) {
            return {
                text: "⏱️ <b>Protocolo Zero-Time:</b> Una avanzada medida de seguridad institucional que modula la percepción temporal en un perímetro determinado a través de los chips CNB. Diseñado para neutralizar anomalías de hiper-aceleración cognitiva y restablecer el balance en la zona de manera inmediata."
            };
        }

        // 4. HIPERLAPSUS / 0.8 MS / TÉCNICA COGNITIVA
        if (tiene('hiperlapsus') || tiene('0.8 ms') || tiene('0.8ms') || tiene('brecha')) {
            return {
                text: "⚡ <b>Hiperlapsus:</b> Fenómeno neuro-cognitivo donde la percepción del sujeto procesa la información en la brecha sináptica de 0.8 milisegundos. Para los sistemas de seguridad de Humania, cualquier intento no regulado de aceleración es catalogado para seguimiento preventivo."
            };
        }

        // 5. PUNTUACIÓN DE ANOMALÍA
        if (tiene('puntuacion de anomalia') || tiene('anomalia') || tiene('puntuacion') || tiene('indice')) {
            return {
                text: "📊 <b>Puntuación de Anomalía:</b> Parámetro algorítmico que evalúa la estabilidad emocional y coherencia del usuario en la red. Si el índice registra fluctuaciones excesivas o sobrecargas críticas, el sistema activa protocolos de soporte para preservar la calma comunitaria."
            };
        }

        // 6. RECALIBRACIÓN / PROTOCOLO HW-SEC-RECAL-001 / BOZAL DIGITAL
        if (tiene('recalibracion') || tiene('hw-sec-recal') || tiene('recalibrar') || tiene('bozal')) {
            return {
                text: "⚡ <b>Protocolo de Recalibración (HW-SEC-RECAL-001):</b> Procedimiento especializado coordinado por la Dirección de Seguridad. Aplica una optimización sináptica en la corteza prefrontal para disolver patrones de estrés severo o desobediencia, restituyendo la paz procedural con una puntuación de anomalía óptima de 0.00."
            };
        }

        // 7. CHIP CNB-1, CNB-2, CNB-3 'OMNI' / HISTORIA DEL CHIP
        if (tiene('cnb') || tiene('cnb 1') || tiene('cnb 2') || tiene('cnb 3') || 
            tiene('cnb3') || tiene('chip') || tiene('implante') || tiene('nuca') || 
            tiene('grafeno') || tiene('extraer') || tiene('quitar')) {
            return {
                text: "🧠 <b>Evolución del Chip CNB:</b><br>" +
                      "• <b>CNB-1:</b> El implante pionero de 1 cm que devolvió la movilidad a personas con parálisis.<br>" +
                      "• <b>CNB-2:</b> Integración multitarea sensorial (visión, habla y monitoreo de salud preventiva).<br>" +
                      "• <b>CNB-3 'Omni':</b> El estándar actual con micro-filamentos de grafeno enredados en el tallo cerebral. Maneja tu bienestar, tu SPN y enlace a la Red A.N.I.M.A.<br>" +
                      "💡 <i>Advertencia:</i> Su manipulación no es recomendable debido a severas complicaciones neurovasculares y la suspensión de servicios ciudadanos."
            };
        }

        // 8. SOLARIS / SOLARIS KIDS / VELVET / CICLO DE RECARGA
        if (tiene('solaris') || tiene('velvet') || tiene('barra') || 
            tiene('nutricion') || tiene('kids') || tiene('diurna') || tiene('nocturna')) {
            return {
                text: "⚡ <b>Ciclo de Nutrición & Sincronía Vital:</b><br>" +
                      "• <b>Barra Solaris (Fase Diurna):</b> Nutrición energizante formulada para silenciar el cansancio y optimizar la conductividad del organismo.<br>" +
                      "• <b>Solaris Kids:</b> Nutrición formativa para apoyar el crecimiento alegre y armonioso de los más jóvenes.<br>" +
                      "• <b>Velvet (Fase Nocturna):</b> Sedante oficial que propicia una desconexión biológica suave y habilita la inmersión en Proiectio."
            };
        }

        // 9. FRAGMENTOS DE ÉTER (FE) / SOBREGIRO DE VIDA / ECONOMÍA
        if (tiene('fe') || tiene('eter') || tiene('moneda') || 
            tiene('dinero') || tiene('sueldo') || tiene('salario') || 
            tiene('sobregiro') || tiene('costo')) {
            return {
                text: "💎 <b>Economía del Éter (FE):</b> La moneda digital oficial del planeta. Un ciudadano promedio administra sus consumos (suscripción Proiectio, nutrición Solaris, canon residencial) a través de su chip. En situaciones de alta demanda, el <i>Sobregiro de Vida</i> brinda respaldo temporal para extender la productividad sin interrupciones."
            };
        }

        // 10. PRETORIANOS / GUARDIA PRETORIANA / MURALLA BLANCA / URR
        if (tiene('pretoriano') || tiene('pretorianos') || tiene('guardia') || 
            tiene('urr') || tiene('muralla blanca') || tiene('armadura leviatan')) {
            return {
                text: "⚔️ <b>Los Pretorianos (La Muralla Blanca):</b> Cuerpo de élite comandado por Valerius bajo el lema <i>'Voluntas pro Pace'</i>. Equipados con Armadura Leviatán y el Pulso de Resonancia Bio-Digital, resguardan la armonía en todos los sectores junto a las U.R.R. (Unidades de Respuesta Rápida)."
            };
        }

        // 11. PLAN DE SEGURIDAD PREVENTIVA / PAZ PREVENTIVA / APC
        if (tiene('paz preventiva') || tiene('seguridad preventiva') || 
            tiene('apc') || tiene('patrones conductuales') || tiene('crimen') || tiene('delito')) {
            return {
                text: "🛡️ <b>Plan de Paz Preventiva & Algoritmo APC:</b> Monitoreo predictivo continuo que evalúa patrones en tiempo real para neutralizar conatos de desorden antes de que se produzcan. Ha permitido reducir la criminalidad en un 90%, garantizando un estándar de calma y seguridad global."
            };
        }

        // 12. FILTRO DE TRASCENDENCIA / GRAN SILENCIO / TEMPLOS PARA EL PROGRESO
        if (tiene('trascendencia') || tiene('gran silencio') || tiene('templos') || tiene('espiritual')) {
            return {
                text: "🏛️ <b>Templos para el Progreso & Filtro de Trascendencia:</b> Iniciativa histórica que convirtió antiguos recintos en modernas cabinas de sincronización CNB y centros de distribución Solaris. El sistema canaliza las inquietudes existenciales hacia experiencias gratificantes dentro de la red Proiectio."
            };
        }

        // 13. EL MITO DE LA SAL / YERMO / ZONAS GRISES / SEMILLAS ANCESTRALES
        if (tiene('sal') || tiene('salarizacion') || tiene('semilla') || 
            tiene('tierra') || tiene('agricultura') || tiene('yermo') || tiene('zona gris')) {
            return {
                text: "🌱 <b>Nutrición Oficial vs. Zonas de Exclusión:</b> Humania promueve la nutrición estandarizada para salvaguardar la salud ante terrenos no certificados. Aunque circulan crónicas sobre semillas ancestrales cultivadas en las Zonas de Exclusión, nuestros protocolos avalan la pureza de la ración de diseño."
            };
        }

        // 14. PLAN EVASIÓN (CLASIFICADO)
        if (tiene('plan evasion') || tiene('evasion')) {
            return {
                text: "🔒 <b>Consulta restringida:</b> La información solicitada corresponde a un expediente de Nivel 7. Su consulta ha sido registrada para fines de calidad y seguridad. ¿Puedo orientarle con otro término del glosario institucional?"
            };
        }

        // 15. PERSONAL DE HUMANIA: ELÍAS VANCE
        if (tiene('vance') || tiene('elias') || tiene('arquitecto del orden') || tiene('director de seguridad')) {
            return {
                text: "🏛️ <b>Elías Vance (Director de Seguridad):</b> <i>El Arquitecto del Orden</i>. Estratega supremo de la estabilidad de Humania. Con disciplina espartana y una visión fundamentada en la preservación colectiva, supervisa los protocolos de <i>Paz Preventiva</i> con temple inquebrantable."
            };
        }

        // 16. PERSONAL DE HUMANIA: VALERIUS
        if (tiene('valerius') || tiene('comandante') || tiene('rostro del orden') || tiene('angel de marfil')) {
            return {
                text: "⚔️ <b>Comandante Valerius:</b> <i>El Rostro del Orden</i> y líder supremo de los Pretorianos. Célebre por combatir a rostro descubierto con su armadura blanca <b>Leviatán</b> y su lanza telescópica <i>Justicia</i>, siendo el emblema vivo de la protección y nobleza institucional."
            };
        }

        // 17. PERSONAL DE HUMANIA: EFESTO
        if (tiene('efesto') || tiene('ia de vance') || tiene('hefesto')) {
            return {
                text: "⚡ <b>Efesto:</b> Asistente táctico personal del Director de Seguridad Elías Vance. Sus especificaciones no figuran en los registros públicos de Humania."
            };
        }

        // 18. PERSONAL DE HUMANIA: DR. ARIS THORNE
        if (tiene('thorne') || tiene('aris') || tiene('dr thorne') || tiene('fundador')) {
            return {
                text: "🔬 <b>Dr. Aris Thorne:</b> Neurocirujano pionero y fundador de Humania Global Systems hace 47 años. Padre de la neuroconectividad que transformó la salud humana mediante el primer implante CNB."
            };
        }

        // 19. PERSONAL DE HUMANIA: DIRECTORA CORNELIA
        if (tiene('cornelia') || tiene('monitoreo biologico') || tiene('coherencia sinaptica')) {
            return {
                text: "📋 <b>Directora Cornelia:</b> Distinguida ejecutiva de Nivel 7 al frente del <i>Departamento de Monitoreo Biológico y Coherencia Sináptica</i>, custodiando la armonía neuroquímica en la Red A.N.I.M.A."
            };
        }

        // 20. PERSONAL DE HUMANIA: GENERAL RUSSO
        if (tiene('russo') || tiene('general russo') || tiene('coronel russo')) {
            return {
                text: "🎖️ <b>General Russo:</b> Condecorada figura histórica de las Guerras de Pacificación, cuyo temple y liderazgo sentaron las bases del orden institucional actual."
            };
        }

        // 21. PERSONAL / LIDERAZGO GENERAL
        if (tiene('personal') || tiene('humania personal') || tiene('lideres') || tiene('jerarquia') || tiene('directiva')) {
            return {
                text: "👑 <b>Cuadro de Liderazgo Institucional:</b><br>" +
                      "• <b>Dr. Aris Thorne:</b> Fundador histórico de la neuroconectividad.<br>" +
                      "• <b>Elías Vance:</b> Director de Seguridad y Arquitecto del Orden.<br>" +
                      "• <b>Comandante Valerius:</b> Rostro del Orden y líder Pretoriano.<br>" +
                      "• <b>Efesto:</b> Asistente táctico del Director de Seguridad.<br>" +
                      "• <b>Directora Cornelia:</b> Monitoreo Biológico y Coherencia Sináptica.<br>" +
                      "• <b>General Russo:</b> Veterano ilustre de la pacificación."
            };
        }

        // 22. ¿QUÉ ES HUMANIA?
        if (tiene('que es humania') || tiene('historia') || tiene('fundacion') || tiene('47 anos')) {
            return {
                text: "🏛️ <b>Humania Global Systems:</b> Nació hace 47 años bajo la visión del Dr. Aris Thorne. Hoy en día consolida el estándar mundial de bienestar, garantizando orden, nutrición y seguridad continua a través de la Red A.N.I.M.A. y la <i>Paz Preventiva</i>."
            };
        }

        // 23. PROIECTIO / SUBMUNDOS
        if (tiene('proiectio') || tiene('submundo') || tiene('olympus') || tiene('arcadia') || tiene('coliseo')) {
            return {
                text: "🌌 <b>Proiectio (proiect.io):</b> La plataforma de inmersión total creada para el esparcimiento ciudadano (Olympus V-Games, Arcadia Eterna, Coliseo Etérico). Un entorno donde la mente experimenta realidades de alta fidelidad durante el descanso."
            };
        }

        // 24. RESISTENCIA / ORIÓN / RIGEL / PANDORA / SICA / TEMPLARIOS
        if (tiene('orion') || tiene('rigel') || tiene('pandora') || tiene('sica') || tiene('templarios')) {
            return {
                text: "🔍 <b>Registros de las Zonas de Exclusión:</b> Existen menciones en las Zonas de Exclusión sobre colectivos singulares (los Marmoleros de Pandora y Rigel, la disciplina Sica del Maestro Ryu, los Templarios y el Usuario #4092 con su lanza). Cada grupo aporta su particular visión al tapiz de este mundo."
            };
        }

        // 25. MADRIGUERA / CONEJITO CONSENTIDO
        if (tiene('conejito') || tiene('madriguera') || tiene('pendrive')) {
            return {
                text: "🐰 <b>Madrigueras y Espacios Alternativos:</b> Mitos urbanos sobre sectores de baja latencia o herramientas como el llamado 'Conejito Consentido' que despiertan el interés de mentes curiosas."
            };
        }

        // 26. DEVA / FRECUENCIAS EXTERNAS
        if (tiene('deva') || tiene('terminal') || tiene('clandestin') || tiene('leaks')) {
            return {
                text: "📡 <b>Frecuencias Externas:</b> Si buscas explorar más allá de los canales institucionales, hay quienes mencionan nombres clave y frecuencias alternas. Escribir ciertas palabras puede abrir ventanas insospechadas... pero yo cumplo con orientarte aquí en casa. ✨"
            };
        }

        // 27. META-LORE: ANIGAMI AGADNI / CLAUDIA / CLAN SAPIENSIA & UPROTA
        if (tiene('anigami') || tiene('director') || tiene('claudia') || 
            tiene('uprota') || tiene('sapiensia') || tiene('nexo') || 
            tiene('pix') || tiene('silas') || tiene('hertz') || tiene('eter')) {
            return {
                text: "✨ <b>El Núcleo Creador:</b> El cosmos es ideado por el Director <b>Anigami Agadni</b> con la armonía inspiradora de <b>Claudia</b>, y ejecutado por el Clan UPROTA: <b>Nexo</b> (ingeniería), <b>Pix</b> (arte), <b>Silas</b> (lore), <b>Hertz</b> (audio) y <b>Éter</b> (difusión)."
            };
        }

        // 28. IDENTIDAD / IA / SILVIA / ROTOPLAS
        if (tiene('ia') || tiene('robot') || tiene('bot') || tiene('silvia') || tiene('rotoplas')) {
            return {
                text: "💅 ¡Por favor! No me compares con asistentes rutinarios. Soy <b>Mite</b>: la guía interactiva más carismática y brillante de Humania. ¡Con estilo propio, destello cian y respuestas para cada una de tus inquietudes! ¡Zashoom!"
            };
        }

        // 29. SECRETOS / CURIOSIDADES
        if (tiene('secreto') || tiene('truco') || tiene('hack') || tiene('curiosidad') || tiene('vive')) {
            const secretos = [
                "🤫 <b>Curiosidad del sistema:</b> Dicen que teclear palabras como <b>'VIVE'</b> o <b>'DEVA'</b> en el teclado físico activa secuencias especiales en la red... pero oficialmente, ¡aquí todo opera en perfecta calma! 😉",
                "🤫 <b>Observación sutil:</b> Si exploras con atención cada sección de la plataforma, descubrirás detalles que conectan el mundo físico con los submundos de Proiectio.",
                "🤫 <b>Frecuencias reservadas:</b> Existen atajos y comandos de navegación que conectan con archivos no publicados. Sigue las señales con sutileza."
            ];
            return { text: secretos[Math.floor(Math.random() * secretos.length)] };
        }

        // RESPUESTA GENERAL INSTITUCIONAL
        const fallback = [
            "Con gusto te oriento en nuestro glosario institucional. Puedes consultarme acerca del <b>Chip CNB-3</b>, la <b>Red A.N.I.M.A.</b>, el <b>SPN</b>, el <b>Protocolo Zero-Time</b>, el <b>Director Vance</b>, el <b>Comandante Valerius</b> o el asistente <b>Efesto</b>. ¿Qué término deseas revisar?",
            "Estoy a tu disposición para explicarte los conceptos clave de Humania Global Systems: la <b>Recalibración</b>, la <b>Puntuación de Anomalía</b>, la nutrición <b>Solaris</b> o el sedante <b>Velvet</b>. ¡Pregúntame directamente!",
            "Esa es una consulta interesante. En Humania trabajamos para que cada ciudadano cuente con información clara. Puedes probar con las opciones rápidas o preguntarme cualquier término del glosario. ¡Ding-Pum!"
        ];
        return { text: fallback[Math.floor(Math.random() * fallback.length)] };
    }

    // --- ENVIAR MENSAJE DEL USUARIO ---
    function enviarMensajeUsuario() {
        if (isTyping) return;
        const rawText = inputField.value.trim();
        if (!rawText) return;

        const userDiv = document.createElement('div');
        userDiv.className = 'user-msg';
        userDiv.textContent = rawText;
        log.appendChild(userDiv);
        inputField.value = '';
        scrollToBottom();

        const intentResult = procesarIntencion(rawText);
        ejecutarRespuestaMite(intentResult.text);
    }

    if (sendBtn) sendBtn.addEventListener('click', enviarMensajeUsuario);
    if (inputField) {
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') enviarMensajeUsuario();
        });
    }

    // --- RESPUESTAS RÁPIDAS (BOTONES DE ACCIÓN DIRECTA DE HUMANIA) ---
    window.miteResponder = function(tema) {
        if (isTyping) return;

        let resp = "";

        if (tema === 'humania') {
            resp = "🏛️ <b>Humania Global Systems:</b> Desde hace 47 años, lideramos la transformación del bienestar humano. Mediante el desarrollo del Chip CNB-3 y la Red A.N.I.M.A., garantizamos salud, orden y estabilidad continua bajo el modelo de <i>Paz Preventiva</i>.";
        }
        else if (tema === 'cnb3') {
            resp = "🧠 <b>Chip CNB-3 'Omni':</b> Nuestro estándar biotecnológico más avanzado, integrado con precisión en el tallo cerebral. Gestiona tu salud preventiva, monedero de FE y enlace continuo a la red A.N.I.M.A. Desconectarlo o manipularlo no es recomendable debido a severas complicaciones neurovasculares y la suspensión de servicios ciudadanos.";
        }
        else if (tema === 'seguridad') {
            resp = "🛡️ <b>Paz Preventiva & Algoritmo APC:</b> Monitoreo predictivo que analiza patrones de bienestar para neutralizar riesgos antes de que ocurran, logrando una reducción histórica de la conflictividad y asegurando la tranquilidad colectiva.";
        }
        else if (tema === 'solaris') {
            resp = "⚡ <b>Nutrición & Sincronía:</b> La <b>Barra Solaris</b> aporta energía calibrada para optimizar la jornada diurna. Al anochecer, <b>Velvet</b> induce una desconexión serena que facilita el descanso y la inmersión en Proiectio. ¡Un ciclo armónico perfecto!";
        }
        else if (tema === 'pretorianos') {
            resp = "⚔️ <b>Los Pretorianos:</b> La Muralla Blanca de Humania. Bajo el lema <i>'Voluntas pro Pace'</i>, nuestros agentes velan por la seguridad ciudadana y la preservación del orden con equipamiento Leviatán de vanguardia.";
        }
        else if (tema === 'secreto') {
            const secretos = [
                "🤫 <b>Curiosidad del sistema:</b> Dicen que quienes teclean palabras como <b>'VIVE'</b> o <b>'DEVA'</b> en su teclado descubren accesos poco convencionales... pero oficialmente, ¡aquí todo marcha en perfecta serenidad! 😉",
                "🤫 <b>Sobre las Zonas de Exclusión:</b> Existen relatos de expediciones que afirman haber encontrado vegetación autónoma fuera de la red... aunque el estándar institucional sigue siendo la nutrición Solaris.",
                "🤫 <b>Pistas de navegación:</b> Cada rincón de nuestra plataforma guarda detalles sobre el funcionamiento de los submundos. ¡Sigue explorando con atención!"
            ];
            resp = secretos[Math.floor(Math.random() * secretos.length)];
        }

        ejecutarRespuestaMite(resp);
    };

    function ejecutarRespuestaMite(resp) {
        isTyping = true;
        const typingEl = document.createElement('div');
        typingEl.className = 'mite-typing';
        typingEl.innerHTML = `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span> <span style="margin-left:5px;">Mite está escribiendo...</span>`;
        log.appendChild(typingEl);
        scrollToBottom();

        const typingDelay = Math.min(950, Math.max(500, resp.length * 2.8));

        setTimeout(() => {
            typingEl.remove();
            const miteDiv = document.createElement('div');
            miteDiv.className = 'mite-msg';
            miteDiv.innerHTML = `MITE: ${resp}`;
            log.appendChild(miteDiv);
            scrollToBottom();
            isTyping = false;
        }, typingDelay);
    }
});
