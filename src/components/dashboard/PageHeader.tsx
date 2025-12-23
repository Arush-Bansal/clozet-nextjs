
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

const PageHeader = ({ title, description, actions, className }: PageHeaderProps) => {
  return (
    <div className={cn("mb-8 relative", className)}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold tracking-tight text-foreground font-serif relative inline-block">
            {title}
            <div className="absolute -bottom-1 left-0 w-10 h-1.5 bg-primary/40 rounded-full" />
          </h1>
          {description && (
            <p className="text-base text-muted-foreground max-w-2xl font-medium tracking-tight">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-3 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
