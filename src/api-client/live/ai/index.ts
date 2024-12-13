import {
  AiApiClientInterface,
  AiApiClientModel,
  AiApiClientUrlsInterface,
} from "../../../models/api-client/ai";

const RESUME_ANALYZER_URI = "http://127.0.0.1:8000/api/analyze-resume/";

const urls: AiApiClientUrlsInterface = {
  analyzeResume: RESUME_ANALYZER_URI,
};

// instantiate the AuthApiClient pointing at the url that returns static json mock \ data
const AiApiClient: AiApiClientInterface = new AiApiClientModel(urls);
// export our instance
export default AiApiClient;
