import { cn } from "@/shared/utils/cn";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

// interface
interface ISidebarItemComponentProps {
  item: {
    label: string;
    href: string;
    icon: React.ReactNode;
  };
  isCollapsed: boolean;
}

// component
export const SidebarItemComponent: FC<ISidebarItemComponentProps> = (props) => {
  const { item, isCollapsed } = props;
  const pathname = usePathname();

  const isActive = pathname.includes(item.href);

  // return
  return (
    <div>
      <NextLink
        href={item.href}
        className={cn(
          "flex items-center gap-4 py-3 px-2 text-foreground-subtle hover:bg-surface-muted rounded-md",
          isActive && "text-primary",
        )}
      >
        <span>{item.icon}</span>

        <span
          className={cn(
            "transition-all duration-300",
            isCollapsed ? "hidden" : "block",
          )}
        >
          {item.label}
        </span>
      </NextLink>
    </div>
  );
};
