import { getAppById } from "@/config/apps";
import { AppFrame } from "@/components/shell/AppFrame";
import { getAuthenticatedFrameUrl } from "@/actions/apps";

const NegociosPage = async () => {
  const app = getAppById("negocios")!;
  const frameSrc = await getAuthenticatedFrameUrl("negocios");

  return <AppFrame src={frameSrc} title={app.name} />;
};

export default NegociosPage;
