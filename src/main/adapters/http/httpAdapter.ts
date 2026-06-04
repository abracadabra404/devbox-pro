export interface HttpRequestInput {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  body?: string;
  timeoutMs: number;
}

export interface HttpResponseOutput {
  status: number;
  headers: Record<string, string>;
  body: string;
  duration: number;
}

export interface HttpAdapter {
  send: (input: HttpRequestInput) => Promise<HttpResponseOutput>;
}
