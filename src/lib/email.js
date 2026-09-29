// Requires a domain with at least one dot and no empty labels:
// rejects "x@invalid", "a@b.", "a@.com". Not full RFC 5322, just catches typos.
export const isValidEmail = (email) =>
    typeof email === 'string' && /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(email);
