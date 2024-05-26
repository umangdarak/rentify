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

export default function Register() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [userType, setUserType] = useState<string>("buyer");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
const router=useRouter();
  const validate = () => {
    const errors: { [key: string]: string } = {};

    if (!firstName) {
      errors.firstName = "First name is required";
    }

    if (!lastName) {
      errors.lastName = "Last name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = "Phone number must be 10 digits";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    const errors = validate();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      const res = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          firstName:firstName,
          lastName:lastName,
          phoneNumber:phoneNumber,
          email: email,
          password: password,
          userType: userType,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setErrors({ fetchError: data["error"] });
        setAlertVisible(true);
      }
      router.push('/auth/login');

    } else {
      setAlertVisible(true);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center h-screen w-full">
      <Box
        width="600px"
        className="border-black bg-slate-100 p-10"
        height="auto"
      >
        <Card size="4" variant="ghost" className="w-full">
          <Box className="w-full">
            <Text className="text-3xl font-medium">Registration!</Text>
            <Flex direction="row" gap="3" className="my-3 w-full">
              <Flex direction="column" gap="2" className="flex-grow">
                <TextField.Root
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full"
                />
                {errors.firstName && (
                  <Text className="text-red-600">{errors.firstName}</Text>
                )}
              </Flex>
              <Flex direction="column" gap="2" className="flex-grow">
                <TextField.Root
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full"
                />
                {errors.lastName && (
                  <Text className="text-red-600">{errors.lastName}</Text>
                )}
              </Flex>
            </Flex>
            <Flex direction="row" gap="3" className="my-3">
              <Flex direction="column" gap="2" className="flex-grow">
                <TextField.Root
                  type="email"
                  placeholder="Enter your email"
                  className="my-3 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <Text className="text-red-600">{errors.email}</Text>
                )}
              </Flex>
              <Flex direction="column" gap="2" className="flex-grow">
                <TextField.Root
                  type="tel"
                  placeholder="Enter your phone number"
                  className="my-3 w-full"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {errors.phoneNumber && (
                  <Text className="text-red-600">{errors.phoneNumber}</Text>
                )}
              </Flex>
            </Flex>
            <Flex align="start" direction="row" gap="3">
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
            <Flex direction="row" gap="3" className="my-3">
              <Flex direction="column" gap="2" className="flex-grow">
                <TextField.Root
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
                {errors.password && (
                  <Text className="text-red-600">{errors.password}</Text>
                )}
              </Flex>
              <Flex direction="column" gap="2" className="flex-grow">
                <TextField.Root
                  type="password"
                  placeholder="Re-Enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full"
                />
                {errors.confirmPassword && (
                  <Text className="text-red-600">{errors.confirmPassword}</Text>
                )}
              </Flex>
            </Flex>
            <div className="flex flex-row items-center w-full justify-center">
              <Button className="my-3" size="3" onClick={handleSubmit}>
                <Text>Register</Text>
              </Button>
            </div>
          </Box>
          <Box className="mt-4">
            <Text>
              Already have an account?{" "}
              <Link href="/auth/login">
                <Text className="text-red-600">Login</Text>
              </Link>
            </Text>
          </Box>
        </Card>
      </Box>
      {alertVisible && (
        <AlertDialog.Root open={alertVisible}>
          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Registration Unsuccessful</AlertDialog.Title>
            <AlertDialog.Description className="p-4 rounded">
              <Flex className="flex flex-col">
                {Object.values(errors).map((error, index) => (
                  <Text key={index} className="m-2">
                    {error}
                  </Text>
                ))}
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
