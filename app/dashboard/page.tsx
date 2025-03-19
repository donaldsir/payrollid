// app/dashboard/page.tsx

import { Container, Stack, Box, Heading, Text } from "@chakra-ui/react";

export default function DashboardPage() {
  return (
    <Stack spacing={8} direction="row">
      <Box p={5} shadow="md" borderWidth="1px">
        <Heading fontSize="xl">Simple Payroll System for Indonesia</Heading>
        <Text mt={4}>
          This payroll system is designed to handle basic salary processing in compliance with Indonesian tax
          regulations. It focuses on automating salary calculations, allowances, and tax deductions to ensure accuracy
          and efficiency in payroll management.
        </Text>

        <Text mt={4} fontSize="sm" color="gray">
          Donald Siregar
        </Text>
      </Box>
    </Stack>
  );
}
