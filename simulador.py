# ============================================
# Simulador de Matrícula UNAD
# Curso: Estructura de Datos
# Lenguaje: Python
# ============================================

# Clase Estudiante:
# Se encarga de almacenar los datos del estudiante
class Estudiante:
    def __init__(self, identificacion, nombre, genero, creditos, estrato, certificado):
        self.identificacion = identificacion   # Número de identificación
        self.nombre = nombre                   # Nombre completo
        self.genero = genero                   # Género
        self.creditos = creditos               # Cantidad de créditos
        self.estrato = estrato                 # Estrato socioeconómico
        self.certificado = certificado         # Certificado electoral (Si / No)


# Clase SimuladorMatricula:
# Contiene los métodos necesarios para realizar los cálculos
class SimuladorMatricula:
    def __init__(self):
        # Valor fijo por cada crédito académico
        self.valor_credito = 159000

    # Método que calcula el valor base de la matrícula
    def calcular_valor_base(self, creditos):
        return creditos * self.valor_credito

    # Método que calcula el descuento según el estrato
    def descuento_estrato(self, estrato):
        if estrato in [1, 2]:
            return 0.15  # 15% de descuento
        elif estrato in [3, 4]:
            return 0.10  # 10% de descuento
        elif estrato in [5, 6]:
            return 0.05  # 5% de descuento
        else:
            return 0

    # Método que calcula el descuento por certificado electoral
    def descuento_certificado(self, certificado):
        if certificado.lower() == "si":
            return 0.10  # 10% de descuento
        else:
            return 0

    # Método principal que calcula el valor final de la matrícula
    def calcular_matricula(self, estudiante):
        # Se calcula el valor base según los créditos
        valor_base = self.calcular_valor_base(estudiante.creditos)

        # Se suman los descuentos obtenidos
        descuento_total = (
            self.descuento_estrato(estudiante.estrato)
            + self.descuento_certificado(estudiante.certificado)
        )

        # Se calcula el valor del descuento y el valor final
        valor_descuento = valor_base * descuento_total
        valor_final = valor_base - valor_descuento

        return valor_base, valor_descuento, valor_final


# =============================
# Programa principal
# =============================

# Información inicial de la aplicación
print("===================================")
print("Universidad Nacional Abierta y a Distancia")
print("Aplicación: Simulador Matrícula UNAD")
print("Curso: Estructura de Datos")
print("===================================")

# Solicitud de contraseña de acceso
password = input("Ingrese la contraseña de acceso: ")

# Validación de la contraseña
if password != "2046":
    print("❌ Contraseña incorrecta. Acceso denegado.")
else:
    print("✅ Acceso concedido\n")

    # Solicitud de datos del estudiante
    identificacion = input("Ingrese número de identificación: ")
    nombre = input("Ingrese nombre completo: ")
    genero = input("Ingrese género: ")
    creditos = int(input("Ingrese cantidad de créditos a matricular: "))
    estrato = int(input("Ingrese estrato socioeconómico (1-6): "))
    certificado = input("¿Tiene certificado electoral? (Si / No): ")

    # Creación del objeto estudiante
    estudiante = Estudiante(
        identificacion, nombre, genero, creditos, estrato, certificado
    )

    # Creación del simulador y cálculo de la matrícula
    simulador = SimuladorMatricula()
    valor_base, descuento, total_pagar = simulador.calcular_matricula(estudiante)

    # Mostrar los resultados finales
    print("\n========= RESULTADO =========")
    print(f"Identificación: {estudiante.identificacion}")
    print(f"Nombre: {estudiante.nombre}")
    print(f"Género: {estudiante.genero}")
    print(f"Créditos matriculados: {estudiante.creditos}")
    print(f"Estrato: {estudiante.estrato}")
    print(f"Certificado Electoral: {estudiante.certificado}")
    print(f"Valor base matrícula: ${valor_base:,.0f}")
    print(f"Descuento obtenido: ${descuento:,.0f}")
    print(f"Valor total a pagar: ${total_pagar:,.0f}")
    print("==============================")