import { supabase } from "./supabaseClient";
import type { Route } from "../types/route";

// Servicio para obtener rutas desde la tabla 'rutas'
export async function fetchRutas(): Promise<Route[]> {
  const { data, error } = await supabase.from("routes").select("*");
  if (error) throw new Error(error.message);
  return (data as Route[]) || [];
}
