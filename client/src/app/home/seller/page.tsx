"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  Box,
  Button,
  Card,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { url } from "../../../../config";
import imageCompression from "browser-image-compression";

export default function PropertyForm() {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [picture, setPicture] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: any }>({});
  const [alertVisible, setAlertVisible] = useState(false);

  const router = useRouter();

  const validate = () => {
    const errors: { [key: string]: any } = {};

    if (!name) {
      errors.name = "Name is required";
    }

    if (!place) {
      errors.place = "Place is required";
    }

    if (!area) {
      errors.area = "Area is required";
    }

    if (!price) {
      errors.price = "Price is required";
    }

    if (!bedrooms) {
      errors.bedrooms = "Number of bedrooms is required";
    }

    if (!bathrooms) {
      errors.bathrooms = "Number of bathrooms is required";
    }

    return errors;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64String = event.target.result.split(",")[1];
          setPicture(base64String);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const errors = validate();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      const data = await JSON.parse(localStorage.getItem("userData"));
      const res = await fetch(`${url}/prop/property`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: name,
          owner: data!["id"],
          place: place,
          area: area,
          price: price,
          bedrooms: bedrooms,
          bathrooms: bathrooms,
          picture: picture,
        }),
      });
      if (!res.ok) {
        const text = await res.text(); // Get response as text
        try {
          const data = JSON.parse(text); // Try to parse JSON
          setErrors({ fetchError: data.error });
        } catch {
          setErrors({ fetchError: text }); // Fallback to plain text
        }
        setAlertVisible(true);
      } else {
      }
    } else {
      setAlertVisible(true);
    }
  };
  return (
    <div>
      {" "}
      <Button
        onClick={() => {
          router.push("/propertylist");
        }}
      >
        Get Property list
      </Button>
      <div className="flex flex-row justify-center items-center h-screen w-full">
        <Box
          width="600px"
          className="border-black bg-slate-100 p-10"
          height="auto"
        >
          <Card size="4" variant="ghost" className="w-full">
            <Box className="w-full">
              <Text className="text-3xl font-medium">
                Property Registration
              </Text>
              <form onSubmit={handleSubmit}>
                <TextField.Root
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="my-3 w-full"
                />
                {errors.name && (
                  <Text className="text-red-600">{errors.name}</Text>
                )}
                <TextField.Root
                  type="text"
                  placeholder="Place"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  className="my-3 w-full"
                />
                {errors.place && (
                  <Text className="text-red-600">{errors.place}</Text>
                )}
                <TextField.Root
                  type="text"
                  placeholder="Area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="my-3 w-full"
                />
                {errors.area && (
                  <Text className="text-red-600">{errors.area}</Text>
                )}
                <TextField.Root
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="my-3 w-full"
                />
                {errors.price && (
                  <Text className="text-red-600">{errors.price}</Text>
                )}
                <TextField.Root
                  type="number"
                  placeholder="Number of Bedrooms"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="my-3 w-full"
                />
                {errors.bedrooms && (
                  <Text className="text-red-600">{errors.bedrooms}</Text>
                )}
                <TextField.Root
                  type="number"
                  placeholder="Number of Bathrooms"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="my-3 w-full"
                />
                {errors.bathrooms && (
                  <Text className="text-red-600">{errors.bathrooms}</Text>
                )}
                <Flex className="flex flex-row">
                  <Text>Enter picture of your property</Text>
                  <TextField.Root
                    type="file"
                    placeholder="Picture"
                    onChange={handleImageChange}
                    className="my-3 w-full"
                  />
                </Flex>

                <div className="flex flex-row items-center w-full justify-center">
                  <Button className="my-3" size="3" type="submit">
                    <Text>Register Property</Text>
                  </Button>
                </div>
              </form>
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
    </div>
  );
}
