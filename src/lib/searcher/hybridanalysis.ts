import { buildURL } from "../url_builder";
import { SearchableType, Searcher } from "./searcher";

export class HybridAnalysis implements Searcher {
  public endpoint: string;
  public name: string;
  public supportedTypes: SearchableType[] = ["ip", "domain", "hash"];

  constructor() {
    this.endpoint = "https://www.hybrid-analysis.com";
    this.name = "HybridAnalysis";
  }

  public searchByHash(query: string) {
    if (query.length !== 64) {
      throw new Error("HybridAnalysis onlys suports SHA256");
    }
    return buildURL(this.endpoint, `/sample/${query}`);
  }

  public searchByIP(query: string) {
    return buildURL(this.endpoint, "/search", { query: `host:${query}` });
  }

  public searchByDomain(query: string) {
    return buildURL(this.endpoint, "/search", { query: `domain:${query}` });
  }
}
