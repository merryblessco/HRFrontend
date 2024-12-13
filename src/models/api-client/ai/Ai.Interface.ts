export interface AnalyzeResumeRequest {
  keywords: string[];
  resume: File;
}

export interface GenerateCoverLetterRequest {
  resume: File;
}
