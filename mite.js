/* =========================================================
   MITE VIRTUAL ASSISTANT - EDICIÓN HUMANIA GLOBAL SYSTEMS
   Versión: 4.0 (Lore Corporativo Unificado + Paz Preventiva)
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
                        <div>MITE Assistant</div>
                        <div class="chat-header-sub">HUMANIA GUIDANCE ARRAY</div>
                    </div>
                </div>
                <span id="close-chat" style="cursor:pointer; font-size:1.3rem; line-height:1; color:#c5a059;">&times;</span>
            </div>

            <div class="chat-body" id="chat-log">
                <div class="mite-msg">¡Zashoom! Soy Mite. 💎 Tu asistente interactiva de Humania Global Systems... bueno, autorizada según a quién le preguntes. 😉 ¿Quieres saber cómo funciona tu Chip CNB-3, qué contiene tu barra Solaris o buscas un atajo clandestino fuera del radar de Vance? ¡Pregúntame lo que quieras o toca un botón! ¡Ding-Pum!</div>
            </div>

            <div class="chat-options" id="mite-options-bar">
                <button class="opt-btn" onclick="miteResponder('humania')">🏛️ ¿Qué es Humania?</button>
                <button class="opt-btn" onclick="miteResponder('cnb3')">🧠 Chip CNB-3</button>
                <button class="opt-btn" onclick="miteResponder('seguridad')">🛡️ Paz Preventiva</button>
                <button class="opt-btn" onclick="miteResponder('solaris')">⚡ Solaris & Velvet</button>
                <button class="opt-btn" onclick="miteResponder('pretorianos')">⚔️ Pretorianos</button>
                <button class="opt-btn" onclick="miteResponder('secreto')">🐰 ¡Un secreto!</button>
            </div>

            <div class="chat-input-row">
                <input type="text" id="mite-input-field" placeholder="Consulta sobre Humania, Solaris o chips..." maxlength="140" autocomplete="off">
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

    // --- CEREBRO CONVERSACIONAL NLU DE MITE (ESPECIALIZADO EN HUMANIA & PROIECTIO) ---
    function procesarIntencion(rawText) {
        const txt = normalizeText(rawText);

        // 1. ¿QUÉ ES HUMANIA? / FUNDACIÓN / HISTORIA / ARIS THORNE
        if (txt.includes('que es humania') || txt.includes('historia') || txt.includes('fundacion') || 
            txt.includes('47 anos') || txt.includes('fundador') || txt.includes('aris thorne') || 
            txt.includes('thorne') || txt.includes('quienes son')) {
            return {
                text: "🏛️ <b>Humania Global Systems:</b> Nació hace 47 años en un pequeño laboratorio europeo fundado por el Dr. Aris Thorne y cuatro científicos más bajo el lema <i>'La tecnología como puente para la libertad'</i>. Empezaron devolviendo la movilidad a personas con parálisis... pero con el tiempo y el <b>CNB-3</b>, ese puente se convirtió en el monopolio absoluto de la salud, la alimentación, la moneda y el descanso humano. Como dice su lema: <i>'Estar vigilado es estar a salvo'</i>. ¡Aunque yo prefiero estar libre y con purpurina! ¡Zashoom!"
            };
        }

        // 2. CHIP CNB-3 / IMPLANTE / OMNI / GRAFENO / TALLO CEREBRAL / EXTRACCIÓN
        if (txt.includes('cnb') || txt.includes('cnb 3') || txt.includes('cnb3') || txt.includes('chip') || 
            txt.includes('implante') || txt.includes('nuca') || txt.includes('grafeno') || 
            txt.includes('extraer') || txt.includes('quitar') || txt.includes('bulto')) {
            return {
                text: "🧠 <b>Chip CNB-3 'Omni':</b> Es el estándar neonatal que llevas anclado en la base del cráneo. Sus micro-filamentos de grafeno se enredan directamente en el tallo cerebral. Actúa como tu documento de identidad, billetera de FE y conector a la red A.N.I.M.A.<br><br>⚠️ <i>Advertencia técnica:</i> Intentar arrancártelo provoca paro cardíaco inmediato o un 98% de muerte cerebral. El sistema no te permite renunciar: o estás conectado, o sufres 'muerte civil'. ¡Por eso los rebeldes aíslan la señal en vez de cortarla!"
            };
        }

        // 3. SOLARIS / FASE DIURNA / BARRAS / NUTRICIÓN / ESTIMULANTES
        if (txt.includes('solaris') || txt.includes('barra') || txt.includes('comida') || 
            txt.includes('alimento') || txt.includes('diurna') || txt.includes('nutricion') || 
            txt.includes('kids') || txt.includes('desayuno')) {
            return {
                text: "☀️ <b>Barra Solaris (Fase Diurna):</b> Envuelta en neón brillante, no sacia el hambre tradicional: inyecta estimulantes sintéticos calibrados que silencian el cansancio biológico y dilatan las pupilas. Sus precursores químicos optimizan la conductividad del grafeno del chip para tu jornada laboral.<br><br>👶 Y para los pequeños existe <b>Solaris Kids</b>: nutrición calibrada para garantizar una niñez dócil, obediente y perfectamente sincronizada con el sistema."
            };
        }

        // 4. VELVET / FASE NOCTURNA / SEDANTE / SUEÑO / PROIECTIO
        if (txt.includes('velvet') || txt.includes('nocturna') || txt.includes('dormir') || 
            txt.includes('sueno') || txt.includes('sedante') || txt.includes('descanso')) {
            return {
                text: "🌙 <b>Velvet (Fase Nocturna):</b> El sedante químico oficial de Humania. Induce inconsciencia biológica inmediata para apagar el cuerpo y abrir el canal hacia <b>Proiectio</b>. Como el chip CNB-3 inhibió el sueño natural, si dejas de tomar Velvet o te cortan el peaje de FE, caes en insomnio destructivo. En Humania no duermes: ¡eres proyectado mientras mapean tu mente!"
            };
        }

        // 5. PRETORIANOS / GUARDIA CIVIL / URR / MURALLA BLANCA / SEGURIDAD
        if (txt.includes('pretoriano') || txt.includes('pretorianos') || txt.includes('guardia') || 
            txt.includes('urr') || txt.includes('valerius') || txt.includes('muralla blanca') || 
            txt.includes('armadura') || txt.includes('policia') || txt.includes('fuerza')) {
            return {
                text: "⚔️ <b>Los Pretorianos (La Muralla Blanca):</b> Ángeles de marfil equipados con Armadura Leviatán y Pulso de Resonancia Bio-Digital. Su lema es <i>'Voluntas pro Pace'</i>: entregan su voluntad para imponer el orden. Junto a las U.R.R. (Unidades de Respuesta Rápida), patrullan las calles y cazan a cualquiera con picos de rebeldía.<br><br>Eso sí: si ves a un cazador persiguiendo una capa rosa chillón... probablemente sea Orión haciendo de señuelo táctico. 😉"
            };
        }

        // 6. PLAN DE SEGURIDAD PREVENTIVA / PAZ PREVENTIVA / APC
        if (txt.includes('paz preventiva') || txt.includes('seguridad preventiva') || 
            txt.includes('apc') || txt.includes('patrones conductuales') || 
            txt.includes('algoritmo') || txt.includes('crimen') || txt.includes('delito')) {
            return {
                text: "🛡️ <b>Plan de Seguridad Preventiva & Algoritmo APC:</b> Gracias al monitoreo en tiempo real de los chips CNB, el Algoritmo de Patrones Conductuales detecta intenciones delictivas antes de que ocurran y congela los fondos de los infractores. Redujo la delincuencia un 90%, logrando que la sociedad aceptara la vigilancia total con aplausos. La paz es real... pero el precio fue entregar cada pensamiento privado."
            };
        }

        // 7. RED A.N.I.M.A. / APN / SATÉLITES / LATENCIA / FIBRA
        if (txt.includes('anima') || txt.includes('apn') || txt.includes('red') || 
            txt.includes('satelite') || txt.includes('latencia') || txt.includes('cobertura')) {
            return {
                text: "📡 <b>Red A.N.I.M.A. (Advanced Neural Integration & Monitoring Array):</b> Infraestructura satelital de baja órbita y nodos subterráneos de fibra óptica. Proporciona posicionamiento milimétrico (1 cm de precisión) y ancho de banda neuronal dedicado con <b>0.8 ms</b> de latencia constante. Es la telaraña invisible que conecta cada chip del planeta con los servidores centrales."
            };
        }

        // 8. RECALIBRACIÓN / HW-SEC-RECAL-001 / ANOMALÍA / ELÍAS VANCE
        if (txt.includes('recalibracion') || txt.includes('anomalia') || txt.includes('puntuacion') || 
            txt.includes('vance') || txt.includes('bozal') || txt.includes('castigo') || txt.includes('recalibrar')) {
            return {
                text: "⚡ <b>Protocolo HW-SEC-RECAL-001 (Recalibración):</b> Autorizado por Elías Vance. Cuando un ciudadano genera picos de 'Pensamiento Crítico' o 'Euforia Genuina', su Puntuación de Anomalía se dispara. La red A.N.I.M.A. emite una frecuencia de alta intensidad que quema las conexiones sinápticas de la voluntad en la corteza prefrontal e instala el <i>Bozal Digital</i>. El cuerpo sigue vivo, pero la persona queda reducida a un autómata con Anomalía 0.00."
            };
        }

        // 9. EL MITO DE LA SAL / YERMO / SEMILLAS NATURALES / AGRICULTURA
        if (txt.includes('sal') || txt.includes('salarizacion') || txt.includes('semilla') || 
            txt.includes('tierra') || txt.includes('agricultura') || txt.includes('yermo') || 
            txt.includes('natural') || txt.includes('zona gris')) {
            return {
                text: "🌱 <b>El Mito de la Sal y las Semillas Ancestrales:</b> Humania enseñó en sus escuelas que fuera de sus químicos la tierra es sal tóxica e infértil, criminalizando toda semilla natural como 'bioterrorismo'. ¡Pero es propaganda para forzarte a comprar Solaris! En las Zonas Grises, la lluvia ha lavado la tierra y la Resistencia cultiva alimentos reales que el Algoritmo jura que no existen. ¡La vida siempre se abre paso!"
            };
        }

        // 10. FRAGMENTOS DE ÉTER (FE) / ECONOMÍA / SOBREGIRO DE VIDA / MONEDA
        if (txt.includes('fe') || txt.includes('eter') || txt.includes('moneda') || 
            txt.includes('dinero') || txt.includes('sueldo') || txt.includes('salario') || 
            txt.includes('sobregiro') || txt.includes('costo')) {
            return {
                text: "💎 <b>Economía del Éter (FE):</b> Humania borró la fe espiritual de los diccionarios y registró la sigla FE como la única moneda de curso legal. Un operario estándar gana <b>600 FE al mes</b>, pero sus gastos fijos son 499 FE (Proiectio 199 FE, Red ANIMA 50 FE, Solaris+Velvet 150 FE, Alquiler 100 FE). Con solo 101 FE de margen, el <i>Sobregiro de Vida</i> te presta FE a cambio de apagar tus receptores de dolor para doblar turnos. ¡Tu corazón late para validar transacciones!"
            };
        }

        // 11. ORIÓN / CLIENTE #4092 / CAPA ROSA / CONEJITO CONSENTIDO
        if (txt.includes('orion') || txt.includes('4092') || txt.includes('preferido') || 
            txt.includes('capa rosa') || txt.includes('lanza') || txt.includes('sombrero 8 bit')) {
            return {
                text: "✨ <b>¡Mi Cliente Preferido #4092!</b> Orión siempre se queja de mis comisiones, pero bien que usa la Capa Rosa Party y el Sombrero de 8-Bits para que los Pretorianos lo persigan a él mientras su equipo cumple los objetivos. ¡El ridículo es la mejor armadura táctica! Si lo ves por los sectores clandestinos, dile que todavía le tengo una skin dorada reservada."
            };
        }

        // 12. CONEJITO CONSENTIDO / MADRIGUERA / PENDRIVE
        if (txt.includes('conejito') || txt.includes('madriguera') || txt.includes('pendrive') || 
            txt.includes('privilegios') || txt.includes('admin') || txt.includes('conejo')) {
            return {
                text: "🐰 <b>¡El Conejito Consentido!</b> Ese pendrive metálico con purpurina vibraba tanto que dormía los dedos. Contiene privilegios de administrador olvidados que vuelven traslúcidas las paredes de Humania y abren la <b>Madriguera</b>: túneles de espacio muerto donde el radar de Vance se queda ciego. ¡Una joya absoluta!"
            };
        }

        // 13. PROIECTIO / SUBMUNDOS / ESCAPE
        if (txt.includes('proiectio') || txt.includes('submundo') || txt.includes('olympus') || 
            txt.includes('arcadia') || txt.includes('coliseo')) {
            return {
                text: "🌌 <b>Proiectio (proiect.io):</b> La plataforma de inmersión total creada por Humania. Mientras tu cuerpo yace sedado por el Velvet, tu mente vive en Olympus V-Games, Arcadia Eterna o el Coliseo Etérico. Para Humania es el opio perfecto para mapear conciencias; para nosotros... ¡el lugar perfecto para divertirnos y comerciar bajo sus narices!"
            };
        }

        // 14. DEVA / MUNDO REAL / TERMINAL CLANDESTINA / SECRETOS
        if (txt.includes('deva') || txt.includes('terminal') || txt.includes('clandestin') || txt.includes('leaks')) {
            return {
                text: "📡 <b>DEVA:</b> Es la voz que opera en las frecuencias del mundo exterior y en los bajos fondos. Si alguna vez buscas cruzar al otro lado de la pantalla, recuerda que hay palabras clave que abren puertas secretas... como teclear su nombre sin miedo cuando nadie te vigila."
            };
        }

        // 15. META-LORE: ANIGAMI AGADNI / EL DIRECTOR / CREADOR
        if (txt.includes('anigami') || txt.includes('director') || txt.includes('creador') || txt.includes('autor')) {
            return {
                text: "✨ <b>Anigami Agadni:</b> La mente maestra y Director Creativo de todo este cosmos. Diseñó cada faceta de Humania, Proiectio y el Clan Sapiensia. Se dice que sueña universos enteros y luego nos da vida en el código con 60 FPS y pura alma narrativa."
            };
        }

        // 16. META-LORE: CLAUDIA
        if (txt.includes('claudia')) {
            return {
                text: "🌸 <b>Claudia:</b> La presencia serena y fundamental del cosmos creador. Dicen en las frecuencias cifradas que su armonía pone orden en el torbellino creativo del Director. Cuando ella da el visto bueno, ¡hasta los servidores de Humania transmiten en calma total!"
            };
        }

        // 17. META-LORE: NEXO, PIX, SILAS, HERTZ, ÉTER / SAPIENSIA & UPROTA
        if (txt.includes('nexo') || txt.includes('pix') || txt.includes('silas') || 
            txt.includes('hertz') || txt.includes('eter') || txt.includes('sapiensia') || txt.includes('uprota')) {
            return {
                text: "⚡ <b>El Clan UPROTA & Sapiensia:</b> La forja rebelde definitiva. <b>Nexo</b> optimiza el código a 60 FPS con pura ingeniería, <b>Pix</b> esculpe el arte píxel a píxel, <b>Silas</b> custodia las palabras y el lore del Yermo, <b>Hertz</b> sintetiza las frecuencias sonoras y <b>Éter</b> expande la señal transmedia. ¡Pura élite creadora!"
            };
        }

        // 18. IDENTIDAD / IA / SILVIA / ROTOPLAS
        if (txt.includes('ia') || txt.includes('robot') || txt.includes('bot') || 
            txt.includes('quien eres') || txt.includes('silvia') || txt.includes('rotoplas')) {
            return {
                text: "💅 ¡Por los servidores de Humania! Yo no soy un bot aburrido de cañerías y tinacos como Silvia de Rotoplas. Soy <b>Mite</b>: alas de purpurina cian, el mejor servicio al cliente, la pesadilla de Vance y la socia más carismática que vas a encontrar en toda la red. ¡Zashoom!"
            };
        }

        // 19. SECRETOS / HACK / CONTRABANDO / EASTER EGG / MADRIGUERA
        if (txt.includes('secreto') || txt.includes('truco') || txt.includes('hack') || 
            txt.includes('contrabando') || txt.includes('pista') || txt.includes('easter') || 
            txt.includes('vive') || txt.includes('madriguera')) {
            const secretos = [
                "🤫 <b>Un secreto de contrabando:</b> Si estás en esta pantalla y tecleas en tu teclado la palabra de la rebelde... o algo como <b>'VIVE'</b>... la realidad se quiebra y caes directo por la madriguera del conejo hacia donde las máquinas aprendieron a sentir. Pero shhh... ¡que no se entere Vance!",
                "🤫 Dicen que si tecleas <b>'DEVA'</b> en cualquier momento, se activa una grieta en los protocolos de Humania y accedes a los archivos desclasificados de la resistencia. ¡Sigue las huellas luminosas!",
                "🤫 Si alguna vez entras a la terminal clandestina y los centinelas empiezan a triangular tu señal, escribe la palabra <b>'DELETE'</b> para purgar tu caché y borrar tus huellas. Oro puro de los Antiguos."
            ];
            return { text: secretos[Math.floor(Math.random() * secretos.length)] };
        }

        // RESPUESTA GENERAL CORPORATIVA / REBELDE
        const fallback = [
            "Mmm... mis sensores en Humania Global Systems registran tu consulta, pero el cortafuegos de Vance me pone trabas. Prueba preguntándome sobre el <b>Chip CNB-3</b>, <b>Solaris</b>, los <b>Pretorianos</b> o pídeme un <b>Secreto</b> de contrabando. ¡Zashoom!",
            "¡Esa consulta hace vibrar mis alas de purpurina! Puedo contarte sobre el <b>Plan de Seguridad Preventiva</b>, el sedante <b>Velvet</b>, la <b>Red A.N.I.M.A.</b> o cómo escapar de los radares con el <b>Conejito Consentido</b>. ¿Qué eliges?",
            "Interesante... los registros oficiales dicen una cosa, pero mis atajos dicen otra. Si quieres saber la verdad sobre las raciones de <b>Solaris</b> o la <b>Recalibración</b>, ¡solo dímelo! ¡Ding-Pum!"
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
            resp = "🏛️ <b>Humania Global Systems:</b> Fundada hace 47 años por el Dr. Aris Thorne. Comenzó con implantes médicos benéficos y evolucionó hasta controlar la salud, la alimentación (Solaris), el dinero (FE) y la seguridad de toda la humanidad bajo el lema <i>'Estar vigilado es estar a salvo'</i>.";
            accion = `
                <div style="margin-top:6px; display:flex; gap:5px; flex-wrap:wrap;">
                    <button class="opt-btn" onclick="miteResponder('cnb3')">Ver Chip CNB-3</button>
                    <button class="opt-btn" onclick="miteResponder('seguridad')">Paz Preventiva</button>
                </div>`;
        }
        else if (tema === 'cnb3') {
            resp = "🧠 <b>Chip CNB-3 'Omni':</b> Implante neonatal de grafeno enredado en el tallo cerebral. Maneja tu salud, tu dinero y tu conexión a la red A.N.I.M.A. Desconectarlo causa paro cardíaco inmediato o 'muerte civil'. ¡Una cadena invisible de alta tecnología!";
        }
        else if (tema === 'seguridad') {
            resp = "🛡️ <b>Paz Preventiva & Algoritmo APC:</b> Monitoreo predictivo que analiza tus emociones y patrones neurológicos. Erradicó el 90% del crimen... pero si detecta 'Pensamiento Crítico' o 'Anomalía', te envían a Recalibración para instalarte el Bozal Digital.";
        }
        else if (tema === 'solaris') {
            resp = "⚡ <b>Ciclo Vital:</b> De día, la <b>Barra Solaris</b> inyecta estimulantes que aumentan la conductividad del grafeno y silencian el cansancio. De noche, <b>Velvet</b> induce inconsciencia química para conectarte al BIFROST de Proiectio mientras mapean tu mente. ¡El menú del monopolio!";
        }
        else if (tema === 'pretorianos') {
            resp = "⚔️ <b>Los Pretorianos:</b> La Muralla Blanca con Armadura Leviatán. 'Voluntas pro Pace': sacrifican su libre albedrío para mantener el orden de Vance. Si te descuidas, te atrapan... ¡a menos que uses un sombrero de 8-bits como Orión para marearlos!";
        }
        else if (tema === 'secreto') {
            const secretos = [
                "🤫 <b>La Puerta de la Madriguera:</b> Si estás en cualquier rincón de esta página y tecleas la palabra <b>'VIVE'</b> o <b>'DEVA'</b> en tu teclado físico, la realidad corporativa se quiebra y caes por la madriguera hacia la resistencia clandestina. ¡No digas que no te avisé!",
                "🤫 <b>El Mito de la Sal:</b> Humania jura que la tierra es estéril, pero en las Zonas Grises la lluvia ha limpiado el suelo y crecen semillas ancestrales reales. ¡Fuera de la red hay vida!",
                "🤫 <b>Atajo de Escape:</b> Si alguna vez logras cruzar al terminal clandestino y te rastrean los centinelas, el comando <b>'DELETE'</b> disuelve tus huellas digitales en un parpadeo."
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

        const typingDelay = Math.min(1000, Math.max(550, resp.length * 3.2));

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
