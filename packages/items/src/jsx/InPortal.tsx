/**
 * joshwcomeau.com/snippets/react-components/in-portal
 */
import * as React from "react";
import * as ReactDom from "react-dom";

export default function Portal({ id, children }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return ReactDom.createPortal(
    children,
    document.querySelector(`#${id}`) || document.body
  );
}
