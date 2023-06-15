'use client';

export default function isLogin() {
  let session = localStorage.getItem('session');
  if (session) {
    session = JSON.parse(session);
  }
  return true;
}
