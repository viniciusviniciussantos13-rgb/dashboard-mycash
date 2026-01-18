import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { Session, User } from '@supabase/supabase-js'

export interface AuthContextValue {
  user: User | null
  session: Session | null
  isLoading: boolean
  signInWithPassword: (email: string, password: string) => Promise<void>
  signUpWithPassword: (
    email: string,
    password: string,
    metadata?: { fullName?: string; avatarUrl?: string }
  ) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

async function ensureProfile(user: User) {
  const { error } = await supabase
    .from('users')
    .upsert(
      {
        id: user.id,
        email: user.email ?? '',
        name: user.user_metadata?.fullName ?? user.user_metadata?.full_name ?? user.email,
        avatar_url: user.user_metadata?.avatarUrl ?? user.user_metadata?.avatar_url ?? null,
      },
      { onConflict: 'id' }
    )
  if (error) {
    console.error('Não foi possível sincronizar perfil do Supabase', error.message)
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return
      setSession(data.session ?? null)
      setUser(data.session?.user ?? null)
      setIsLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setUser(nextSession?.user ?? null)
      if (nextSession?.user) {
        ensureProfile(nextSession.user)
      }
    })

    return () => {
      isMounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const signInWithPassword = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      throw error
    }
    setSession(data.session ?? null)
    setUser(data.user ?? null)
    if (data.user) {
      await ensureProfile(data.user)
    }
  }, [])

  const signUpWithPassword = useCallback(
    async (email: string, password: string, metadata?: { fullName?: string; avatarUrl?: string }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            fullName: metadata?.fullName,
            avatarUrl: metadata?.avatarUrl,
          },
        },
      })
      if (error) {
        throw error
      }
      if (data.user) {
        await ensureProfile(data.user)
      }
      setSession(data.session ?? null)
      setUser(data.user ?? null)
    },
    []
  )

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
    setSession(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      session,
      isLoading,
      signInWithPassword,
      signUpWithPassword,
      signOut,
    }),
    [user, session, isLoading, signInWithPassword, signUpWithPassword, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
