export const colores = {
  verdeHoja: "#65843a", // Verde hoja (activo, íconos principales)
  verdeOliva: "#7ea854", // Oliva (acentos secundarios)
  verdeClaro: "#eef8e4", // Fondo header/categorías
  marronTierra: "#88745c", // Marrón tierra (bordes/acento)
  tierraSuave: "#ede6df", // Marrón claro de fondo
  grisClaro: "#e0e0dc", // Gris muy claro (líneas divisoras)
  grisTexto: "#646464", // Gris texto secundario
  blanco: "#fff", // Blanco puro
  negro: "#273014", // Negro ténue, texto muy fuerte
  amarilloEstrella: "#FFD700", // Para rating estrellas
};

// Referencia visual de integración en UI HomeScreen:
// Header = verdeClaro y verdeHoja, BottomNav = blanco/grisClaro
// Categorías: iconos fondo verdeClaro, borde verdeOliva
// Aventuras grid: fondo blanco, sombra verdosa
// Banner: fondo tierraSuave, borde marronTierra

export const layout = {
  borderRadius: 16,
  padding: 18,
};

// Ejemplo de uso en styles:
// import { colores, layout } from './styles';
// backgroundColor: colores.verdeHoja
// borderRadius: layout.borderRadius
