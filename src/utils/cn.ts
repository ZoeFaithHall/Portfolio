type ClassValue = string | number | boolean | undefined | null | Record<string, boolean | undefined | null>;

/**
 * Combines class names, filtering out falsy values.
 * Supports strings and object syntax for conditional classes.
 *
 * @example
 *   cn(styles.root, isActive && styles.active, { [styles.disabled]: disabled })
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === 'string' || typeof input === 'number') {
      out.push(String(input));
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) out.push(key);
      }
    }
  }
  return out.join(' ');
}
