"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { add_product_in_inventry } from "@/actions/inventry";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import ProductDetails from "@/components/ProductDetails";
import { Inventory, User } from "@/db/schema";
import { get_all_products_in_inventry } from "@/actions/inventry";
import { getUser } from "@/actions/user";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  quantity: z.string().min(1, {
    message: "Product amount must be at least 1.",
  }),
  cost: z.string().min(1, {
    message: "Product cost must be at least 1.",
  }),
  status: z.string().min(1, {
    message: "Product status must be at least 1.",
  }),
});

const Page = () => {
  const [userProducts, setUserProducts] = useState([] as Inventory[]);
  const [user_id, setUser_id] = useState("");
  const [userDetails, setUserDetails] = useState<User>({} as User);

  useEffect(() => {
    const fetchProducts = async () => {
      const user: User = (await getUser()) as User;
      if (!user) {
        redirect("/sign-in");
      }
      setUser_id(user.id);
      setUserDetails(user);
      const products = await get_all_products_in_inventry(user.id);
      console.log("userProducts", products);
      setUserProducts(products);
    };
    fetchProducts();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      quantity: "",
      cost: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const data = {
        ...values,
        quantity: parseInt(values.quantity),
        cost: parseInt(values.cost),
        user_id,
      };

      console.log(data);
      const addingProduct = await add_product_in_inventry(data);
      console.log(addingProduct);
      const products = await get_all_products_in_inventry(user_id);
      console.log("userProducts", products);
      setUserProducts(products);
      toast.success("Product added successfully");
      values = {
        name: "",
        quantity: "",
        cost: "",
        status: "",
      };
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="flex">
      <Navbar />
      <div className="flex flex-col items-center w-full">
        <div className="font-bold text-2xl mt-5">My Inventory</div>
        <p>An overview of yours crops</p>
        {userProducts.length === 0 ? (
          <div className="flex justify-center items-center min-h-full">
            <h1 className="text-2xl">No products in your inventory Add now</h1>
          </div>
        ) : (
          <Tabs
            defaultValue="seeds"
            className="w-full justify-center flex flex-col items-center mt-5 gap-5"
          >
            <TabsList>
              <TabsTrigger value="seeds" className="w-fit">
                Seeds
              </TabsTrigger>
              <TabsTrigger value="in-growth" className="w-fit">
                In Growth
              </TabsTrigger>
              <TabsTrigger value="ready" className="w-fit">
                Ready
              </TabsTrigger>
            </TabsList>
            <TabsContent value="seeds">
              <div className="flex flex-wrap gap-5">
                {userProducts
                  .filter((product: Inventory) => product.status === "seeds")
                  .map((product: Inventory, index: number) => {
                    return (
                      <ProductDetails
                        user={userDetails}
                        details={product}
                        key={index}
                      />
                    );
                  })}
              </div>
            </TabsContent>
            <TabsContent value="in-growth">
              <div className="flex flex-wrap gap-5">
                {userProducts
                  .filter(
                    (product: Inventory) => product.status === "in-growth"
                  )
                  .map((product: Inventory, index: number) => {
                    return (
                      <ProductDetails
                        user={userDetails}
                        details={product}
                        key={index}
                      />
                    );
                  })}
              </div>
            </TabsContent>
            <TabsContent value="ready">
              <div className="flex flex-wrap gap-5">
                {userProducts
                  .filter((product: Inventory) => product.status === "Ready")
                  .map((product: Inventory, index: number) => {
                    return (
                      <ProductDetails
                        user={userDetails}
                        details={product}
                        key={index}
                      />
                    );
                  })}
              </div>
            </TabsContent>
          </Tabs>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="fixed bottom-10 right-10 flex justify-center mt-5">
              <div className="bg-[#a16207] text-white p-3 hover:bg-[#ffbc6b] hover:text-black rounded-full cursor-pointer">
                <Plus />
              </div>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className="flex justify-center">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Create a Product</CardTitle>
                  <CardDescription>Add anything.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-2"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>your product name</FormLabel>
                            <FormControl>
                              <div className="flex flex-col space-y-1.5">
                                <Input
                                  id="name"
                                  placeholder="Name of your product"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>your product Quantity</FormLabel>
                            <FormControl>
                              <div className="flex flex-col space-y-1.5">
                                <Input
                                  id="quantity"
                                  type="number"
                                  placeholder="Quantity of your product"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>your product cost</FormLabel>
                            <FormControl>
                              <div className="flex flex-col space-y-1.5">
                                <Input
                                  id="cost"
                                  type="number"
                                  placeholder="cost of your product"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex flex-col mt-4">
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Product Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>Status</SelectLabel>
                                      <SelectItem value="seeds">
                                        seeds
                                      </SelectItem>
                                      <SelectItem value="in-growth">
                                        In Growth
                                      </SelectItem>
                                      <SelectItem value="Ready">
                                        Ready
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>
                          <Button type="submit">Submit</Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Page;
