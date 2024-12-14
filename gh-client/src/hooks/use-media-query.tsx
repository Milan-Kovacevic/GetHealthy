import * as React from "react";

export function useMediaQuery(breakpoint: number) {
  const [activated, setActivated] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => {
      setActivated(window.innerWidth < breakpoint);
    };
    mql.addEventListener("change", onChange);
    setActivated(window.innerWidth < breakpoint);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!activated;
}
