// Usage
// const task = useAsyncTask(async (data: any) => await myApiRequest(data));
// task.run(data);
// useEffect(() => {
//   console.log(task.status); // 'IDLE' | 'PROCESSING' | 'ERROR' | 'SUCCESS';
// }, [task.status]);

// Implementation

import { useCallback, useState } from "react";

type TStatus = "IDLE" | "PROCESSING" | "ERROR" | "SUCCESS";

function useAsyncTask<T extends any[], R = any>(
  task: (...args: T) => Promise<R>
): {
  run: (...args: T) => void;
  reset: () => void;
  status: TStatus;
  message: any;
} {
  const [status, setStatus] = useState<TStatus>("IDLE");
  const [message, setMessage] = useState("");

  const run = useCallback(async (...arg: T) => {
    setStatus("PROCESSING");
    try {
      const resp: R = await task(...arg);
      setStatus("SUCCESS");
      return resp;
    } catch (error: any) {
      const message = error?.response?.data?.error?.message || error.message;
      setMessage(message);
      setStatus("ERROR");
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setMessage("");
    setStatus("IDLE");
  }, []);

  return {
    run,
    status,
    message,
    reset,
  };
}

export default useAsyncTask;
