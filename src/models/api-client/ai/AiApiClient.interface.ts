import { AnalyzeResumeRequest } from "./Ai.Interface";

export interface AiApiClientInterface {
  analyzeResume: (payload: AnalyzeResumeRequest) => Promise<any>;
}
