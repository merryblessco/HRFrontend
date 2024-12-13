import { HttpClient, type HttpRequestParamsInterface } from "../../http-client";
import { AnalyzeResumeRequest } from "./Ai.Interface";
import { AiApiClientInterface } from "./AiApiClient.interface";
import { AiApiClientUrlsInterface } from "./AiApiClientUrls.interface";

export class AiApiClientModel implements AiApiClientInterface {
  private readonly urls!: AiApiClientUrlsInterface;
  constructor(urls: AiApiClientUrlsInterface) {
    this.urls = urls;
  }

  analyzeResume(payload: AnalyzeResumeRequest): Promise<any> {
    const postParameters: HttpRequestParamsInterface = {
      url: this.urls.analyzeResume,
      requiresToken: false,
      payload: payload,
    };
    return HttpClient.post<any>(postParameters);
  }
}
