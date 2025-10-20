import { supabase } from "./supabaseClient";
import type { Ruta } from "../types/ruta";

// Servicio para obtener rutas desde la tabla 'rutas'
export async function fetchRutas(): Promise<Ruta[]> {
  const { data, error } = await supabase.from("rutas").select("*");
  if (error) throw new Error(error.message);
  return (data as Ruta[]) || [];
}
