"use client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];

  const getBarColor = (index: number) => {
    switch (index) {
      case 0:
        return "url(#redGradient)"; // Open
      case 1:
        return "url(#orangeGradient)"; // In Progress
      case 2:
        return "url(#greenGradient)"; // Closed
      default:
        return "#6b7280";
    }
  };

  const totalIssues = open + inProgress + closed;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const percentage =
        totalIssues > 0 ? Math.round((value / totalIssues) * 100) : 0;

      return (
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold", marginBottom: "4px" }}>
            {label} Issues
          </p>
          <p style={{ margin: 0, color: "#6b7280" }}>
            Count: <strong>{value}</strong>
          </p>
          <p style={{ margin: 0, color: "#6b7280" }}>
            Percentage: <strong>{percentage}%</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card size="4">
      <Flex direction="column" gap="4">
        <Heading size="5" style={{ textAlign: "center" }}>
          📊 Issue Status Chart
        </Heading>

        <div style={{ width: "100%", height: "400px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              {/* 🎨 Define gradients */}
              <defs>
                <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fca5a5" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
                <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fdba74" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#86efac" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#6b7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip
                /*  contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }} */
                content={<CustomTooltip />}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={60}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <Flex justify="between">
          <Text size="2" color="gray">
            Total: {totalIssues}
          </Text>
          <Flex gap="4">
            <Flex align="center" gap="1">
              <div
                style={{
                  width: 12,
                  height: 12,
                  background: "#ef4444",
                  borderRadius: 2,
                }}
              />
              <Text size="1">Open</Text>
            </Flex>
            <Flex align="center" gap="1">
              <div
                style={{
                  width: 12,
                  height: 12,
                  background: "#f97316",
                  borderRadius: 2,
                }}
              />
              <Text size="1">Progress</Text>
            </Flex>
            <Flex align="center" gap="1">
              <div
                style={{
                  width: 12,
                  height: 12,
                  background: "#22c55e",
                  borderRadius: 2,
                }}
              />
              <Text size="1">Closed</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default IssueChart;
