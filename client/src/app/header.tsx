"use client";
import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [data, setData] = useState<{ [key: string]: any }>();
  const router = useRouter();

  useEffect(() => {
    const d = localStorage.getItem("userData");
    if (d) {
      setData(JSON.parse(d));
    }
  },);

  const logout = () => {
    localStorage.removeItem("userData");
    setData({});
    router.push("/auth/login");
  };

  return (
    <header className="w-full h-14 bg-white shadow-lg">
      <div className="flex flex-row items-center h-full mx-6 justify-between">
        <Text className="text-customBlue text-3xl">Rentify</Text>
        {data ? (
          <Button onClick={logout} className="bg-transparent">
            <Text className="text-white">Logout</Text>
          </Button>
        ) : (
          <div className="flex flex-row text-white text-2xl gap-3">
            <Link
              href="/auth/login"
              className="hover:text-black text-customBlue"
            >
              <Text>Login</Text>
            </Link>
            <Link
              href="/auth/register"
              className="hover:text-black text-customBlue"
            >
              <Text>Register</Text>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
