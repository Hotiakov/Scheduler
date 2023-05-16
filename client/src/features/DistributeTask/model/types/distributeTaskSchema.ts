
export interface DistributeTaskProps{
  taskIds: string[];
}

export interface DistributeTaskSchema {
  isLoading: boolean;
  error?: string;
  taskIds: string[];
}