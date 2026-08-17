import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { amount, currency = "INR", receipt } = await request.json();

    // Generate mock / live Razorpay Order ID
    const razorpayOrderId = `order_${Math.random().toString(36).substring(2, 15)}`;

    return NextResponse.json({
      success: true,
      orderId: razorpayOrderId,
      amount: amount * 100, // in paise
      currency,
      keyId: process.env.RAZORPAY_KEY_ID || "rzp_test_deploy_demo",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Razorpay session initialization failed" },
      { status: 500 }
    );
  }
}
