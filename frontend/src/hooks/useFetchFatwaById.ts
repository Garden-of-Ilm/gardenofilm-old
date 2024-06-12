import { useEffect, useState } from "react";
import { FatwaById } from "@/api/fatwa-res";
import axiosInstance from "@/api";

export default function useFetchFatwaById(id: string) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FatwaById | null>(null);

  useEffect(() => {
    const getFatwaById = () => {
      if (!id) return;
      setLoading(true);
      axiosInstance
        .get(`/fatwa/get/${id}`)
        .then((d) => {
          setData(d.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    getFatwaById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {
    data,
    loading,
  };
}
