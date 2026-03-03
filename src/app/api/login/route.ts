// src/app/api/login/route.ts
import 'dotenv/config';
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

// Predefined test user (for immediate testing)
const testUser = {
  name: "Chris",
  email: "chris@test.com",
  password: "123456", // plaintext for demo; hashed not required here
};

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Check predefined test user first
    if (email === testUser.email && password === testUser.password) {
      const token = jwt.sign(
        { email: testUser.email, name: testUser.name },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );
      return NextResponse.json({
        message: "Login successful (test user)",
        token,
        user: testUser,
      });
    }

    // Otherwise, try MongoDB user
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Optional GET route to check API
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Login API is running" });
}