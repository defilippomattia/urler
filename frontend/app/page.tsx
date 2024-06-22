"use client";

import UrlCard from "./URLCard";
import React, { useState, useEffect } from "react";
import {
  SimpleGrid,
  Notification,
  Select,
  Container,
  Center,
  Loader,
  Space,
} from "@mantine/core";

export default function HomePage() {
  const [environment, setEnvironment] = useState<string>("test");
  const [urls, setUrls] = useState<Array<{ name: string; url: string }>>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8058";

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/services?env=${environment}`
        );
        const data = await response.json();
        console.log("Data:", data);
        setUrls(data);
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    };

    fetchUrls();
  }, [environment]);

  const handleEnvironmentChange = (value: string) => {
    setEnvironment(value);
    console.log("Selected Environment:", value);
  };

  return (
    <>
      <Space h="xl" />
      <Container>
        <SimpleGrid cols={2} spacing="xs">
          <Notification withBorder withCloseButton={false} title={"urler"}>
            {"Some text"}
          </Notification>
          <Select
            label="Choose Environment"
            onChange={(value) => handleEnvironmentChange(value as string)}
            defaultValue={environment}
            data={["test", "preprod", "prod"]}
            allowDeselect={false}
          />
        </SimpleGrid>
      </Container>
      <Space h="xl" />

      {urls.length > 0 ? (
        urls.map((urlData) => (
          <UrlCard key={urlData.url} name={urlData.name} url={urlData.url} />
        ))
      ) : (
        <Center>
          <Loader color="blue" />
        </Center>
      )}
    </>
  );
}
