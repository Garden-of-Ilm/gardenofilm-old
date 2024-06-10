import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  const { isPending, error, data } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/banners`,
      );
      const data = await response.json();

      return {
        id: data?.[0]?._id,
        message: data?.[0]?.message,
      };
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      return axiosInstance.put("/banners/" + data?.id, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["banner"], data);
      router.reload();
    },
  });

  function onSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    mutation.mutate(formData);
  }

  if (isPending) {
    return;
  }

  if (error) {
    return "An error has occurred: " + error.message;
  }

  return (
    <AdminLayout>
      <div className="flex items-center border-b border-slate-300 px-4 py-4">
        <div className="grow">
          <h2 className="text-2xl font-semibold">Banner</h2>
        </div>
      </div>
      <div className="px-4 pb-10 pt-5">
        <form method="put" onSubmit={onSubmit} className="mx-auto max-w-3xl">
          <div className="text-lg font-semibold leading-none tracking-tight">
            Edit banner
          </div>
          <div className="mt-6 grid w-full gap-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea
              className="border-slate-400"
              id="message"
              name="message"
              defaultValue={data.message}
            />
            <div className="mt-2 text-sm text-slate-500">
              To add a link, enclose the link text in brackets and then follow
              it immediately with the URL in parentheses.
              <div className="mt-0.5">
                Example:{" "}
                <span className="text-slate-900">
                  [Garden of Ilm](https://gardenofilm.com)
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
