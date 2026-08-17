import { NextResponse } from "next/server";
import { VALID_COUPONS } from "@/data/products";

export async function POST(request: Request) {
  try {
    const { code, cartSubtotal } = await request.json();

    if (!code) {
      return NextResponse.json(
        { success: false, error: "Coupon code is required" },
        { status: 400 }
      );
    }

    const coupon = VALID_COUPONS.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase()
    );

    if (!coupon) {
      return NextResponse.json(
        { success: false, error: "Invalid coupon code" },
        { status: 404 }
      );
    }

    if (cartSubtotal < coupon.minOrderAmount) {
      return NextResponse.json(
        {
          success: false,
          error: `Minimum order of ₹${coupon.minOrderAmount} required for this coupon`,
        },
        { status: 400 }
      );
    }

    let discountAmount = 0;
    if (coupon.discountType === "percentage") {
      discountAmount = Math.round((cartSubtotal * coupon.discountValue) / 100);
    } else {
      discountAmount = Math.min(coupon.discountValue, cartSubtotal);
    }

    return NextResponse.json({
      success: true,
      coupon,
      discountAmount,
      message: `Coupon ${coupon.code} applied successfully!`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Coupon validation failed" },
      { status: 500 }
    );
  }
}
