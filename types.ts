export type Language = 'English' | 'Tamil' | 'Hindi';

export interface AuditParagraphRequest {
  auditNotes: string;
  outputLanguage: Language;
}

export interface AuditParagraphResponse {
  heading: string;
  reference: string;
  procedure: string;
  findings: string;
  recommendations: string;
}