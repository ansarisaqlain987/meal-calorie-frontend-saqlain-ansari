"use client";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const formSchema = z.object({
  dish: z.string().min(2).max(50),
  serving: z.number().min(1),
});

export function SearchItem({
  data,
  searchFuntion,
}: {
  searchFuntion: (input: { dish: string; serving: number }) => void;
  data: { dish: string; serving: number };
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dish: data.dish ?? undefined,
      serving: data.serving ?? 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    searchFuntion({
      dish: values.dish,
      serving: values.serving,
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search for a Dish
        </CardTitle>
        <CardDescription>
          Enter the name of a dish to find its calorie content and nutritional
          information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="dish"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="e.g., Grilled Chicken, Brown Rice, Banana..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="serving"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        {/* <div className="flex gap-2">
          <Input
            placeholder="e.g., Grilled Chicken, Brown Rice, Banana..."
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
            // onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button>Search </Button>
        </div> */}
      </CardContent>
    </Card>
  );
}
