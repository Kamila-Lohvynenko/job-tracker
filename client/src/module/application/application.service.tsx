import * as m from "@/paraglide/messages";
import { localizeHref } from "@/paraglide/runtime";
import { useGetApplicationQuery } from "@/shared/rest-api/api/applications";
import { EApplicationsKey } from "@/shared/rest-api/interface";
import { ERoutes } from "@/shared/routes";
import { toast } from "@heroui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

// service
export const useApplicationService = () => {
  const { slug } = useParams<{ slug: string }>();
  const { replace } = useRouter();

  const queryClient = useQueryClient();

  const { isFetching, isFetched, data } = useGetApplicationQuery({ id: slug });

  const handleRefresh = async () => {
    await queryClient.refetchQueries({
      queryKey: [EApplicationsKey.APPLICATION_QUERY, slug],
    });
  };

  useEffect(() => {
    if (data && !data.success) {
      toast.danger(m.application_details_not_found({ id: slug }));
      replace(localizeHref(ERoutes.APPLICATIONS));
    }
  }, [data, slug, replace]);

  // return
  return {
    applicationId: slug,
    application: data?.data,
    isFetched,
    isFetching,
    handleRefresh,
  };
};
