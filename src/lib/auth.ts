import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { User } from '../types/user';

export function mapSupabaseUserToAppUser(sbUser: SupabaseUser): User {
  const fullName =
    (sbUser.user_metadata?.full_name as string) ||
    sbUser.email?.split('@')[0] ||
    'User';
  const initials = fullName
    .trim()
    .split(/\s+/)
    .map((s) => s[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';
  return {
    id: sbUser.id,
    name: fullName,
    email: sbUser.email ?? '',
    initials,
  };
}
