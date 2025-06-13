export function getRoleFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const payload = token.split('.')[1];
  const decoded = JSON.parse(atob(payload));
  return decoded.role; // JWT token'ın içinde rol varsa
}
