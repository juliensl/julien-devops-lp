import type { Language } from '../config/site';
import { en } from './en';
import { fr } from './fr';
import { pt, type Dictionary } from './pt';

export const dictionaries: Record<Language, Dictionary> = { fr, en, pt };
