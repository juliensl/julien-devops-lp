import type { Language } from '../config/site';
import { en } from './en';
import { fr, type Dictionary } from './fr';
import { pt } from './pt';

export const dictionaries: Record<Language, Dictionary> = { fr, en, pt };
