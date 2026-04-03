export interface Department {
  departmentId: string;
  departmentName: string;
  description: string;
  createdAt: string;
  isDeleted: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}