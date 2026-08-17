import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { phone, email, items, cartTotal } = await request.json();

    // Webhook trigger simulation for WhatsApp / Email abandoned cart automated flow
    const webhookPayload = {
      event: "cart.abandoned",
      phone,
      email,
      itemCount: items?.length || 0,
      cartTotal,
      reminderDiscountCode: "COMEBACK10",
      triggeredAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Abandoned cart webhook dispatched",
      payload: webhookPayload,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Abandoned cart trigger failed" },
      { status: 500 }
    );
  }
}
