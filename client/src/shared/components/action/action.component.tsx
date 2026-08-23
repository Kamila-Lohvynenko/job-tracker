import { Copy, Eye, PencilLine, Trash } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

import { Button } from "@heroui/react";

// interface
interface IProps {
  hrefView?: string;
  onDuplicate?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

// component
const ActionComponent: FC<Readonly<IProps>> = (props) => {
  const { hrefView, onDuplicate, onEdit, onDelete } = props;

  // return
  return (
    <div className={"flex items-center gap-3"}>
      {hrefView && (
        <Link href={hrefView}>
          <Eye size={18} />
        </Link>
      )}

      {onEdit && (
        <Button
          isIconOnly
          variant={"outline"}
          size={"sm"}
          className={"text-zinc-500"}
          onPress={onEdit}
        >
          <PencilLine size={18} />
        </Button>
      )}

      {onDuplicate && (
        <Button
          isIconOnly
          variant={"outline"}
          size={"sm"}
          className={"text-zinc-500"}
          onPress={onDuplicate}
        >
          <Copy size={18} />
        </Button>
      )}

      {onDelete && (
        <Button
          isIconOnly
          variant={"danger-soft"}
          size={"sm"}
          onPress={onDelete}
        >
          <Trash size={18} />
        </Button>
      )}
    </div>
  );
};

export default ActionComponent;
