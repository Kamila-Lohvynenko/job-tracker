import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { IConfigRequest, IConfigResponse } from "@/shared/rest-api/interface";

const DEFAULT_SETTINGS: IConfigResponse["data"] = {
  isSidebarOpen: true,
};

const parseSettings = (value?: string): IConfigResponse["data"] => {
  try {
    return value ? JSON.parse(value) : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export async function GET(): Promise<NextResponse<IConfigResponse>> {
  const cookieStore = await cookies();

  const settings = parseSettings(cookieStore.get("settings")?.value);

  return NextResponse.json({ success: true, status: 200, data: settings });
}

export async function POST(
  req: Request,
): Promise<NextResponse<IConfigResponse>> {
  const body: IConfigRequest = await req.json();

  const cookieStore = await cookies();

  cookieStore.set("settings", JSON.stringify(body));

  return NextResponse.json({ success: true, status: 200, data: body });
}
