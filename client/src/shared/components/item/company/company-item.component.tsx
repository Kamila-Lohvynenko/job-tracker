import { useCompanyItemService } from "./company-item.service";

// interface
interface CompanyItemComponentProps {
  company: string;
  showName?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}

const CompanyItemComponent = (props: CompanyItemComponentProps) => {
  const { company, showName = false, size = "xs" } = props;
  const { getCompanyIcon } = useCompanyItemService();

  const companyIcon = getCompanyIcon(company, size);

  return (
    <div className="flex items-center gap-2">
      {companyIcon}

      {showName && <span className="text-sm font-medium">{company}</span>}
    </div>
  );
};

export default CompanyItemComponent;
