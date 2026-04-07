import { getAppById } from "@/config/apps";
import { AppFrame } from "@/components/shell/AppFrame";
import { getAuthenticatedFrameUrl } from "@/actions/apps";

const CapacitacionPage = async () => {
  const app = getAppById("capacitacion")!;
  const frameSrc = await getAuthenticatedFrameUrl("capacitacion");

  return <AppFrame src={frameSrc} title={app.name} />;
};

export default CapacitacionPage;
