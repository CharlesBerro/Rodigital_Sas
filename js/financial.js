// ===== FINANCIAL PAGE FUNCTIONALITY ===== //

// Datos de los informes financieros por año
const financialReports = {
    2024: {
        balance: {
            title: "Balance General 2024",
            description: "Estado de la situación financiera al 31 de diciembre de 2024",
            embedUrl: "https://app.box.com/s/r7io71xj1pv2qjkwfajpg0oj3oajhxvi",
            downloadUrl: "#", // URL de descarga directa si está disponible
            icon: "fas fa-balance-scale"
        },
        resultados: {
            title: "Estado de Resultados 2024",
            description: "Resultados de las operaciones del período enero-diciembre 2024",
            embedUrl: "https://app.box.com/s/r7io71xj1pv2qjkwfajpg0oj3oajhxvi",
            downloadUrl: "#",
            icon: "fas fa-chart-bar"
        },
        // flujo: {
        //     title: "Flujo de Caja 2024",
        //     description: "Movimientos de efectivo del período enero-diciembre 2024",
        //     embedUrl: "https://app.box.com/embed/s/9g91qglsnmsknmnnw1213oi7qq0mfcuu?sortColumn=date",
        //     downloadUrl: "#",
        //     icon: "fas fa-exchange-alt"
        // }
    },
    
    // 2023: {
    //     balance: {
    //         title: "Balance General 2023",
    //         description: "Estado de la situación financiera al 31 de diciembre de 2023",
    //         embedUrl: "https://app.box.com/embed/s/ejemplo2023balance?sortColumn=date",
    //         downloadUrl: "#",
    //         icon: "fas fa-balance-scale"
    //     },
    //     resultados: {
    //         title: "Estado de Resultados 2023",
    //         description: "Resultados de las operaciones del período enero-diciembre 2023",
    //         embedUrl: "https://app.box.com/embed/s/ejemplo2023resultados?sortColumn=date",
    //         downloadUrl: "#",
    //         icon: "fas fa-chart-bar"
    //     },
    //     flujo: {
    //         title: "Flujo de Caja 2023",
    //         description: "Movimientos de efectivo del período enero-diciembre 2023",
    //         embedUrl: "https://app.box.com/embed/s/ejemplo2023flujo?sortColumn=date",
    //         downloadUrl: "#",
    //         icon: "fas fa-exchange-alt"
    //     }
    // },
    // 2022: {
    //     balance: {
    //         title: "Balance General 2022",
    //         description: "Estado de la situación financiera al 31 de diciembre de 2022",
    //         embedUrl: "https://app.box.com/embed/s/ejemplo2022balance?sortColumn=date",
    //         downloadUrl: "#",
    //         icon: "fas fa-balance-scale"
    //     },
    //     resultados: {
    //         title: "Estado de Resultados 2022",
    //         description: "Resultados de las operaciones del período enero-diciembre 2022",
    //         embedUrl: "https://app.box.com/embed/s/ejemplo2022resultados?sortColumn=date",
    //         downloadUrl: "#",
    //         icon: "fas fa-chart-bar"
    //     },
    //     flujo: {
    //         title: "Flujo de Caja 2022",
    //         description: "Movimientos de efectivo del período enero-diciembre 2022",
    //         embedUrl: "https://app.box.com/embed/s/ejemplo2022flujo?sortColumn=date",
    //         downloadUrl: "#",
    //         icon: "fas fa-exchange-alt"
    //     }
    // },
    // 2021: {
    //     balance: {
    //         title: "Balance General 2021",
    //         description: "Estado de la situación financiera al 31 de diciembre de 2021",
    //         embedUrl: "https://app.box.com/embed/s/ejemplo2021balance?sortColumn=date",
    //         downloadUrl: "#",
    //         icon: "fas fa-balance-scale"
    //     },
    //     resultados: {
    //         title: "Estado de Resultados 2021",
    //         description: "Resultados de las operaciones del período enero-diciembre 2021",
    //         embedUrl: "https://app.box.com/embed/s/ejemplo2021resultados?sortColumn=date",
    //         downloadUrl: "#",
    //         icon: "fas fa-chart-bar"
    //     },
    //     flujo: {
    //         title: "Flujo de Caja 2021",
    //         description: "Movimientos de efectivo del período enero-diciembre 2021",
    //         embedUrl: "https://app.box.com/embed/s/ejemplo2021flujo?sortColumn=date",
    //         downloadUrl: "#",
    //         icon: "fas fa-exchange-alt"
    //     }
    // }
};

// Variable para almacenar el año seleccionado
let selectedYear = null;

// ===== INICIALIZACIÓN ===== //
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS si está disponible
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Seleccionar el año actual por defecto
    selectYear(2024);
});

// ===== FUNCIONES DE SELECCIÓN DE AÑO ===== //

// Función para seleccionar año mediante botones
function selectYear(year) {
    selectedYear = year;
    
    // Actualizar botones activos
    updateYearButtons(year);
    
    // Mostrar sección de informes
    showReportsSection();
    
    // Actualizar título del año seleccionado
    updateSelectedYearTitle(year);
    
    // Cargar informes del año seleccionado
    loadReports(year);
    
    // Scroll suave a la sección de informes
    // setTimeout(() => {
    //     const reportsSection = document.getElementById('reportsSection');
    //     if (reportsSection) {
    //         reportsSection.scrollIntoView({ 
    //             behavior: 'smooth',
    //             block: 'start'
    //         });
    //     }
    // }, 300);
}

// Función para seleccionar año mediante dropdown (alternativa)
function selectYearFromDropdown() {
    const yearSelect = document.getElementById('yearSelect');
    const year = parseInt(yearSelect.value);
    
    if (year) {
        selectYear(year);
    } else {
        hideReportsSection();
    }
}

// ===== FUNCIONES DE INTERFAZ ===== //

// Actualizar botones de año
function updateYearButtons(selectedYear) {
    const yearButtons = document.querySelectorAll('.btn-year');
    
    yearButtons.forEach(button => {
        const buttonYear = parseInt(button.getAttribute('data-year'));
        
        if (buttonYear === selectedYear) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Mostrar sección de informes
function showReportsSection() {
    const reportsSection = document.getElementById('reportsSection');
    if (reportsSection) {
        reportsSection.style.display = 'block';
        
        // Agregar animación de entrada
        setTimeout(() => {
            reportsSection.classList.add('fade-in');
        }, 100);
    }
}

// Ocultar sección de informes
function hideReportsSection() {
    const reportsSection = document.getElementById('reportsSection');
    if (reportsSection) {
        reportsSection.style.display = 'none';
        reportsSection.classList.remove('fade-in');
    }
}

// Actualizar título del año seleccionado
function updateSelectedYearTitle(year) {
    const titleElement = document.getElementById('selectedYearTitle');
    if (titleElement) {
        titleElement.textContent = year;
    }
}

// ===== FUNCIONES DE CARGA DE INFORMES ===== //

// Cargar informes del año seleccionado
function loadReports(year) {
    const reportsContainer = document.getElementById('reportsContainer');
    
    if (!reportsContainer) return;
    
    // Mostrar indicador de carga
    showLoadingState(reportsContainer);
    
    // Simular tiempo de carga
    setTimeout(() => {
        const yearReports = financialReports[year];
        
        if (yearReports) {
            renderReports(reportsContainer, yearReports, year);
        } else {
            showNoReportsMessage(reportsContainer, year);
        }
    }, 800);
}

// Mostrar estado de carga
function showLoadingState(container) {
    container.innerHTML = `
        <div class="col-12">
            <div class="loading-reports">
                <div class="loading-spinner"></div>
                <p class="text-muted">Cargando informes financieros...</p>
            </div>
        </div>
    `;
}

// Renderizar informes
function renderReports(container, reports, year) {
    let html = '';
    
    // Crear tarjeta para cada tipo de informe
    Object.keys(reports).forEach((reportType, index) => {
        const report = reports[reportType];
        
        html += `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="report-card" data-aos="fade-up" data-aos-delay="${(index + 1) * 100}">
                    <div class="report-icon">
                        <i class="${report.icon}"></i>
                    </div>
                    <h4 class="report-title">${report.title}</h4>
                    <p class="report-description">${report.description}</p>
                    
                    <div class="report-iframe-container">
                        <iframe 
                            src="${report.embedUrl}" 
                            frameborder="0" 
                            allowfullscreen 
                            webkitallowfullscreen 
                            msallowfullscreen
                            title="${report.title}"
                            loading="lazy">
                        </iframe>
                    </div>
                    
                    <div class="report-actions">
                        <a href="${report.embedUrl}" 
                           target="_blank" 
                           class="btn-view-fullscreen"
                           onclick="trackReportView('${reportType}', ${year})">
                            <i class="fas fa-external-link-alt me-2"></i>Ver en Pantalla Completa
                        </a>
                        ${report.downloadUrl !== '#' ? `
                            <a href="${report.downloadUrl}" 
                               class="btn-download"
                               onclick="trackReportDownload('${reportType}', ${year})">
                                <i class="fas fa-download me-2"></i>Descargar PDF
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Aplicar animaciones de entrada
    setTimeout(() => {
        const reportCards = container.querySelectorAll('.report-card');
        reportCards.forEach(card => {
            card.classList.add('show');
        });
    }, 100);
    
    // Reinicializar AOS si está disponible
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
    window.scrollTo(0, 0); 
}


// Mostrar mensaje cuando no hay informes
function showNoReportsMessage(container, year) {
    container.innerHTML = `
        <div class="col-12">
            <div class="text-center py-5">
                <i class="fas fa-exclamation-circle text-muted mb-3" style="font-size: 3rem;"></i>
                <h4 class="text-muted">No hay informes disponibles</h4>
                <p class="text-muted">Los informes financieros para el año ${year} no están disponibles en este momento.</p>
                <button class="btn btn-outline-primary" onclick="selectYear(2024)">
                    <i class="fas fa-arrow-left me-2"></i>Ver Año Actual
                </button>
            </div>
        </div>
    `;
}

// ===== FUNCIONES DE SEGUIMIENTO (ANALYTICS) ===== //

// Rastrear visualización de informes
function trackReportView(reportType, year) {
    // Aquí puedes integrar con Google Analytics o tu sistema de seguimiento preferido
    console.log(`Informe visualizado: ${reportType} - Año: ${year}`);
    
    // Ejemplo de integración con Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'report_view', {
            'report_type': reportType,
            'year': year,
            'event_category': 'financial_reports'
        });
    }
}

// Rastrear descarga de informes
function trackReportDownload(reportType, year) {
    console.log(`Informe descargado: ${reportType} - Año: ${year}`);
    
    // Ejemplo de integración con Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'report_download', {
            'report_type': reportType,
            'year': year,
            'event_category': 'financial_reports'
        });
    }
}

// ===== FUNCIONES AUXILIARES ===== //

// Función para actualizar URLs de informes (útil para administración)
function updateReportUrls(year, reportType, embedUrl, downloadUrl = '#') {
    if (financialReports[year] && financialReports[year][reportType]) {
        financialReports[year][reportType].embedUrl = embedUrl;
        financialReports[year][reportType].downloadUrl = downloadUrl;
        
        // Recargar informes si es el año actualmente seleccionado
        if (selectedYear === year) {
            loadReports(year);
        }
        
        console.log(`URLs actualizadas para ${reportType} ${year}`);
    }
}

// Función para agregar un nuevo año de informes
function addYearReports(year, reports) {
    financialReports[year] = reports;
    
    // Agregar botón para el nuevo año (si no existe)
    addYearButton(year);
    
    console.log(`Informes agregados para el año ${year}`);
}

// Agregar botón de año dinámicamente
function addYearButton(year) {
    const yearButtonsContainer = document.querySelector('.year-buttons-container .row');
    
    if (yearButtonsContainer) {
        // Verificar si el botón ya existe
        const existingButton = yearButtonsContainer.querySelector(`[data-year="${year}"]`);
        
        if (!existingButton) {
            const buttonHtml = `
                <div class="col-6 col-md-3">
                    <button class="btn btn-year w-100" data-year="${year}" onclick="selectYear(${year})">
                        <i class="fas fa-calendar-alt mb-2"></i>
                        <div class="year-text">${year}</div>
                        <small class="year-subtitle">Nuevo</small>
                    </button>
                </div>
            `;
            
            yearButtonsContainer.insertAdjacentHTML('afterbegin', buttonHtml);
        }
    }
}

// ===== MANEJO DE ERRORES ===== //

// Manejar errores de carga de iframes
function handleIframeError(iframe) {
    const container = iframe.closest('.report-iframe-container');
    
    if (container) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-exclamation-triangle text-warning mb-3" style="font-size: 2rem;"></i>
                <p class="text-muted">Error al cargar el informe</p>
                <button class="btn btn-outline-primary btn-sm" onclick="location.reload()">
                    <i class="fas fa-refresh me-2"></i>Reintentar
                </button>
            </div>
        `;
    }
}

// ===== RESPONSIVE UTILITIES ===== //

// Ajustar altura de iframes en dispositivos móviles
function adjustIframeHeights() {
    const iframes = document.querySelectorAll('.report-iframe-container iframe');
    const isMobile = window.innerWidth <= 768;
    
    iframes.forEach(iframe => {
        const container = iframe.closest('.report-iframe-container');
        if (container) {
            container.style.height = isMobile ? '350px' : '500px';
        }
    });
}

// Escuchar cambios de tamaño de ventana
window.addEventListener('resize', debounce(adjustIframeHeights, 250));

// ===== UTILIDADES ===== //

// Función debounce para optimizar eventos
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== EXPORTAR FUNCIONES PARA USO GLOBAL ===== //
window.selectYear = selectYear;
window.selectYearFromDropdown = selectYearFromDropdown;
window.trackReportView = trackReportView;
window.trackReportDownload = trackReportDownload;
window.updateReportUrls = updateReportUrls;
window.addYearReports = addYearReports;

