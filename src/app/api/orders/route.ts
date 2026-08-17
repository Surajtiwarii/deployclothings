import { NextResponse } from "next/server";
import { Order } from "@/types";

// In-memory mock database of orders
const ordersDatabase: Order[] = [
  {
    id: "ord-98214",
    orderNumber: "DC-2026-98214",
    createdAt: new Date().toISOString(),
    items: [],
    shippingAddress: {
      fullName: "Alex Varma",
      phone: "+91 98765 43210",
      email: "alex@example.com",
      addressLine1: "Flat 402, Skyline Residency",
      pincode: "560038",
      city: "Bengaluru",
      state: "Karnataka",
    },
    paymentMethod: "razorpay",
    paymentStatus: "paid",
    orderStatus: "fabric_prep",
    trackingNumber: "BD-884920194IN",
    carrier: "Bluedart Express",
    subtotal: 1899,
    shippingFee: 0,
    discount: 0,
    total: 1899,
    estimatedDelivery: "Thu, 14 Aug",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (query) {
    const q = query.toLowerCase();
    const found = ordersDatabase.find(
      (o) =>
        o.orderNumber.toLowerCase() === q ||
        o.trackingNumber.toLowerCase() === q
    );
    if (!found) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, order: found });
  }

  return NextResponse.json({ success: true, orders: ordersDatabase });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderNumber = `DC-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      items: body.items || [],
      shippingAddress: body.shippingAddress,
      paymentMethod: body.paymentMethod || "razorpay",
      paymentStatus: body.paymentMethod === "cod" ? "pending_cod" : "paid",
      orderStatus: "confirmed",
      trackingNumber: `BD-${Math.floor(100000000 + Math.random() * 900000000)}IN`,
      carrier: "Bluedart Express",
      subtotal: body.subtotal,
      shippingFee: body.shippingFee,
      discount: body.discount || 0,
      total: body.total,
      couponCode: body.couponCode,
      estimatedDelivery: "In 3-4 Business Days",
    };

    ordersDatabase.push(newOrder);

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid order data" },
      { status: 400 }
    );
  }
}
