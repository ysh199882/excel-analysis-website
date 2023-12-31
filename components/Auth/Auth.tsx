import React, { useState, useEffect } from 'react';
import { createClient, Session } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const supabase = createClient(
  'https://bbdaittdxmtumftexkvx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiZGFpdHRkeG10dW1mdGV4a3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4MDc4NTAsImV4cCI6MjAwMjM4Mzg1MH0.UXsJQnGc2hP2wz3mjbZyYYY6aajzaXQahPmtzGz8o2g'
);

export default function Login() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      session && localStorage.setItem('session', JSON.stringify(session));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log('Error signing out:', error);
    else {
      setSession(null);
      localStorage.removeItem('session');
    }
  };

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google', 'facebook', 'twitter']}
        theme="dark"
      />
    );
  } else {
    return (
      <div>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    );
  }
}
