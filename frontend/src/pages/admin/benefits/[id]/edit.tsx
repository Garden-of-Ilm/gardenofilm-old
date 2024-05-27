import { useRouter } from "next/router";
import Link from "next/link";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axiosInstance, { baseURL } from "@/lib/axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/components/admin-layout";
import ChevronLeftIcon from "@/icons/chevron-left";

export default function Page() {
  const router = useRouter();

  const { isPending, error, data } = useQuery({
    queryKey: [router.query.id],
    queryFn: async () => {
      const response = await fetch(baseURL + `/benefits/` + router.query.id);
      return response.json();
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      return axiosInstance.patch("/benefits/" + router.query.id, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData([router.query.id], data);
    },
  });

  function onSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    mutation.mutate(formData);
    router.push("/admin/benefits");
  }

  if (isPending) {
    return "Loading...";
  }

  return (
    <AdminLayout>
      <div className="flex items-center border-b border-slate-300 px-4 py-4">
        <Link
          href={"../"}
          className="flex items-center py-1.5 text-blue-600 hover:text-blue-700"
        >
          <ChevronLeftIcon className="mr-1 h-4 w-4" />
          Back
        </Link>
      </div>
      <div className="pb-10 pt-5">
        <form action="post" onSubmit={onSubmit} className="mx-auto max-w-3xl">
          <div className="text-lg font-semibold leading-none tracking-tight">
            Edit benefit
          </div>
          <div className="mt-6 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              className="border-slate-400"
              id="title"
              name="title"
              defaultValue={data.title}
              required
            />
          </div>
          <div className="mt-6 grid w-full max-w-sm items-center gap-1.5">
            <Label>Author</Label>
            <Select name="author" defaultValue={data.author} required>
              <SelectTrigger className="w-[250px] border-slate-400">
                <SelectValue placeholder="Select an author" />
              </SelectTrigger>
              <SelectContent className="border-slate-300">
                <SelectGroup>
                  <SelectLabel>Authors</SelectLabel>
                  <SelectItem value="Sheikh Ibn Baz">Sheikh Ibn Baz</SelectItem>
                  <SelectItem value="Sheikh Ibn Uthaymeen">
                    Sheikh Ibn Uthaymeen
                  </SelectItem>
                  <SelectItem value="Sheikh Al-Albani">
                    Sheikh Al-Albani
                  </SelectItem>
                  <SelectItem value="Sheikh Al-Fawzan">
                    Sheikh Al-Fawzan
                  </SelectItem>
                  <SelectItem value="Sheikh Al-Luhaydan">
                    Sheikh Al-Luhaydan
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-6 grid w-full gap-1.5">
            <Label htmlFor="content">Content</Label>
            <Textarea
              className="border-slate-400"
              id="content"
              name="content"
              defaultValue={data.content}
              required
            />
          </div>
          <div className="mt-6 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="audioUrl">Audio URL</Label>
            <Input
              type="text"
              className="border-slate-400"
              id="audioUrl"
              name="audioUrl"
              defaultValue={data.audioUrl}
            />
          </div>
          <div className="mt-6 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="category">Category</Label>
            <Input
              type="text"
              className="border-slate-400"
              id="category"
              name="category"
              defaultValue={data.category}
            />
          </div>
          <div className="mt-6 grid w-full gap-1.5">
            <Label htmlFor="additionalReferences">Additional References</Label>
            <Textarea
              className="border-slate-400"
              id="additionalReferences"
              name="additionalReferences"
              defaultValue={data.additionalReferences}
            />
          </div>
          <div className="mt-6">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
