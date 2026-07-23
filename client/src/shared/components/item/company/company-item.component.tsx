import { useCompanyItemService } from "./company-item.service";

// interface
interface CompanyItemComponentProps {
  company: string;
  showName?: boolean;
}

const CompanyItemComponent = (props: CompanyItemComponentProps) => {
  const { company, showName = false } = props;
  const { getCompanyIcon } = useCompanyItemService();

  const companyIcon = getCompanyIcon(company);

  return (
    <div className="flex items-center gap-2">
      {companyIcon}

      {showName && <span className="text-sm font-medium">{company}</span>}
    </div>
  );
};

export default CompanyItemComponent;
