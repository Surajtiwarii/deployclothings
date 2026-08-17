import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { items, customerEmail } = await request.json();

    // Generate mock / live Stripe session ID
    const sessionId = `cs_test_${Math.random().toString(36).substring(2, 20)}`;

    return NextResponse.json({
      success: true,
      sessionId,
      url: `https://checkout.stripe.com/c/pay/${sessionId}`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Stripe session creation failed" },
      { status: 500 }
    );
  }
}
