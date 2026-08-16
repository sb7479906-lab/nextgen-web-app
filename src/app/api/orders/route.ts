import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, phone, countryCode, address, items, totalAmount } = body;

    // Basic Validation Check
    if (!fullName || !phone || !address) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Save Order to Firebase Database
    const orderDoc = await addDoc(collection(db, "orders"), {
      customer: {
        fullName,
        phone: `${countryCode}${phone}`,
        address,
      },
      items: items || [],
      totalAmount: totalAmount || "PKR 0",
      paymentMethod: "Cash on Delivery (COD)",
      status: "Pending", // Pending -> Confirmed -> Dispatched -> Delivered
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      orderId: orderDoc.id,
      message: "Order placed successfully!",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    const errorMessage = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
