import type { Lingua } from '../config/site';
import { en } from './en';
import { fr } from './fr';
import { pt, type Dicionario } from './pt';

export const dicionarios: Record<Lingua, Dicionario> = { fr, en, pt };
