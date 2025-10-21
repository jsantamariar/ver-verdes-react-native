import React, { useState, useEffect, createContext, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { supabase } from "./supabaseClient";
import type { User } from "../types/user";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  sendOTP: (email: string) => Promise<{ error: string | null }>;
  verifyOTP: (
    email: string,
    token: string
  ) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
}

const defaultContext: AuthContextValue = {
  user: null,
  loading: true,
  sendOTP: async () => ({ error: null }),
  verifyOTP: async () => ({ error: null }),
  logout: async () => {},
};

const AuthContext = createContext(defaultContext);

export function useAuth() {
  return useContext(AuthContext);
}

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarUsuario = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser({
          id: data.user.id,
          name: data.user.user_metadata?.name || "",
          email: data.user.email || "",
          avatar_url: data.user.user_metadata?.avatar_url || "",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    cargarUsuario();
  }, []);

  const sendOTP = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
      });
      return { error: error?.message || null };
    } catch (err) {
      return { error: (err as Error).message };
    }
  };

  const verifyOTP = async (email: string, token: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email",
      });

      if (!error) {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          setUser({
            id: data.user.id,
            name: data.user.user_metadata?.name || "",
            email: data.user.email || "",
            avatar_url: data.user.user_metadata?.avatar_url || "",
          });
        }
      }

      return { error: error?.message || null };
    } catch (err) {
      return { error: (err as Error).message };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  return React.createElement(AuthContext.Provider, {
    value: {
      user,
      loading,
      sendOTP,
      verifyOTP,
      logout,
    },
    children,
  });
};
