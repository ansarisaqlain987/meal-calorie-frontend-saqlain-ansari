"use client";

import { HistoryList } from "@/components/history-list";
import { ListDishes } from "@/components/list-dishes";
import { SearchItem } from "@/components/search-item";
import { Button } from "@/components/ui/button";
import { LogOut, Moon, Sun, Utensils } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Page() {
  const { setTheme, theme } = useTheme();
  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  const [queryData, setSearchQuery] = useState<{
    dish: string;
    serving: number;
  }>({ dish: "", serving: 1 });
  function searchFn(input: { dish: string; serving: number }) {
    setSearchQuery(input);
  }
  return (
    <div className="space-y-6 h-screen flex flex-col">
      <div className="text-center space-y-2 mt-4">
        <h1 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
          <Utensils className="h-8 w-8 text-green-600" />
          Meal Calorie Calculator
        </h1>
        <p className="text-primary">
          Search for dishes and discover their nutritional information
        </p>
        <div>
          <div className="flex items-center gap-2 justify-center">
            <Button variant={"ghost"}>
              <LogOut />
            </Button>
            <Button variant={"ghost"} onClick={toggleTheme}>
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
          </div>
        </div>
      </div>

      <SearchItem
        data={{ dish: "", serving: 1 }}
        searchFuntion={(input) => searchFn(input)}
      />

      <HistoryList queryData={queryData} />

      <ListDishes queryData={queryData} />
    </div>
  );
}
