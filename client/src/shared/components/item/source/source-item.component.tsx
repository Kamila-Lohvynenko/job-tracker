import { EApplicationSource } from "@/shared/rest-api/interface/applications";
import { sourceLabelMap, useSourceItemService } from "./source-item.service";

// interface
interface SourceItemComponentProps {
  source: EApplicationSource;
  showName?: boolean;
}

const SourceItemComponent = (props: SourceItemComponentProps) => {
  const { source, showName = false } = props;
  const { getSourceIcon } = useSourceItemService();

  const sourceIcon = getSourceIcon(source);

  return (
    <div className="flex items-center gap-2">
      {sourceIcon}

      {showName && (
        <span className="text-sm font-medium">{sourceLabelMap[source]()}</span>
      )}
    </div>
  );
};

export default SourceItemComponent;
