import { describe, expect, it } from 'vitest';
import { normalizeMobile, validateRegistration } from '@/lib/validation';

const valid = {
  fullName: 'Juan Dela Cruz',
  email: 'Juan@Example.com ',
  mobile: '0917 123 4567',
  experience: 'new',
  heardFrom: 'Facebook',
};

describe('validateRegistration', () => {
  it('accepts a valid registration and normalizes fields', () => {
    const result = validateRegistration(valid);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data).toEqual({
      fullName: 'Juan Dela Cruz',
      email: 'juan@example.com',
      mobile: '09171234567',
      experience: 'new',
      heardFrom: 'Facebook',
    });
  });

  it('allows heardFrom to be empty', () => {
    const result = validateRegistration({ ...valid, heardFrom: '' });
    expect(result.ok).toBe(true);
  });

  it.each([
    ['fullName', { fullName: 'J' }],
    ['fullName', { fullName: 'x'.repeat(81) }],
    ['email', { email: 'not-an-email' }],
    ['email', { email: `${'a'.repeat(120)}@example.com` }],
    ['mobile', { mobile: '12345' }],
    ['mobile', { mobile: '+1 415 555 0100' }],
    ['experience', { experience: 'expert' }],
    ['heardFrom', { heardFrom: 'Billboard' }],
  ])('rejects an invalid %s', (field, patch) => {
    const result = validateRegistration({ ...valid, ...patch });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors).toHaveProperty(field);
  });

  it('rejects non-string values without throwing', () => {
    const result = validateRegistration({ fullName: 42, email: null, mobile: {}, experience: [] });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(Object.keys(result.errors).sort()).toEqual(['email', 'experience', 'fullName', 'mobile']);
  });

  it.each([
    ['+63 917 123 4567', '+639171234567'],
    ['+639171234567', '+639171234567'],
    ['09171234567', '09171234567'],
    ['0917-123-4567', '09171234567'],
    [' 0917 123 4567 ', '09171234567'],
  ])('accepts PH mobile %s', (raw, expected) => {
    const result = validateRegistration({ ...valid, mobile: raw });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.mobile).toBe(expected);
  });
});

describe('normalizeMobile', () => {
  it('strips spaces and dashes', () => {
    expect(normalizeMobile('+63 917-123 4567')).toBe('+639171234567');
  });
});
