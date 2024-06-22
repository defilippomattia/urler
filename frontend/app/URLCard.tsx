"use client";
import React from "react";
import {
  Card,
  Text,
  Button,
  Grid,
  SimpleGrid,
  Container,
  Space,
} from "@mantine/core";

export default function UrlCard({ name, url }: { name: string; url: string }) {
  const handleButtonClick = () => {
    window.open(url, "_blank");
  };
  return (
    <Container size="xl">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Grid>
          <Grid.Col span="auto">
            <Text fw={700} size="lg">
              {name}
            </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="lg">{url}</Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Button variant="outline" color="blue" onClick={handleButtonClick}>
              Visit URL
            </Button>
          </Grid.Col>
        </Grid>
      </Card>
      <Space h="xs" />
    </Container>
  );
}
