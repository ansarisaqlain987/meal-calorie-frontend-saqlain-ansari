"use client";
import { Badge } from "@/components/ui/badge";
import { useToken } from "@/context/token-context";
import { getHistory } from "@/lib/api";
import { HistoryResult } from "@/types";
import { useState, useEffect } from "react";

export function HistoryList({
  queryData,
}: {
  queryData: {
    dish: string;
    serving: number;
  };
}) {
  const [data, setData] = useState<HistoryResult[]>([]);
  const { token } = useToken();

  useEffect(() => {
    async function history() {
      const resp = await getHistory(token ?? "");
      setData(resp);
    }

    if (!token) return;

    setTimeout(() => history(), 2000);
  }, [queryData, token, queryData.dish, queryData.serving]);
  return (
    <div className="flex flex-col gap-4">
      <div>Recent Searches</div>
      <div className="flex flex-wrap gap-2">
        {data.map((item) => (
          <Badge key={item.searchString} className="cursor-pointer">
            {item.searchString}
          </Badge>
        ))}
      </div>
    </div>
  );
}
