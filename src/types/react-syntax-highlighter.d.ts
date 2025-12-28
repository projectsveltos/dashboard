declare module "react-syntax-highlighter" {
  import * as React from "react";
  /* eslint-disable */
  export interface SyntaxHighlighterProps {
    language?: string;
    style?: any;
    children?: React.ReactNode;
    customStyle?: React.CSSProperties;
    codeTagProps?: React.HTMLAttributes<HTMLElement>;
    useInlineStyles?: boolean;
    showLineNumbers?: boolean;
    startingLineNumber?: number;
    lineNumberStyle?:
      | React.CSSProperties
      | ((lineNumber: number) => React.CSSProperties);
    [key: string]: any;
  }

  export class Prism extends React.Component<SyntaxHighlighterProps> {}
  export class Light extends React.Component<SyntaxHighlighterProps> {}
  export default class SyntaxHighlighter extends React.Component<SyntaxHighlighterProps> {}
}

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
  const styles: any;
  export default styles;
  export const vscDarkPlus: any;
  export const prism: any;
}
