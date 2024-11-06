import { useRef, useEffect } from "react";

function useRenderCount() {
  const countRef = useRef(0);

  useEffect(() => {
    countRef.current += 1;
  });

  return countRef.current;
}

export default useRenderCount;
