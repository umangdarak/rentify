"use client";

import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { url } from "../../../../config";


export default function Properties() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProperties();
  }, []);

  const getProperties = async () => {
    const res = await fetch(`${url}/prop/all`, {
      method: "GET",
    });

    if (res.ok) {
      const properties = await res.json();
      console.log(properties);
      setData(properties);
    } else {
      console.error("Failed to fetch properties");
    }}


  return (
    <div className="flex flex-col w-3/4 h-screen">
      {data.map((property) => (
        <Box className="border rounded-lg p-4 mb-4 bg-white">
          <Flex direction="column" gap="2">
            <Text className="text-lg font-bold">{property.name}</Text>
            {/* <Text className="text-gray-600">Owned by: {property.owner}</Text> */}
            <Box className="w-full my-4">
              <Image
                src={`data:image/jpeg;base64,${Buffer.from(property.picture.data).toString("base64")}`}
                alt={property.name}
                width={100}
                height={100}
                className="w-full h-auto object-cover rounded-lg"
              />
            </Box>
            <Text>
              <strong>Place:</strong> {property.place}
            </Text>
            <Text>
              <strong>Area:</strong> {property.area}
            </Text>
            <Text>
              <strong>Price:</strong> ${property.price}
            </Text>
            <Flex gap="4">
              <Text>
                <strong>Bedrooms:</strong> {property.bedrooms}
              </Text>
              <Text>
                <strong>Bathrooms:</strong> {property.bathrooms}
              </Text>
            </Flex>
          </Flex>
        </Box>
       
      ))}
       </div>
  );
}
