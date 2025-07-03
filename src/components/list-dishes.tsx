import { useToken } from "@/context/token-context";
import { searchDish } from "@/lib/api";
import { SearchResult } from "@/types";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

export function ListDishes({
  queryData,
}: {
  queryData: {
    dish: string;
    serving: number;
  };
}) {
  const [data, setData] = useState<SearchResult[]>([]);
  const { token } = useToken();

  useEffect(() => {
    async function search() {
      const resp = await searchDish(queryData, token ?? "");
      setData(resp);
      console.log(resp);
    }

    if (!token) return;
    search();
  }, [queryData, token]);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Results
        </CardTitle>
        <CardDescription>
          Found {data.length} dish matching {`"${queryData.dish}"`}
        </CardDescription>
        <div>
          {data.map((item) => (
            <div key={item.dish_name}>
              <p>{item.dish_name}</p>
              <p>{item.serving}</p>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
