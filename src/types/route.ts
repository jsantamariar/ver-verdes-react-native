export interface Route {
  /** Identificador único de la ruta */
  id: string;
  /** Nombre de la ruta */
  name: string;
  /** Descripción breve de la ruta */
  description: string;
  /** Dificultad de la ruta */
  difficulty: "baja" | "media" | "alta";
  /** Duración estimada en minutos */
  estimatedDuration: number;
  /** Tipo de actividad principal */
  activityType:
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
  images: string[];
  /** Calificación promedio de la ruta (1-5) */
  score: number;
}
