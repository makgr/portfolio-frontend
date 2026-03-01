export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: ApiMeta;
  error?: string;
}

export interface ApiMeta {
  total?: number;
  count?: number;
  per_page?: number;
  current_page?: number;
  last_page?: number;
  last_updated?: string;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  links?: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}
