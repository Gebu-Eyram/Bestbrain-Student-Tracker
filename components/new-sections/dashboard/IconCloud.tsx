import IconCloud from "@/components/ui/icon-cloud";

const slugs = [
  "typescript",
  "javascript",

  "react",
  "redux",

  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "drizzle",

  "postgresql",

  "git",

  "github",
  "gitlab",
  "shadcn",
  "visualstudiocode",
  "gemini",
  "visualstudiocode",
  "google",
  "googlegemini",
  "amazonaws",
  "googlechrome",
  "firefox",
  "safari",
  "opera",
  "edge",
  "figma",
];

export function IconCloudDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg   bg-transparent px-6 pb-20 pt-8 ">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}
