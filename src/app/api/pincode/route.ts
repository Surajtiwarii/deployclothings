import { NextResponse } from "next/server";
import { getEstimatedDeliveryDate } from "@/lib/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pincode = searchParams.get("code");

  if (!pincode || !/^\d{6}$/.test(pincode)) {
    return NextResponse.json(
      { success: false, error: "Invalid 6-digit Indian pincode" },
      { status: 400 }
    );
  }

  let city = "Metro Zone";
  let state = "India";
  let days = 3;

  if (pincode.startsWith("56")) {
    city = "Bengaluru";
    state = "Karnataka";
    days = 2;
  } else if (pincode.startsWith("11")) {
    city = "New Delhi";
    state = "Delhi";
    days = 3;
  } else if (pincode.startsWith("40")) {
    city = "Mumbai";
    state = "Maharashtra";
    days = 3;
  } else if (pincode.startsWith("60")) {
    city = "Chennai";
    state = "Tamil Nadu";
    days = 2;
  } else if (pincode.startsWith("70")) {
    city = "Kolkata";
    state = "West Bengal";
    days = 4;
  } else {
    city = "Delivery Hub";
    state = "India";
    days = 4;
  }

  return NextResponse.json({
    success: true,
    pincode,
    city,
    state,
    serviceable: true,
    codAvailable: true,
    estimatedDeliveryDate: getEstimatedDeliveryDate(days),
    courierPartner: "Bluedart / Delhivery Express",
  });
}
