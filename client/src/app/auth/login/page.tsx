"use client";
import {
  AlertDialog,
  Box,
  Button,
  Card,
  Flex,
  Radio,
  Text,
  TextField,
} from "@radix-ui/themes";
import React, { useState } from "react";
import Link from "next/link";
import { url } from "../../../../config";
import { useRouter } from "next/navigation";
export default function Login() {
  const router=useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [userType, setUserType] = useState<string>("buyer");
  const [error, setError] = useState<{
    email?: string;
    password?: string;
    fetchError?: string;
  }>();
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const err = validate();
    setError(err);
    if (Object.keys(err).length === 0) {
      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          userType: userType,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError({ fetchError: data["error"] });
        setAlertVisible(true);
      }
      const data = await res.json();
      localStorage.setItem("userData", JSON.stringify({...data,userType:userType}));
      router.push('/');

    } else {
      setAlertVisible(true);
    }
  };
  return (
    <div className="flex flex-row justify-center items-center h-screen w-full">
      <Box
        width="600px"
        className="border-black bg-slate-100 p-10 rounded-lg"
        height="auto"
      >
        <Card size="4" variant="ghost">
          <Box>
            <Text className="text-3xl font-medium">Welcome to Rentify!</Text>
            <TextField.Root
              type="email"
              placeholder="Enter your email"
              className="my-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error?.email && (
              <Text className="text-red-600">{error.email}</Text>
            )}
            <TextField.Root
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error?.password && (
              <Text className="text-red-600">{error.password}</Text>
            )}
            <Flex align="start" direction="row" gap="3" className="mt-2">
              <Text>Are you a Buyer or Seller?</Text>
              <Flex asChild gap="2">
                <Text as="label" size="2">
                  <Radio
                    name="usertype"
                    value="buyer"
                    checked={userType === "buyer"}
                    onChange={() => setUserType("buyer")}
                  />
                  Buyer
                </Text>
              </Flex>
              <Flex asChild gap="2">
                <Text as="label" size="2">
                  <Radio
                    name="usertype"
                    value="seller"
                    checked={userType === "seller"}
                    onChange={() => setUserType("seller")}
                  />
                  Seller
                </Text>
              </Flex>
            </Flex>
            <div className="flex flex-row items-center w-full justify-center mt-4">
              <Button className="my-3" size="3" onClick={handleSubmit}>
                <Text>Login</Text>
              </Button>
            </div>
          </Box>
          <Box className="mt-4">
            <Text>
              Don't have an account?{" "}
              <Link href="/auth/register">
                <Text className="text-red-600">Register</Text>
              </Link>
            </Text>
          </Box>
        </Card>
      </Box>
      {alertVisible && (
        <AlertDialog.Root open={alertVisible}>
          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Login Unsuccessful</AlertDialog.Title>
            <AlertDialog.Description className="p-4 rounded">
              <Flex className="flex flex-col">
                {error?.email && <Text className="m-2">{error.email}</Text>}
                {error?.password && (
                  <Text className="m-2">{error.password}</Text>
                )}
                {error?.fetchError && (
                  <Text className="m-2">{error.fetchError}</Text>
                )}
              </Flex>
            </AlertDialog.Description>
            <Flex className="flex flex-row justify-center items-center w-full">
              <AlertDialog.Cancel onClick={() => setAlertVisible(false)}>
                <Button variant="soft" color="gray">
                  Ok
                </Button>
              </AlertDialog.Cancel>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      )}
    </div>
  );
}
