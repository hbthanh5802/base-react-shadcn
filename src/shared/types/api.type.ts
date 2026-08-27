export interface ApiResponseMetaData {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  statusCode: string;
  metaData?: ApiResponseMetaData;
}

export interface ApiResponseWithoutMetaData<T> {
  success: boolean;
  message?: string;
  data?: T;
  statusCode: string;
  metaData: null;
}

type PaginationQuery = {
  page?: number;
  size?: number;
};

type SortQuery = string[];

export type GetQueryParams = PaginationQuery & {
  sort?: SortQuery;
};

export type CustomQueryHookOptions = {
  onError?: (response: any) => void;
  enable?: boolean;
  staleTime?: number;
};

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  data: null;
  timestamp: string;
}
