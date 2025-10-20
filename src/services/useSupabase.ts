import { useState, useEffect, createContext, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { supabase } from "./supabaseClient";
import type { Usuario } from "../types/usuario";

interface AuthContextValue {
  usuario: Usuario | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  signup: (
    email: string,
    password: string,
    nombre: string
  ) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario al iniciar
  useEffect(() => {
    const cargarUsuario = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUsuario({
          id: data.user.id,
          nombre: data.user.user_metadata?.name || "",
          email: data.user.email || "",
          fotoPerfilURL: data.user.user_metadata?.avatar_url || "",
        });
      } else {
        setUsuario(null);
      }
      setLoading(false);
    };
    cargarUsuario();
  }, []);

  // Login con Supabase
  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      await supabase.auth.getUser();
      setLoading(true);
      setTimeout(() => setLoading(false), 500);
    }
    return { error: error?.message || null };
  };

  // Signup con Supabase y nombre
  const signup = async (email: string, password: string, nombre: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name: nombre } },
    });
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
    return { error: error?.message || null };
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
