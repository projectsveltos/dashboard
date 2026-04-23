import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  prism,
} from "react-syntax-highlighter/dist/esm/styles/prism";

export function DiffViewer({ message }: { message: string }) {
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-[#f6f8fa] dark:bg-[#0d1117]">
      <SyntaxHighlighter
        language="diff"
        style={isDark ? vscDarkPlus : prism}
        customStyle={{
          margin: 0,
          padding: "2rem",
          fontSize: "13px",
          backgroundColor: "transparent",
          lineHeight: "1.7",
        }}
        codeTagProps={{
          style: {
            fontFamily:
              "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace)",
          },
        }}
      >
        {message}
      </SyntaxHighlighter>
    </div>
  );
}
