"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CopyIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Home = () => {
    const [genLink, setGenLink] = useState("");
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const urlMutation = useMutation({
        mutationFn: async ({ url }: { url: string }) => {
            const res = await axios.post("/api/url", { url });
            setGenLink(res.data);
        },
        mutationKey: ["url"],
        onSuccess: () => {
            queryClient.invalidateQueries(["url"]);
            toast({
                title: "URL Shortened",
                description: "success",
                duration: 5000,
            });
        },
    });
    const form = useForm({
        resolver: zodResolver(
            z.object({
                url: z.string().url(),
            })
        ),
        defaultValues: {
            url: "",
        },
    });
    const copyUrl = (link: string) => {
        if (typeof window !== "undefined" && window.navigator) {
            window.navigator.clipboard
                .writeText(link)
                .then(() => {
                    toast({
                        title: "sucess",
                        description: "URL Copied",
                        duration: 2000,
                    });
                })
                .catch(() => {
                    toast({
                        title: "failed",
                        description: "URL Can't be copied, please retry.",
                        duration: 2000,
                    });
                });
        }
    };

    return (
        <div className="flex w-screen h-[85vh] items-center">
            <div className="max-w-[90vw] md:max-w-[50vw] xl:min-w-[22vw] sm:h-[35vh] md:h-[50vh] p-4 md:p-10 rounded-lg shadow-md bg-accent flex flex-col justify-center items-center mx-4 md:mx-12 xl:mx-16">
                <h1 className="text-xl font-bold text-center">
                    Shorten your URL in seconds
                </h1>
                <p className="text-sm text-center mb-6">
                    Makes Downloadable Links Imperceptible, Normal Links Just
                    Shorten
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((data) => {
                            urlMutation.mutate(data);
                        })}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="url"
                                            className="w-full"
                                            placeholder="https://nexisltd.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className="flex justify-center w-full"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </form>
                </Form>
                <div className="justify-between mt-2 h-12 w-full border border-accent px-4 py-1 rounded-lg flex items-center bg-accent-foreground">
                    <p
                        className="text-sm text-center text-accent"
                        placeholder="Generated Link"
                    >
                        {genLink}
                    </p>
                    <Button
                        onClick={() => copyUrl(genLink)}
                        className="h-3/6 hover:transition-all hover:animate-in hover:duration-700"
                    >
                        <CopyIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Home;
