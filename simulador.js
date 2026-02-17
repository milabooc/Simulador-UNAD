// ============================================
// Simulador de Matrícula UNAD - JavaScript
// Curso: Estructura de Datos
// Conversión de simulador.py a JavaScript
// ============================================

// Clase Estudiante (equivalente a la clase Python)
class Estudiante {
    constructor(identificacion, nombre, genero, creditos, estrato, certificado) {
        this.identificacion = identificacion;   // Número de identificación
        this.nombre = nombre;                   // Nombre completo
        this.genero = genero;                   // Género
        this.creditos = creditos;               // Cantidad de créditos
        this.estrato = estrato;                 // Estrato socioeconómico
        this.certificado = certificado;         // Certificado electoral (Si / No)
    }
}

// Clase SimuladorMatricula (equivalente a la clase Python)
class SimuladorMatricula {
    constructor() {
        // Valor fijo por cada crédito académico
        this.valor_credito = 159000;
    }

    // Método que calcula el valor base de la matrícula
    calcular_valor_base(creditos) {
        return creditos * this.valor_credito;
    }

    // Método que calcula el descuento según el estrato
    descuento_estrato(estrato) {
        if (estrato === 1 || estrato === 2) {
            return 0.15;  // 15% de descuento
        } else if (estrato === 3 || estrato === 4) {
            return 0.10;  // 10% de descuento
        } else if (estrato === 5 || estrato === 6) {
            return 0.05;  // 5% de descuento
        } else {
            return 0;
        }
    }

    // Método que calcula el descuento por certificado electoral
    descuento_certificado(certificado) {
        if (certificado.toLowerCase() === "si") {
            return 0.10;  // 10% de descuento
        } else {
            return 0;
        }
    }

    // Método principal que calcula el valor final de la matrícula
    calcular_matricula(estudiante) {
        // Se calcula el valor base según los créditos
        const valor_base = this.calcular_valor_base(estudiante.creditos);

        // Se suman los descuentos obtenidos
        const descuento_total = 
            this.descuento_estrato(estudiante.estrato) +
            this.descuento_certificado(estudiante.certificado);

        // Se calcula el valor del descuento y el valor final
        const valor_descuento = valor_base * descuento_total;
        const valor_final = valor_base - valor_descuento;

        return {
            valor_base: valor_base,
            valor_descuento: valor_descuento,
            valor_final: valor_final,
            descuento_total: descuento_total
        };
    }
}

// =============================
// Variables globales
// =============================
let hasElectoral = false;

// =============================
// Funciones de la interfaz
// =============================

// Función para alternar el certificado electoral
function toggleElectoral() {
    const toggle = document.getElementById('electoralToggle');
    toggle.classList.toggle('active');
    hasElectoral = toggle.classList.contains('active');
}

// Función de login (equivalente a la validación de contraseña en Python)
function login() {
    const password = document.getElementById('password').value;
    const studentName = document.getElementById('studentName').value;

    // Validación de nombre
    if (!studentName.trim()) {
        alert('Por favor ingrese su nombre completo');
        return;
    }

    // Validación de la contraseña (igual que en Python: "2046")
    if (password !== '2046') {
        alert('❌ Contraseña incorrecta. Acceso denegado.');
        return;
    }

    // ✅ Acceso concedido
    console.log('✅ Acceso concedido');

    // Establecer el nombre en el simulador
    document.getElementById('fullName').value = studentName;
    
    // Ocultar pantalla de login, mostrar simulador
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('simulatorScreen').classList.remove('hidden');
}

// Función para formatear moneda en pesos colombianos
function formatCurrency(value) {
    return '$' + Math.round(value).toLocaleString('es-CO');
}

// Función principal para calcular la matrícula (equivalente al programa principal en Python)
function calcularMatricula() {
    // Solicitud de datos del estudiante (equivalente a los inputs en Python)
    const identificacion = document.getElementById('idNumber').value;
    const nombre = document.getElementById('fullName').value;
    const creditos = parseInt(document.getElementById('credits').value);
    const estrato = parseInt(document.getElementById('stratum').value);
    const genero = document.getElementById('gender').value;
    const certificado = hasElectoral ? "Si" : "No";

    // Validación de campos requeridos
    if (!identificacion || !nombre) {
        alert('Por favor complete todos los campos requeridos');
        return;
    }

    // Validación de créditos (1-21)
    if (creditos < 1 || creditos > 21) {
        alert('Los créditos deben estar entre 1 y 21');
        return;
    }

    // Creación del objeto estudiante (equivalente a la clase Estudiante en Python)
    const estudiante = new Estudiante(
        identificacion, 
        nombre, 
        genero, 
        creditos, 
        estrato, 
        certificado
    );

    // Creación del simulador y cálculo de la matrícula (equivalente a SimuladorMatricula en Python)
    const simulador = new SimuladorMatricula();
    const resultado = simulador.calcular_matricula(estudiante);

    // Mostrar los resultados finales (equivalente al print en Python)
    mostrarResultados(estudiante, resultado);
}

// Función para mostrar los resultados
function mostrarResultados(estudiante, resultado) {
    // Actualizar valores en la interfaz
    document.getElementById('resultId').textContent = estudiante.identificacion;
    document.getElementById('resultName').textContent = estudiante.nombre;
    document.getElementById('resultGender').textContent = estudiante.genero;
    document.getElementById('resultCreditsStratum').textContent = 
        `${estudiante.creditos} Créditos • Estrato ${estudiante.estrato}`;
    
    // Cálculo detallado
    const simulador = new SimuladorMatricula();
    document.getElementById('creditCalc').textContent = 
        `(${estudiante.creditos} × ${formatCurrency(simulador.valor_credito)})`;
    document.getElementById('resultBase').textContent = formatCurrency(resultado.valor_base);
    
    // Mostrar porcentaje de descuento
    const porcentajeDescuento = (resultado.descuento_total * 100).toFixed(0);
    document.getElementById('discountPercent').textContent = 
        resultado.descuento_total > 0 ? `(${porcentajeDescuento}%)` : '';
    
    document.getElementById('resultDiscount').textContent = formatCurrency(resultado.valor_descuento);
    document.getElementById('resultTotal').textContent = formatCurrency(resultado.valor_final);

    // Mostrar sección de resultados
    document.getElementById('results').classList.remove('hidden');
    
    // Scroll suave a los resultados
    setTimeout(() => {
        document.getElementById('results').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }, 100);

    // Imprimir en consola (equivalente al print de Python)
    console.log('\n========= RESULTADO =========');
    console.log(`Identificación: ${estudiante.identificacion}`);
    console.log(`Nombre: ${estudiante.nombre}`);
    console.log(`Género: ${estudiante.genero}`);
    console.log(`Créditos matriculados: ${estudiante.creditos}`);
    console.log(`Estrato: ${estudiante.estrato}`);
    console.log(`Certificado Electoral: ${estudiante.certificado}`);
    console.log(`Valor base matrícula: ${formatCurrency(resultado.valor_base)}`);
    console.log(`Descuento obtenido: ${formatCurrency(resultado.valor_descuento)}`);
    console.log(`Valor total a pagar: ${formatCurrency(resultado.valor_final)}`);
    console.log('==============================');
}

// =============================
// Inicialización
// =============================
console.log("===================================");
console.log("Universidad Nacional Abierta y a Distancia");
console.log("Aplicación: Simulador Matrícula UNAD");
console.log("Curso: Estructura de Datos");
console.log("===================================");