// VARIABLES GLOBALES
let currentCategory = '';
let currentImage = '';

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', function() {
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initSamples();
});

// HEADER SCROLL EFFECT
function initHeaderScroll() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// MENÚ MÓVIL
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// SCROLL SUAVE
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ANIMACIONES AL SCROLL
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.section-header, .meson-card, .categoria-card').forEach(el => {
        observer.observe(el);
    });
}

// DROPDOWN TOGGLE
function toggleDropdown(e, id) {
    e.preventDefault();
    e.stopPropagation();
    
    // Cerrar otros dropdowns
    document.querySelectorAll('.dropdown-content').forEach(drop => {
        if (drop.id !== id) drop.classList.remove('show');
    });
    
    const dropdown = document.getElementById(id);
    dropdown.classList.toggle('show');
}

// Cerrar dropdowns al hacer clic fuera
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-content').forEach(drop => {
        drop.classList.remove('show');
    });
});

// SCROLL TO SECTION
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// MODAL FUNCTIONS
function openModal(type) {
    const modal = document.getElementById('servicioModal');
    const content = document.getElementById('servicioContent');
    
    if (type === 'cita') {
        content.innerHTML = `
            <div class="nosotros-section">
                <h2>Agenda tu Cita</h2>
                <p style="margin-top: 20px;">Nuestros asesores te atenderán personalmente para conocer tus necesidades y diseñar el espacio de tus sueños.</p>
                <p style="margin-top: 15px; color: var(--color-gold);">Teléfono: +57 3123724337</p>
                <a href="#cotizacion" class="btn btn-gold" style="margin-top: 20px;" onclick="closeModal('servicioModal')">Ir al Formulario</a>
            </div>
        `;
    } else if (type === 'garantia') {
        content.innerHTML = `
            <div class="nosotros-section">
                <h2>Solicitud de Garantía</h2>
                <p style="margin-top: 20px;">En AP Cocinas Modernas garantizamos la calidad de nuestros productos. Completa el formulario de cotización seleccionando "Solicitud de Garantía" y nos pondremos en contacto contigo.</p>
                <a href="#cotizacion" class="btn btn-gold" style="margin-top: 20px;" onclick="closeModal('servicioModal')">Solicitar Garantía</a>
            </div>
        `;
    }
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// NOSOTROS CONTENT
function showNosotrosContent(type) {
    const modal = document.getElementById('nosotrosModal');
    const content = document.getElementById('nosotrosContent');
    
    const contents = {
        quienes: {
            title: '¿Quiénes Somos?',
            text: `En AP Cocinas Modernas no solo diseñamos cocinas… creamos espacios donde nacen momentos inolvidables.<br><br>
            Somos una empresa especializada en el diseño, fabricación e instalación de cocinas modernas y mobiliario personalizado, enfocada en transformar sueños en realidades tangibles. Cada proyecto que realizamos está pensado para combinar elegancia, funcionalidad y calidad superior.<br><br>
            Nos distinguimos por nuestro compromiso, cumplimiento y excelencia en cada detalle. Para nosotros, cada cliente es único, y cada cocina es una obra hecha a la medida de su estilo de vida.<br><br>
            Trabajamos con materiales de alta calidad, acabados modernos y diseños innovadores que elevan el valor y la estética de cada hogar. Pero más allá de los materiales, lo que realmente nos diferencia es nuestra pasión por ver a nuestros clientes satisfechos, felices y orgullosos de su espacio.`
        },
        mision: {
            title: 'Nuestra Misión',
            text: `Cumplir los sueños de nuestros clientes diseñando y fabricando cocinas modernas y espacios personalizados que reflejen su estilo, personalidad y necesidades, garantizando siempre calidad superior, cumplimiento en tiempos de entrega y un servicio cercano, transparente y profesional.`
        },
        vision: {
            title: 'Nuestra Visión',
            text: `Ser la empresa líder en diseño y fabricación de cocinas modernas en la región, reconocida por nuestra excelencia, innovación, cumplimiento y por convertir cada proyecto en una experiencia memorable de satisfacción y confianza para nuestros clientes.`
        }
    };
    
    const data = contents[type];
    content.innerHTML = `
        <div class="nosotros-section">
            <h2>${data.title}</h2>
            <p>${data.text}</p>
        </div>
    `;
    
    // Cerrar dropdown
    document.getElementById('nosotrosDropdown').classList.remove('show');
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// MESONES DETAIL
function showMesonDetail(type) {
    const modal = document.getElementById('mesonModal');
    const content = document.getElementById('mesonContent');
    
    const mesonesData = {
        sinterizada: {
            title: 'Piedra Sinterizada',
            description: 'La piedra sinterizada es un material compuesto por productos naturales como polvo de piedra, minerales o pigmentos. El proceso de sinterización emula la creación de rocas ígneas naturales, donde los minerales se funden y solidifican a altas temperaturas.',
            colors: [
                { name: 'Rossini', color: '#f5f5f5' },
                { name: 'Catalatta Borgie', color: '#fafafa' },
                { name: 'Ducald Gold', color: '#f0e6d2' },
                { name: 'Blanco Lanos', color: '#ffffff' },
                { name: 'Statuario', color: '#f8f8f8' },
                { name: 'Calacatta', color: '#f5f5f0' },
                { name: 'Gris', color: '#888888' }
            ]
        },
        granito: {
            title: 'Granito',
            description: 'El granito es una roca ígnea plutónica natural, compuesta principalmente por cuarzo, feldespato y mica, reconocida por su gran dureza, durabilidad y textura granular.',
            colors: [
                { name: 'Negro Absoluto', color: '#1a1a1a' },
                { name: 'Gris Perla', color: '#6a6a6a' },
                { name: 'Rosa Porriño', color: '#d4a5a5' },
                { name: 'Blanco Cristal', color: '#e8e8e8' },
                { name: 'Verde Ubatuba', color: '#2d4a3e' }
            ]
        },
        cuarzo: {
            title: 'Cuarzo',
            description: 'El cuarzo es un mineral compuesto de sílice cristalizada, extremadamente duro y resistente. Nuestros mesones de cuarzo ofrecen una superficie no porosa, higiénica y de bajo mantenimiento.',
            colors: [
                { name: 'Blanco Extra', color: '#ffffff' },
                { name: 'Blanco Polar', color: '#f8f8f8' },
                { name: 'Gris Polar', color: '#c0c0c0' },
                { name: 'Negro Estelar', color: '#2a2a2a' },
                { name: 'Beige Arena', color: '#e6dcc3' }
            ]
        }
    };
    
    const data = mesonesData[type];
    
    let colorsHTML = '<div class="color-options" style="margin-top: 30px;">';
    data.colors.forEach((c, index) => {
        colorsHTML += `
            <div class="color-option" style="background: ${c.color};" data-name="${c.name}" title="${c.name}">
                <span style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); font-size: 0.75rem; color: var(--color-white); white-space: nowrap;">${c.name}</span>
            </div>
        `;
    });
    colorsHTML += '</div>';
    
    content.innerHTML = `
        <h2 style="font-family: var(--font-secondary); color: var(--color-gold); font-size: 2rem; margin-bottom: 20px;">${data.title}</h2>
        <p style="color: var(--color-gray-light); line-height: 1.8; font-size: 1.1rem;">${data.description}</p>
        <h3 style="color: var(--color-gold); margin-top: 30px; font-size: 1.3rem;">Colores Disponibles</h3>
        ${colorsHTML}
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// INICIALIZAR SAMPLES DE MADERA
function initSamples() {
    // Agregar samples a los bloques de madera
    document.querySelectorAll('.madera-samples').forEach(container => {
        for (let i = 0; i < 4; i++) {
            const sample = document.createElement('div');
            sample.className = 'sample';
            container.appendChild(sample);
        }
    });
}

// MADERA DETAIL
function showMaderaDetail(type) {
    const modal = document.getElementById('maderaModal');
    const content = document.getElementById('maderaContent');
    
    const maderaData = {
        claros: {
            title: 'Tonos Claros',
            description: 'Maderas claras que aportan luminosidad y amplitud a tus espacios. Ideales para ambientes modernos y minimalistas.',
            tonos: ['Arena', 'Kallio', 'Oasis', 'Glacial', 'Chantillí', 'Bahía']
        },
        oscuros: {
            title: 'Tonos Oscuros',
            description: 'Elegancia y sofisticación con nuestras maderas oscuras. Perfectas para crear ambientes cálidos y distinguidos.',
            tonos: ['Nuez', 'Koa', 'Mitte', 'Tabacco Chic', 'Humo', 'Austral']
        },
        solidos: {
            title: 'Acabados Sólidos',
            description: 'Colores planos modernos que se adaptan a cualquier estilo de decoración. Versatilidad y diseño contemporáneo.',
            tonos: ['Negro', 'Perla', 'Graffo', 'Ultramar', 'Verde Olivo', 'Ámbar']
        }
    };
    
    const data = maderaData[type];
    
    let tonosHTML = '<div class="madera-samples" style="margin-top: 20px;">';
    data.tonos.forEach(tono => {
        tonosHTML += `<div class="sample" style="background: var(--color-gold); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: var(--color-black); font-weight: 600;">${tono}</div>`;
    });
    tonosHTML += '</div>';
    
    content.innerHTML = `
        <h2 style="font-family: var(--font-secondary); color: var(--color-gold); font-size: 2rem; margin-bottom: 20px;">${data.title}</h2>
        <p style="color: var(--color-gray-light); line-height: 1.8; font-size: 1.1rem;">${data.description}</p>
        <h3 style="color: var(--color-gold); margin-top: 30px; font-size: 1.3rem;">Tonos Disponibles</h3>
        ${tonosHTML}
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// CATEGORÍA DETAIL CON SIMULADOR
function showCategoria(type) {
    const modal = document.getElementById('categoriaModal');
    const content = document.getElementById('categoriaContent');
    
    currentCategory = type;
    
    const categoriasData = {
        cocinas: {
            title: 'Cocinas',
            images: ['cocina1.jpg', 'cocina2.jpg', 'cocina3.jpg'],
            hasSimulator: true
        },
        closets: {
            title: 'Closets',
            images: ['closet1.jpg', 'closet2.jpg'],
            hasSimulator: false
        },
        'centros-tv': {
            title: 'Centros de TV',
            images: ['centro1.jpg', 'centro2.jpg'],
            hasSimulator: true
        },
        puertas: {
            title: 'Puertas',
            images: ['puerta1.jpg', 'puerta2.jpg'],
            hasSimulator: false
        }
    };
    
    const data = categoriasData[type];
    
    // Galería de imágenes
    let galleryHTML = '<div class="gallery-grid">';
    for (let i = 0; i < 6; i++) {
        galleryHTML += `
            <div class="gallery-item" onclick="selectImageForSimulator(this, '${type}')">
                <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%); display: flex; align-items: center; justify-content: center; color: var(--color-gold); font-size: 2rem;">
                    <i class="fas fa-image"></i>
                </div>
            </div>
        `;
    }
    galleryHTML += '</div>';
    
    // Simulador (solo para cocinas y centros de TV)
    let simulatorHTML = '';
    if (data.hasSimulator) {
        simulatorHTML = `
            <div style="margin-top: 30px; text-align: center;">
                <button class="btn btn-outline" onclick="toggleSimulator('${type}')">
                    <i class="fas fa-palette"></i> Abrir Simulador
                </button>
            </div>
            <div id="simuladorSection" style="display: none; margin-top: 30px;">
                <div class="simulador-container">
                    <div class="simulador-preview" id="simuladorPreview">
                        <p style="color: var(--color-gray-light);">Selecciona una imagen de la galería para comenzar</p>
                    </div>
                    <div class="simulador-controls">
                        <h4>Selecciona el Color</h4>
                        <div class="color-options" id="colorOptions">
                            <div class="color-option active" style="background: #d4c4a8;" onclick="changeColor('#d4c4a8', this)" data-name="Arena"></div>
                            <div class="color-option" style="background: #c9b896;" onclick="changeColor('#c9b896', this)" data-name="Kallio"></div>
                            <div class="color-option" style="background: #e8dcc4;" onclick="changeColor('#e8dcc4', this)" data-name="Oasis"></div>
                            <div class="color-option" style="background: #3d2817;" onclick="changeColor('#3d2817', this)" data-name="Nuez"></div>
                            <div class="color-option" style="background: #4a3728;" onclick="changeColor('#4a3728', this)" data-name="Koa"></div>
                            <div class="color-option" style="background: #1a1a1a;" onclick="changeColor('#1a1a1a', this)" data-name="Negro"></div>
                            <div class="color-option" style="background: #c9a962;" onclick="changeColor('#c9a962', this)" data-name="Dorado"></div>
                            <div class="color-option" style="background: #f5f5f5;" onclick="changeColor('#f5f5f5', this)" data-name="Blanco"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    content.innerHTML = `
        <h2 style="font-family: var(--font-secondary); color: var(--color-gold); font-size: 2.5rem; margin-bottom: 10px; text-align: center;">${data.title}</h2>
        <p style="text-align: center; color: var(--color-gray-light); margin-bottom: 30px;">Haz clic en una imagen para ver en detalle${data.hasSimulator ? ' o usar el simulador' : ''}</p>
        ${galleryHTML}
        ${simulatorHTML}
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function toggleSimulator(type) {
    const simuladorSection = document.getElementById('simuladorSection');
    simuladorSection.style.display = simuladorSection.style.display === 'none' ? 'block' : 'none';
    if (simuladorSection.style.display === 'block') {
        simuladorSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function selectImageForSimulator(element, type) {
    const preview = document.getElementById('simuladorPreview');
    if (preview) {
        preview.innerHTML = `
            <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: var(--selected-color, transparent); opacity: 0.3; mix-blend-mode: overlay; transition: all 0.3s ease;"></div>
                <i class="fas fa-image" style="font-size: 4rem; color: var(--color-gold);"></i>
                <p style="position: absolute; bottom: 20px; color: var(--color-white);">Vista previa del diseño</p>
            </div>
        `;
    }
}

function changeColor(color, element) {
    // Actualizar active state
    document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');
    
    // Aplicar color a la vista previa
    const preview = document.querySelector('#simuladorPreview > div');
    if (preview) {
        preview.style.setProperty('--selected-color', color);
    }
}

// FORMULARIO DE COTIZACIÓN
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Validación básica
    if (!data.nombre || !data.telefono || !data.ubicacion || !data.email || !data.servicio) {
        showNotification('Por favor completa todos los campos obligatorios', 'error');
        return;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Por favor ingresa un correo válido', 'error');
        return;
    }
    
    // Preparar mensaje para WhatsApp y Email
    const mensaje = `
*Nueva Solicitud de AP Cocinas Modernas*

*Nombre:* ${data.nombre}
*Teléfono:* ${data.telefono}
*Ubicación:* ${data.ubicacion}
*Email:* ${data.email}
*Servicio:* ${data.servicio}
*Mensaje:* ${data.mensaje || 'No especificado'}

Fecha: ${new Date().toLocaleString()}
    `;
    
    // Enviar a WhatsApp (simulado - en producción usar API)
    const whatsappUrl = `https://wa.me/573123724337?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
    
    // Simular envío de email
    console.log('Enviando email a: cocinas.modernas.ap@gmail.com');
    console.log('Contenido:', mensaje);
    
    // Mostrar confirmación
    showNotification('¡Información enviada! Un asesor se contactará contigo pronto.', 'success');
    
    // Resetear formulario
    e.target.reset();
}

// CHATBOT FUNCTIONS
function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbotWindow');
    chatbotWindow.classList.toggle('show');
}

function handleChatOption(option) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const form = document.getElementById('chatbotForm');
    
    // Agregar mensaje del usuario
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    
    const responses = {
        contacto: 'Contactarme con un asesor',
        materiales: '¿Qué materiales manejan?',
        cita: 'Quiero agendar cita',
        ubicacion: '¿Dónde están ubicados?'
    };
    
    userMessage.innerHTML = `<p>${responses[option]}</p>`;
    messagesContainer.appendChild(userMessage);
    
    // Respuesta del bot después de un delay
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot';
        
        if (option === 'materiales') {
            botMessage.innerHTML = `<p>Manejamos los siguientes materiales:<br><br>• Madera RH (Resistente a la Humedad)<br>• MDF y MDP de alta calidad<br>• Mesones en piedra sinterizada, cuarzo y granito<br>• Herrajes importados<br><br>¿Te gustaría recibir más información?</p>`;
            messagesContainer.appendChild(botMessage);
        } else if (option === 'ubicacion') {
            botMessage.innerHTML = `<p>📍 Estamos ubicados en:<br>Cl. 35 #22a-14 LC Brr Santander<br>Meta, Villavicencio, Colombia<br><br>🕐 Horario: Lun - Vie: 8:00 AM - 6:00 PM</p>`;
            messagesContainer.appendChild(botMessage);
        } else {
            // Para contacto y cita, mostrar formulario
            botMessage.innerHTML = `<p>Por favor déjanos tus datos y un asesor se contactará contigo:</p>`;
            messagesContainer.appendChild(botMessage);
            form.style.display = 'block';
        }
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 500);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendChatData() {
    const nombre = document.getElementById('chatNombre').value;
    const telefono = document.getElementById('chatTelefono').value;
    const email = document.getElementById('chatEmail').value;
    
    if (!nombre || !telefono) {
        showNotification('Por favor ingresa al menos nombre y teléfono', 'error');
        return;
    }
    
    const mensaje = `
*Nuevo Contacto desde Chatbot AP Cocinas*

*Nombre:* ${nombre}
*Teléfono:* ${telefono}
*Email:* ${email || 'No especificado'}

Fecha: ${new Date().toLocaleString()}
    `;
    
    // Enviar a WhatsApp
    const whatsappUrl = `https://wa.me/573123724337?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
    
    // Confirmación
    const messagesContainer = document.getElementById('chatbotMessages');
    const confirmation = document.createElement('div');
    confirmation.className = 'message bot';
    confirmation.innerHTML = `<p>✅ ¡Información enviada! Un asesor se contactará contigo en breve.</p>`;
    messagesContainer.appendChild(confirmation);
    
    document.getElementById('chatbotForm').style.display = 'none';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    showNotification('Información enviada correctamente', 'success');
}

// NOTIFICACIONES
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.background = type === 'error' ? '#e74c3c' : 'var(--color-gold)';
    notification.style.color = type === 'error' ? '#fff' : 'var(--color-black)';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Cerrar modales con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.style.overflow = 'auto';
    }
});

// Cerrar modal al hacer clic fuera
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
});