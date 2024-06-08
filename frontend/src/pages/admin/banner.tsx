import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { isPending, error, data } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/banners`,
      );
      const data = await response.json();

      return {
        message: data?.[0]?.message,
      };
    },
  });

  function onSubmit() {}

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
        <form action="post" onSubmit={onSubmit} className="mx-auto max-w-3xl">
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
          </div>
          <div className="mt-6">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
