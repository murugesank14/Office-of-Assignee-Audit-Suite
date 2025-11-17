export interface AuditParagraphRequest {
  auditNotes: string;
}

export interface AuditParagraphResponse {
  heading: string;
  reference: string;
  procedure: string;
  findings: string;
  recommendations: string;
}
