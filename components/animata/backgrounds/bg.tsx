import { cn } from "@/lib/utils";
interface BlobProps extends React.HTMLAttributes<HTMLDivElement> {
  firstBlobColor: string;
  secondBlobColor: string;
}

export default function BlurryBlob({
  className,
  firstBlobColor,
  secondBlobColor,
}: BlobProps) {
  return (
    <div className="absolute top-20 left-0 h-80 w-full z-10 max-w-lg">
      <div
        className={cn(
          "absolute -right-24 -top-28 h-72 w-72 animate-pop-blob rounded-sm bg-blue-400 p-8 opacity-45 mix-blend-multiply blur-3xl filter",
          className,
          firstBlobColor
        )}
      ></div>
      <div
        className={cn(
          "absolute -left-40 -top-64 h-72 w-72 animate-pop-blob rounded-sm bg-purple-400 p-8 opacity-45 mix-blend-multiply blur-3xl filter",
          className,
          secondBlobColor
        )}
      ></div>
    </div>
  );
}

export function BlurryBlob2({
  className,
  firstBlobColor,
  secondBlobColor,
}: BlobProps) {
  return (
    <div className="absolute -bottom-60 -right-20 h-80 w-full z-10 max-w-lg">
      <div
        className={cn(
          "absolute -right-24 -top-28 h-72 w-72 animate-pop-blob rounded-sm bg-blue-400 p-8 opacity-45 mix-blend-multiply blur-3xl filter",
          className,
          firstBlobColor
        )}
      ></div>
      <div
        className={cn(
          "absolute -left-40 -top-64 h-72 w-72 animate-pop-blob rounded-sm bg-purple-400 p-8 opacity-45 mix-blend-multiply blur-3xl filter",
          className,
          secondBlobColor
        )}
      ></div>
    </div>
  );
}
