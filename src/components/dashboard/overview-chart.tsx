"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Simple bar chart without external dependencies
const data = [
  { name: "Jan", value: 2400 },
  { name: "Feb", value: 1398 },
  { name: "Mar", value: 9800 },
  { name: "Apr", value: 3908 },
  { name: "May", value: 4800 },
  { name: "Jun", value: 3800 },
  { name: "Jul", value: 4300 },
  { name: "Aug", value: 5200 },
  { name: "Sep", value: 4100 },
  { name: "Oct", value: 6300 },
  { name: "Nov", value: 5800 },
  { name: "Dec", value: 7200 },
];

export function OverviewChart() {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-end justify-between gap-2 h-[250px]">
            {data.map((item) => {
              const heightPercent = (item.value / maxValue) * 100;
              return (
                <div key={item.name} className="flex flex-col items-center flex-1 h-full justify-end">
                  <div className="w-full relative group flex flex-col justify-end h-full">
                    <div
                      className="w-full bg-primary rounded-t-sm hover:opacity-80 transition-opacity cursor-pointer"
                      style={{ height: `${heightPercent}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border z-10">
                        ${item.value.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between gap-2">
            {data.map((item) => (
              <div key={`label-${item.name}`} className="flex-1 text-center">
                <p className="text-xs text-muted-foreground">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
