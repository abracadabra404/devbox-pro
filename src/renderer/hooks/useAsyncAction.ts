import { useCallback, useState } from 'react';

export interface AsyncActionState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export function useAsyncAction<TArgs extends unknown[], TResult>(
  action: (...args: TArgs) => Promise<TResult>
): AsyncActionState<TResult> & { run: (...args: TArgs) => Promise<TResult | null> } {
  const [state, setState] = useState<AsyncActionState<TResult>>({
    data: null,
    error: null,
    loading: false
  });

  const run = useCallback(
    async (...args: TArgs) => {
      setState((current) => ({
        ...current,
        loading: true,
        error: null
      }));

      try {
        const data = await action(...args);
        setState({
          data,
          error: null,
          loading: false
        });
        return data;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        setState({
          data: null,
          error: message,
          loading: false
        });
        return null;
      }
    },
    [action]
  );

  return {
    ...state,
    run
  };
}
