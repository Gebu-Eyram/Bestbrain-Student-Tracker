import React from "react";
import markdownit from "markdown-it";

type Props = {
  text: string;
};

const md = markdownit();

const Markdown = ({ text }: Props) => {
  const htmlElement = md.render(text);

  return (
    <div
      className="dark:text-foreground/80"
      dangerouslySetInnerHTML={{ __html: htmlElement }}
    ></div>
  );
};

export default Markdown;
