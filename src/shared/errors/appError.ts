export interface AppErrorDto {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export class AppError extends Error {
  public readonly code: string;
  public readonly details?: Record<string, unknown>;

  public constructor(code: string, message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.details = details;
  }

  public toDto(): AppErrorDto {
    return {
      code: this.code,
      message: this.message,
      details: this.details
    };
  }
}

export function toAppErrorDto(error: unknown): AppErrorDto {
  if (error instanceof AppError) {
    return error.toDto();
  }

  if (error instanceof Error) {
    return {
      code: 'unknown_error',
      message: error.message
    };
  }

  return {
    code: 'unknown_error',
    message: 'An unknown error occurred.'
  };
}
