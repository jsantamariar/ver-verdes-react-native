import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

// IMPORTANTE: Reemplaza por tus credenciales de Supabase en un archivo seguro/env
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
