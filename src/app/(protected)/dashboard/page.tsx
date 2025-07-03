"use client";

import { ListDishes } from "@/components/list-dishes";
import { SearchItem } from "@/components/search-item";
import { Utensils } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [queryData, setSearchQuery] = useState<{
    dish: string;
    serving: number;
  }>({ dish: "", serving: 1 });
  function searchFn(input: { dish: string; serving: number }) {
    setSearchQuery(input);
  }
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <Utensils className="h-8 w-8 text-green-600" />
          Meal Calorie Calculator
        </h1>
        <p className="text-gray-600">
          Search for dishes and discover their nutritional information
        </p>
      </div>

      <SearchItem
        data={{ dish: "", serving: 1 }}
        searchFuntion={(input) => searchFn(input)}
      />

      <ListDishes queryData={queryData} />
    </div>
  );
}
