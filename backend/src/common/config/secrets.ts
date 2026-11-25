import { randomBytes } from 'crypto';

let generatedJwtSecret: string | null = null;

/**
 * Devuelve el secreto JWT. Si JWT_SECRET no está definido (o está vacío),
 * genera uno aleatorio por proceso. Las sesiones se invalidan al reiniciar
 * el backend, pero nunca se usa un valor conocido.
 */
export function getJwtSecret(): string {
  const fromEnv = process.env.JWT_SECRET?.trim();
  if (fromEnv) return fromEnv;
  if (!generatedJwtSecret) {
    generatedJwtSecret = randomBytes(48).toString('hex');
    console.warn('⚠️  JWT_SECRET no definido: se generó un secreto aleatorio temporal. Defínelo para mantener sesiones entre reinicios.');
  }
  return generatedJwtSecret;
}

// Secreto histórico, solo para no romper instalaciones existentes.
const LEGACY_LICENSE_SECRET = 'DPV-Licencias-XK92';

/** Secreto usado para calcular la clave semanal de desbloqueo. */
export function getLicenseSecret(): string {
  const fromEnv = process.env.LICENSE_SECRET?.trim();
  if (fromEnv) return fromEnv;
  console.warn('⚠️  LICENSE_SECRET no definido: se usa el secreto por defecto, que es conocido. Defínelo en el entorno.');
  return LEGACY_LICENSE_SECRET;
}
