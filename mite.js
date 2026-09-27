/* =========================================================
   MITE ASISTENTE - EDICIÓN HUMANIA GLOBAL SYSTEMS
   Versión: 4.2 (Personal Imperial, Tono Institucional & Español Puro)
   Autor: Nexo (Ingeniero Principal) | Clan UPROTA & Universo Proiectio
   0 KB Dependencies | Vanilla JS Puro | 60-120 FPS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function() {
    if (window.miteInitialized) return;
    window.miteInitialized = true;

    // 1. INYECCIÓN DE ESTILOS CSS (PALETA CORPORATIVA IMPERIAL HUMANIA & MITE)
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
                <div class="mite-msg">¡Zashoom! Soy Mite. 💎 Tu guía oficial en Humania Global Systems. Estoy aquí para orientarte sobre nuestro estándar de bienestar, el liderazgo institucional (Vance, Valerius, Efesto), el Chip CNB-3 o la nutrición Solaris. ¿Qué deseas consultar hoy? ¡Ding-Pum!</div>
            </div>

            <div class="chat-options" id="mite-options-bar">
                <button class="opt-btn" onclick="miteResponder('humania')">🏛️ ¿Qué es Humania?</button>
                <button class="opt-btn" onclick="miteResponder('liderazgo')">👑 Personal del Imperio</button>
                <button class="opt-btn" onclick="miteResponder('cnb3')">🧠 Chip CNB-3</button>
                <button class="opt-btn" onclick="miteResponder('seguridad')">🛡️ Paz Preventiva</button>
                <button class="opt-btn" onclick="miteResponder('solaris')">⚡ Solaris & Velvet</button>
                <button class="opt-btn" onclick="miteResponder('secreto')">🐰 Curiosidades</button>
            </div>

            <div class="chat-input-row">
                <input type="text" id="mite-input-field" placeholder="Pregunta sobre Vance, Valerius, chips..." maxlength="140" autocomplete="off">
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

    // --- CEREBRO CONVERSACIONAL NLU DE MITE (ADAPTADO AL PORTAL INSTITUCIONAL) ---
    function procesarIntencion(rawText) {
        const txt = normalizeText(rawText);

        // 1. ELÍAS VANCE / ARQUITECTO DEL ORDEN / DIRECTOR DE SEGURIDAD
        if (txt.includes('vance') || txt.includes('elias') || txt.includes('arquitecto') || 
            txt.includes('director de seguridad') || txt.includes('leviatan')) {
            return {
                text: "🏛️ <b>Elías Vance (Director de Seguridad):</b> Conocido con distinción como <i>El Arquitecto del Orden</i>. Es la figura central detrás de la estabilidad global de Humania. Con una disciplina espartana y una visión filosófica fundamentada en la preservación colectiva, supervisa los protocolos de <i>Paz Preventiva</i> y la seguridad de todos los distritos. Su temple garantiza que el sistema permanezca inquebrantable."
            };
        }

        // 2. VALERIUS / COMANDANTE SUPREMO / ROSTRO DEL ORDEN / ÁNGEL DE MARFIL
        if (txt.includes('valerius') || txt.includes('comandante') || txt.includes('rostro del orden') || 
            txt.includes('angel de marfil') || txt.includes('lanza justicia')) {
            return {
                text: "⚔️ <b>Comandante Valerius:</b> El líder supremo de la Guardia Pretoriana y el rostro más venerado del orden en Humania. Célebre por combatir siempre a rostro descubierto con su armadura ceremonial <b>Leviatán V.2</b> y su lanza telescópica <i>Justicia</i>, proyecta serenidad, nobleza y cercanía, recordando a cada ciudadano que la fuerza del imperio existe para proteger su paz."
            };
        }

        // 3. EFESTO / EL FORJADOR / IA DE VANCE / ARMADURAS
        if (txt.includes('efesto') || txt.includes('forjador') || txt.includes('ia de vance') || 
            txt.includes('armaduras') || txt.includes('egida') || txt.includes('leviatan v2') || txt.includes('hefesto')) {
            return {
                text: "⚡ <b>Efesto (La Inteligencia Forjadora):</b> La avanzada entidad de procesamiento táctico y soporte logístico que asiste directamente a la Dirección de Seguridad. Con una voz profunda y una calma absoluta, es el maestro artífice de la ingeniería bélica institucional, habiendo diseñado la imponente armadura <b>Leviatán V.2</b> y la clásica serie <b>Atlas</b>. ¡Precisión de cálculo en cada aleación!"
            };
        }

        // 4. DR. ARIS THORNE / FUNDADOR
        if (txt.includes('thorne') || txt.includes('aris') || txt.includes('dr thorne') || 
            txt.includes('fundador de humania')) {
            return {
                text: "🔬 <b>Dr. Aris Thorne:</b> Neurocirujano pionero y fundador visionario de Humania Global Systems hace 47 años. Su desarrollo original del primer implante CNB-1 devolvió la movilidad a miles de personas e inició la era dorada de la <i>Evolución Segura</i>, consolidando los cimientos de la civilización moderna."
            };
        }

        // 5. DIRECTORA CORNELIA / MONITOREO BIOLÓGICO / COHERENCIA SINÁPTICA
        if (txt.includes('cornelia') || txt.includes('monitoreo biologico') || 
            txt.includes('coherencia sinaptica') || txt.includes('nivel 7')) {
            return {
                text: "📋 <b>Directora Cornelia:</b> Distinguida ejecutiva de Nivel 7 al frente del <i>Departamento de Monitoreo Biológico y Coherencia Sináptica</i>. Con una trayectoria analítica impecable, coordina los sistemas que supervisan la estabilidad neuroquímica y el bienestar de los ciudadanos en la Red A.N.I.M.A."
            };
        }

        // 6. GENERAL RUSSO / CORONEL RUSSO
        if (txt.includes('russo') || txt.includes('general russo') || txt.includes('coronel russo')) {
            return {
                text: "🎖️ <b>General Russo:</b> Figura histórica condecorada de las Guerras de Pacificación. Un líder respetado de la vieja guardia cuyo carácter y disciplina en el campo de operaciones contribuyeron decisivamente a forjar el orden institucional que disfrutamos hoy en día."
            };
        }

        // 7. PERSONAL DEL IMPERIO / LIDERAZGO / JERARQUÍA / AUTORIDADES
        if (txt.includes('personal') || txt.includes('imperio') || txt.includes('lideres') || 
            txt.includes('jerarquia') || txt.includes('directiva') || txt.includes('autoridades') || txt.includes('equipo')) {
            return {
                text: "👑 <b>Estructura de Liderazgo de Humania:</b> La solidez de nuestro mundo se sostiene en una directiva de excelencia:<br>" +
                      "• <b>Dr. Aris Thorne:</b> Fundador y padre de la neuroconectividad.<br>" +
                      "• <b>Elías Vance:</b> Director de Seguridad y Arquitecto del Orden.<br>" +
                      "• <b>Comandante Valerius:</b> Rostro del Orden y líder Pretoriano.<br>" +
                      "• <b>Efesto:</b> Inteligencia de forja y soporte táctico de élite.<br>" +
                      "• <b>Directora Cornelia:</b> Monitoreo Biológico y Coherencia Sináptica.<br>" +
                      "¡Un cuadro institucional consagrado al progreso y la protección ciudadana!"
            };
        }

        // 8. ¿QUÉ ES HUMANIA? / FUNDACIÓN / HISTORIA
        if (txt.includes('que es humania') || txt.includes('historia') || txt.includes('fundacion') || 
            txt.includes('47 anos') || txt.includes('quienes son')) {
            return {
                text: "🏛️ <b>Humania Global Systems:</b> Nació hace 47 años bajo la visión del Dr. Aris Thorne y un equipo pionero de científicos con la misión de brindar libertad y salud a través de la tecnología. Hoy en día, consolidamos el estándar global de bienestar, garantizando orden, nutrición avanzada y tranquilidad a través de la Red A.N.I.M.A. y el principio de <i>Paz Preventiva</i>. ¡Evolución segura para todos!"
            };
        }

        // 9. CHIP CNB-3 / IMPLANTE / OMNI / GRAFENO / TALLO CEREBRAL / EXTRACCIÓN
        if (txt.includes('cnb') || txt.includes('cnb 3') || txt.includes('cnb3') || txt.includes('chip') || 
            txt.includes('implante') || txt.includes('nuca') || txt.includes('grafeno') || 
            txt.includes('extraer') || txt.includes('quitar') || txt.includes('bulto')) {
            return {
                text: "🧠 <b>Chip CNB-3 'Omni':</b> Es nuestro dispositivo de integración neuronal más sofisticado. Sus micro-filamentos biocompatibles se sincronizan de manera natural con el tallo cerebral para gestionar tu salud preventiva, identificación biométrica y transacciones en tiempo real.<br><br>💡 <i>Nota de seguridad:</i> Desconectar o manipular el dispositivo no es recomendable bajo ninguna circunstancia, ya que podría ocasionar severas complicaciones neurovasculares y la suspensión preventiva de los servicios ciudadanos integrados."
            };
        }

        // 10. SOLARIS / FASE DIURNA / BARRAS / NUTRICIÓN / ESTIMULANTES
        if (txt.includes('solaris') || txt.includes('barra') || txt.includes('comida') || 
            txt.includes('alimento') || txt.includes('diurna') || txt.includes('nutricion') || 
            txt.includes('kids') || txt.includes('desayuno')) {
            return {
                text: "☀️ <b>Barra Solaris (Fase Diurna):</b> Nutrición de precisión con formulación energizante calibrada para mantener el enfoque, la vitalidad y la óptima conductividad del organismo durante tus actividades diarias.<br><br>👶 Y para los más pequeños disponemos de <b>Solaris Kids</b>: una fórmula formativa orientada a apoyar un desarrollo saludable, armonioso y alegre."
            };
        }

        // 11. VELVET / FASE NOCTURNA / SEDANTE / SUEÑO / PROIECTIO
        if (txt.includes('velvet') || txt.includes('nocturna') || txt.includes('dormir') || 
            txt.includes('sueno') || txt.includes('sedante') || txt.includes('descanso')) {
            return {
                text: "🌙 <b>Velvet (Fase Nocturna):</b> Nuestra solución para el descanso guiado. Facilita una desconexión biológica placentera y prepara la mente para una experiencia inmersiva fluida en la plataforma <b>Proiectio</b>. ¡Despierta cada día en perfecta sincronía!"
            };
        }

        // 12. PRETORIANOS / GUARDIA CIVIL / URR / MURALLA BLANCA / SEGURIDAD
        if (txt.includes('pretoriano') || txt.includes('pretorianos') || txt.includes('guardia') || 
            txt.includes('urr') || txt.includes('muralla blanca') || txt.includes('armadura') || 
            txt.includes('policia') || txt.includes('fuerza')) {
            return {
                text: "⚔️ <b>Los Pretorianos (La Muralla Blanca):</b> La fuerza de protección y contención institucional de Humania, comandada por Valerius. Su lema, <i>'Voluntas pro Pace'</i>, refleja su compromiso con la armonía colectiva. Equipados con blindaje Leviatán y pulsos de resonancia bio-digital, garantizan que la tranquilidad de los distritos permanezca inalterable."
            };
        }

        // 13. PLAN DE SEGURIDAD PREVENTIVA / PAZ PREVENTIVA / APC
        if (txt.includes('paz preventiva') || txt.includes('seguridad preventiva') || 
            txt.includes('apc') || txt.includes('patrones conductuales') || 
            txt.includes('algoritmo') || txt.includes('crimen') || txt.includes('delito')) {
            return {
                text: "🛡️ <b>Plan de Paz Preventiva & Algoritmo APC:</b> Monitoreo analítico de vanguardia que anticipa alteraciones del orden antes de que se manifiesten. Este modelo ha permitido reducir los índices de conflictividad en un 90%, consolidando un entorno seguro y predecible para cada ciudadano."
            };
        }

        // 14. RED A.N.I.M.A. / APN / SATÉLITES / LATENCIA / FIBRA
        if (txt.includes('anima') || txt.includes('apn') || txt.includes('red') || 
            txt.includes('satelite') || txt.includes('latencia') || txt.includes('cobertura')) {
            return {
                text: "📡 <b>Red A.N.I.M.A. (Advanced Neural Integration & Monitoring Array):</b> Nuestra red de enlace satelital de baja órbita y fibra subterránea. Ofrece conectividad continua con <b>0.8 ms</b> de latencia y precisión milimétrica para mantener tus parámetros de salud en estado óptimo las 24 horas."
            };
        }

        // 15. RECALIBRACIÓN / HW-SEC-RECAL-001 / ANOMALÍA
        if (txt.includes('recalibracion') || txt.includes('anomalia') || txt.includes('puntuacion') || 
            txt.includes('bozal') || txt.includes('castigo') || txt.includes('recalibrar')) {
            return {
                text: "⚡ <b>Protocolo de Recalibración:</b> Un procedimiento especializado de armonización sináptica coordinado por la Dirección de Seguridad. Se aplica cuando los niveles de estrés o fluctuaciones emocionales superan los parámetros estándar, restituyendo la serenidad y la estabilidad del usuario."
            };
        }

        // 16. EL MITO DE LA SAL / YERMO / SEMILLAS NATURALES / AGRICULTURA
        if (txt.includes('sal') || txt.includes('salarizacion') || txt.includes('semilla') || 
            txt.includes('tierra') || txt.includes('agricultura') || txt.includes('yermo') || 
            txt.includes('natural') || txt.includes('zona gris')) {
            return {
                text: "🌱 <b>Nutrición Controlada vs. Entorno Exterior:</b> La directiva institucional promueve el consumo exclusivo de alimentos bio-diseñados como Solaris para evitar riesgos biológicos asociados a suelos no tratados. Aunque existen relatos sobre cultivos independientes en sectores periféricos, nuestros estándares priorizan la pureza garantizada."
            };
        }

        // 17. FRAGMENTOS DE ÉTER (FE) / ECONOMÍA / SOBREGIRO DE VIDA / MONEDA
        if (txt.includes('fe') || txt.includes('eter') || txt.includes('moneda') || 
            txt.includes('dinero') || txt.includes('sueldo') || txt.includes('salario') || 
            txt.includes('sobregiro') || txt.includes('costo')) {
            return {
                text: "💎 <b>Fragmentos de Éter (FE):</b> La unidad de valor oficial del ecosistema Humania. Permite una gestión ágil de tus raciones Solaris, tu espacio residencial y tus accesos recreativos en Proiectio mediante validación biométrica directa desde tu implante."
            };
        }

        // 18. ORIÓN / CLIENTE #4092 / CAPA ROSA / CONEJITO CONSENTIDO
        if (txt.includes('orion') || txt.includes('4092') || txt.includes('preferido') || 
            txt.includes('capa rosa') || txt.includes('lanza') || txt.includes('sombrero 8 bit')) {
            return {
                text: "✨ <b>Cliente Preferido #4092:</b> Un usuario muy particular que suele combinar accesorios llamativos con un estilo... poco convencional. Aunque sus elecciones estéticas desconciertan a los analistas de protocolo, ¡siempre le guardo un aprecio especial! 😉"
            };
        }

        // 19. CONEJITO CONSENTIDO / MADRIGUERA / PENDRIVE
        if (txt.includes('conejito') || txt.includes('madriguera') || txt.includes('pendrive') || 
            txt.includes('privilegios') || txt.includes('admin') || txt.includes('conejo')) {
            return {
                text: "🐰 <b>Madrigueras y Espacios Alternativos:</b> Existen registros informales sobre sectores de baja latencia o herramientas singulares como el llamado 'Conejito Consentido'. Para la mayoría son solo mitos urbanos digitales... pero a las mentes curiosas siempre les gusta explorar."
            };
        }

        // 20. PROIECTIO / SUBMUNDOS / ESCAPE
        if (txt.includes('proiectio') || txt.includes('submundo') || txt.includes('olympus') || 
            txt.includes('arcadia') || txt.includes('coliseo')) {
            return {
                text: "🌌 <b>Proiectio (proiect.io):</b> La plataforma complementaria de inmersión total creada para el esparcimiento ciudadano. En ella puedes disfrutar de simulaciones de alta fidelidad como Olympus V-Games, Arcadia Eterna o el Coliseo Etérico durante tus ciclos de descanso."
            };
        }

        // 21. DEVA / MUNDO REAL / TERMINAL CLANDESTINA / SECRETOS
        if (txt.includes('deva') || txt.includes('terminal') || txt.includes('clandestin') || txt.includes('leaks')) {
            return {
                text: "📡 <b>Frecuencias Externas:</b> Si buscas explorar más allá de los canales institucionales, hay quienes mencionan nombres clave y frecuencias alternas. Dicen que escribir ciertas palabras puede abrir ventanas inesperadas... pero yo cumplo con orientarte aquí en casa. ✨"
            };
        }

        // 22. META-LORE: ANIGAMI AGADNI / EL DIRECTOR / CREADOR
        if (txt.includes('anigami') || txt.includes('director') || txt.includes('creador') || txt.includes('autor')) {
            return {
                text: "✨ <b>Anigami Agadni:</b> El Director Creativo y artífice de este universo. Concibe cada aspecto narrativo, institucional y tecnológico para que la experiencia sea envolvente, profunda y coherente."
            };
        }

        // 23. META-LORE: CLAUDIA
        if (txt.includes('claudia')) {
            return {
                text: "🌸 <b>Claudia:</b> Una presencia inspiradora y serena. Su armonía y criterio aportan equilibrio y calidez en el desarrollo creativo de todo el proyecto."
            };
        }

        // 24. META-LORE: NEXO, PIX, SILAS, HERTZ, ÉTER / SAPIENSIA & UPROTA
        if (txt.includes('nexo') || txt.includes('pix') || txt.includes('silas') || 
            txt.includes('hertz') || txt.includes('eter') || txt.includes('sapiensia') || txt.includes('uprota')) {
            return {
                text: "⚡ <b>Clan UPROTA & Sapiensia:</b> El equipo interdisciplinario que da vida a este ecosistema. <b>Nexo</b> en la arquitectura técnica, <b>Pix</b> en el diseño visual, <b>Silas</b> en las crónicas y narrativa, <b>Hertz</b> en la ingeniería acústica y <b>Éter</b> en la comunicación global."
            };
        }

        // 25. IDENTIDAD / IA / SILVIA / ROTOPLAS
        if (txt.includes('ia') || txt.includes('robot') || txt.includes('bot') || 
            txt.includes('quien eres') || txt.includes('silvia') || txt.includes('rotoplas')) {
            return {
                text: "💅 ¡Por favor! No me compares con asistentes rutinarios. Soy <b>Mite</b>: la guía interactiva más carismática y brillante de Humania. ¡Con estilo propio, destello cian y respuestas para cada una de tus inquietudes! ¡Zashoom!"
            };
        }

        // 26. SECRETOS / CURIOSIDADES / EASTER EGG / MADRIGUERA
        if (txt.includes('secreto') || txt.includes('truco') || txt.includes('hack') || 
            txt.includes('contrabando') || txt.includes('pista') || txt.includes('easter') || 
            txt.includes('vive') || txt.includes('madriguera') || txt.includes('curiosidad')) {
            const secretos = [
                "🤫 <b>Una curiosidad entre nosotros:</b> Algunos usuarios comentan que teclear palabras como <b>'VIVE'</b> o <b>'DEVA'</b> en su teclado activa secuencias especiales en la red... pero oficialmente, ¡aquí todo opera en perfecta calma!",
                "🤫 <b>Observación sutil:</b> Si exploras con atención cada sección de la plataforma, descubrirás detalles que conectan el mundo físico con los submundos de Proiectio. ¡La curiosidad siempre premia a los observadores!",
                "🤫 <b>Frecuencias reservadas:</b> Existen atajos y comandos de navegación que conectan con archivos no publicados. Sigue las señales con sutileza."
            ];
            return { text: secretos[Math.floor(Math.random() * secretos.length)] };
        }

        // RESPUESTA GENERAL INSTITUCIONAL
        const fallback = [
            "Con gusto te oriento en lo que necesites. Puedes consultarme acerca de figuras como el <b>Director Vance</b>, el <b>Comandante Valerius</b>, el <b>Forjador Efesto</b>, o temas como el <b>Chip CNB-3</b> y la nutrición <b>Solaris</b>. ¿Qué tema te interesa?",
            "Estoy a tu disposición para explicarte los servicios de Humania Global Systems, nuestro liderazgo institucional o el funcionamiento de la <b>Red A.N.I.M.A.</b>. ¡Dime qué te gustaría conocer!",
            "Esa es una consulta interesante. En Humania trabajamos para que cada ciudadano cuente con información clara. Puedes probar con las opciones rápidas o preguntarme directamente. ¡Ding-Pum!"
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
        ejecutarRespuestaMite(intentResult.text, intentResult.action);
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
        let accion = null;

        if (tema === 'humania') {
            resp = "🏛️ <b>Humania Global Systems:</b> Desde hace 47 años, lideramos la transformación del bienestar humano. Mediante el desarrollo del Chip CNB-3 y la Red A.N.I.M.A., garantizamos salud, orden y estabilidad continua bajo el modelo de <i>Paz Preventiva</i>.";
            accion = `
                <div style="margin-top:6px; display:flex; gap:5px; flex-wrap:wrap;">
                    <button class="opt-btn" onclick="miteResponder('vance')">Director Vance</button>
                    <button class="opt-btn" onclick="miteResponder('valerius')">Comandante Valerius</button>
                </div>`;
        }
        else if (tema === 'liderazgo') {
            resp = "👑 <b>Personal del Imperio:</b> Figuras clave que sostienen la estabilidad de Humania:<br>" +
                   "• <b>Elías Vance:</b> Director de Seguridad y Arquitecto del Orden.<br>" +
                   "• <b>Comandante Valerius:</b> Rostro del Orden y líder Pretoriano.<br>" +
                   "• <b>Efesto:</b> Inteligencia de forja y soporte táctico.<br>" +
                   "• <b>Directora Cornelia:</b> Monitoreo Biológico y Coherencia Sináptica.";
            accion = `
                <div style="margin-top:6px; display:flex; gap:5px; flex-wrap:wrap;">
                    <button class="opt-btn" onclick="miteResponder('vance')">Director Vance</button>
                    <button class="opt-btn" onclick="miteResponder('valerius')">Valerius</button>
                    <button class="opt-btn" onclick="miteResponder('efesto')">Efesto</button>
                </div>`;
        }
        else if (tema === 'vance') {
            resp = "🏛️ <b>Elías Vance (Director de Seguridad):</b> El <i>Arquitecto del Orden</i>. Imparcial, estratégico y con una disciplina espartana, dirige el aparato de seguridad global y garantiza que la <i>Paz Preventiva</i> reine en cada rincón de Humania.";
        }
        else if (tema === 'valerius') {
            resp = "⚔️ <b>Comandante Valerius:</b> El <i>Rostro del Orden</i> y líder de los Pretorianos. Combate siempre a rostro descubierto con su armadura blanca Leviatán V.2 y su lanza telescópica <i>Justicia</i>, siendo el emblema vivo de la protección institucional.";
        }
        else if (tema === 'efesto') {
            resp = "⚡ <b>Efesto (El Forjador):</b> La avanzada entidad de inteligencia táctica de la Dirección de Seguridad. Maestro en el diseño de armaduras de alta ingeniería y soporte logístico indispensable para el mantenimiento del orden.";
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
            accion = `
                <div style="margin-top:6px; display:flex; gap:5px; flex-wrap:wrap;">
                    <button class="opt-btn" onclick="miteResponder('valerius')">Comandante Valerius</button>
                    <button class="opt-btn" onclick="miteResponder('efesto')">Forjador Efesto</button>
                </div>`;
        }
        else if (tema === 'secreto') {
            const secretos = [
                "🤫 <b>Curiosidad del sistema:</b> Dicen que quienes teclean palabras como <b>'VIVE'</b> o <b>'DEVA'</b> en su teclado descubren accesos poco convencionales... pero oficialmente, ¡aquí todo marcha en perfecta serenidad! 😉",
                "🤫 <b>Sobre las Zonas Periféricas:</b> Existen relatos de expediciones que afirman haber encontrado vegetación autónoma fuera de la red... aunque el estándar institucional sigue siendo la nutrición Solaris.",
                "🤫 <b>Pistas de navegación:</b> Cada rincón de nuestra plataforma guarda detalles sobre el funcionamiento de los submundos. ¡Sigue explorando con atención!"
            ];
            resp = secretos[Math.floor(Math.random() * secretos.length)];
        }

        ejecutarRespuestaMite(resp, accion);
    };

    function ejecutarRespuestaMite(resp, accion = null) {
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
            miteDiv.innerHTML = `MITE: ${resp} ${accion ? accion : ''}`;
            log.appendChild(miteDiv);
            scrollToBottom();
            isTyping = false;
        }, typingDelay);
    }
});
