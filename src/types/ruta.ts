export interface Ruta {
  /** Identificador único de la ruta */
  id: string;
  /** Nombre de la ruta */
  nombre: string;
  /** Descripción breve de la ruta */
  descripcion: string;
  /** Dificultad de la ruta */
  dificultad: "baja" | "media" | "alta";
  /** Duración estimada en minutos */
  duracionEstimada: number;
  /** Tipo de actividad principal */
  tipoActividad:
    | "senderismo"
    | "cascada"
    | "pueblo"
    | "gastronomico"
    | "fotografico";
  /** Latitud geográfica */
  lat: number;
  /** Longitud geográfica */
  lng: number;
  /** URLs de imágenes asociadas */
  imagenes: string[];
  /** Calificación promedio de la ruta (1-5) */
  calificacion: number;
  /** Impacto ambiental del recorrido */
  impactoAmbiental: "bajo" | "medio" | "alto";
}
