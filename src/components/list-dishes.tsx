import { useToken } from "@/context/token-context";
import { searchDish } from "@/lib/api";
import { SearchResult } from "@/types";
import { Flame, Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { cn } from "@/lib/utils";
import { Loader } from "./loader";

function SectionLoader() {
  return (
    <div className="w-full flex justify-center items-center mt-4">
      <Loader />
    </div>
  );
}

export function ListDishes({
  queryData,
}: {
  queryData: {
    dish: string;
    serving: number;
  };
}) {
  const calory_colors = {
    high: "text-red-600",
    medium: "text-orange-600",
    low: "text-green-600",
  };
  const [data, setData] = useState<SearchResult[]>([]);
  const { token } = useToken();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function search() {
      setLoading(true);
      const resp = await searchDish(queryData, token ?? "");
      setData(resp);
      setLoading(false);
    }

    if (!token) return;
    if (queryData.dish) {
      search();
    }
  }, [queryData, token]);
  return (
    <div className="flex-1 flex flex-col overflow-auto mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Results
          </CardTitle>
          <CardDescription>
            {queryData.dish ? (
              <>
                Found {data.length} dish matching {`"${queryData.dish}"`}
              </>
            ) : (
              <></>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && <SectionLoader />}
          {!loading && data.length > 0 && (
            <div>
              <div className="grid gap-3">
                {data.map((food, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {food.dish_name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Serving: {food.serving}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={cn(
                            "flex items-center gap-1 font-bold text-xl justify-end",
                            food.calories_per_serving < 300
                              ? calory_colors.low
                              : food.calories_per_serving > 600
                              ? calory_colors.high
                              : calory_colors.medium
                          )}
                        >
                          <Flame className="h-5 w-5" />
                          {food.total_calories} cal
                        </div>
                        <div
                          className={
                            "flex items-center justify-end gap-1 font-light"
                          }
                        >
                          {food.calories_per_serving} cal (per serving)
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!loading && data.length == 0 && (
            <div className="flex justify-center items-center mt-4">
              No results
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
