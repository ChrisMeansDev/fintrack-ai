import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  // 1. Get email and password from frontend
  const { email, password } = await req.json();

  // 2. Connect to MongoDB
  await dbConnect();

  // 3. Check if the user exists
  const user = await User.findOne({ email });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // 4. Compare password with hashed password in DB
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  // 5. Create JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET!
  );

  // 6. Return token and user info
  return NextResponse.json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
}