import React, { useEffect, useState } from 'react';

export default function IsLogin() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const storedSession = localStorage.getItem('session');
    if (storedSession) {
      setSession(JSON.parse(storedSession));
    }
  }, []);

  return session ? true : false;
}
