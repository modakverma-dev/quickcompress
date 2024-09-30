"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const ComparatorChart = ({ originalSize, compressedSize }) => {
  const sizeDifference = originalSize - compressedSize;
  const compressionPercentage = ((sizeDifference / originalSize) * 100).toFixed(
    2
  );

  const pieData = [
    { name: "Compressed Size", value: compressedSize },
    { name: "Size Reduced", value: sizeDifference },
  ];

  const barData = [
    { name: "Original", size: originalSize },
    { name: "Compressed", size: compressedSize },
  ];

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const COLORS = ["#60A5FA", "#1E40AF"];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Compression Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Size Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#60A5FA"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatBytes(Number(value))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Before and After</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatBytes(Number(value))} />
                <Legend />
                <Bar dataKey="size" fill="#1E40AF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-2xl font-bold">
            Compression Ratio: {compressionPercentage}%
          </p>
          <p className="text-lg mt-2">
            Original: {formatBytes(originalSize)} → Compressed:{" "}
            {formatBytes(compressedSize)}
          </p>
          <p className="text-lg mt-2">
            {sizeDifference < 0 ? "You added" : "You saved"}{" "}
            {formatBytes(Math.abs(sizeDifference))}!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
export default ComparatorChart;
