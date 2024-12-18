import { File, FileQuestion } from "lucide-react";

interface IappProps {
  title: string;
  description: string;
}

export function NoItems({ description, title }: IappProps) {
  return (
    <div className="flex min-h-[600px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <FileQuestion className="h-10 w-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="text-center text-sm leading-6 text-muted-foreground mt-2">
        {description}
      </p>
    </div>
  );
}
