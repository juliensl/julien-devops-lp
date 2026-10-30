// The four audiences of «Os teus desafios», in the page's order. Each id is also the audience's anchor
// on the questions page (`/pt/questions/#cto`), the same in the three languages.

export const AUDIENCES = ['general', 'cto', 'ceo', 'team'] as const;
export type AudienceId = (typeof AUDIENCES)[number];
