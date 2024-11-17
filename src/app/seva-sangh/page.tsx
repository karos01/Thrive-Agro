"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { create_complain } from "@/actions/complains";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  issue: z.string().min(2).max(50),
  location: z.string().min(2).max(50),
  date: z.date(),
});

import { get_complains } from "@/actions/complains";
import styles from "./seva.module.css";
import { CalendarCheck, MapPin } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { Complain } from "@/db/schema";
import { toast } from "sonner";

export default function Page() {
  const [allComplaints, setAllComplaints] = useState<Complain[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: Complain[] = (await get_complains()) || [];
      setAllComplaints(data);
    };
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      issue: "",
      location: "",
      date: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      await create_complain(values);
      toast.success("Form submitted successfully");
      const data: Complain[] = (await get_complains()) || [];
      setAllComplaints(data);
    } catch (error) {
      console.log(error);
      toast.error("Error in submitting the form");
    }
  }
  return (
    <div className="flex">
      <Navbar />
      <div className="flex flex-col items-center w-full justify-center">
        <div className="flex flex-col">
          <div className="container mx-auto py-16">
            <h1 className={styles.heading}>Seva Form</h1>
            <div className={styles.inputContainer}>
              <div className={styles.inputGroup}>
                <CalendarCheck size={24} className={styles.icon} />
                {/* <label htmlFor="date">Date:</label> */}
                <input
                  type="text"
                  id="date"
                  className={styles.input}
                  placeholder="mm/dd/yyyy"
                />
              </div>
              <div className={styles.inputGroup}>
                {/* <label htmlFor="location">Location:</label> */}
                <MapPin />
                <input
                  type="text"
                  id="location"
                  className={styles.input}
                  placeholder="Location"
                />
              </div>
              <div className={styles.inputGroup}>
                {/* <label htmlFor="category">Category:</label> */}
                <select id="category" className={styles.input}>
                  <option value="roads">Category</option>
                  <option value="roads">Roads</option>
                  <option value="irrigation">Irrigation</option>
                </select>
              </div>
            </div>
          </div>
          {/* <Post/> */}
        </div>
        <div className="flex flex-wrap gap-3 mb-6 mx-10">
          {allComplaints.length == 0 && (
            <>
              <div className="text-5xl">No issue yet Yay!</div>
            </>
          )}
          {allComplaints.map((x) => {
            return (
              <div
                className="flex flex-wrap w-96 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden max-w-md mx-auto"
                key={x.id}
              >
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                    {x.issue}
                  </h2>
                  <div className="flex justify-between">
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {x.name}
                    </p>
                    <div className="font-bold">
                      {x.date.getDate()}-{x.date.getMonth()}-
                      {x.date.getFullYear()}
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700">
                  <dl>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Status
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 capitalize">
                          Unresolved
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            );
          })}
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="fixed bottom-10 right-10 flex justify-center mt-5">
              <div className="bg-[#a16207] flex justify-center gap-2 items-center text-white p-3 hover:bg-[#ffbc6b] hover:text-black rounded-lg cursor-pointer">
                Add New issue <Plus />
              </div>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className="flex flex-col items-center justify-center">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="issue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Issue</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>
                          Describe your issue here
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your Full Name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Location" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your location.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          This date is used as a issue starting date
                        </FormDescription>
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
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
