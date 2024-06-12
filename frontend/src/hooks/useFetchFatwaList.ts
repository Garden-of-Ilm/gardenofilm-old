import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FatwaListRoot, FatwaRes } from "@/api/fatwa-res";
import axiosInstance from "@/api";

export interface UseFetchFatwaList {
  fatwaList: FatwaRes[];
  totalPages: number;
  currentPage: number;
}

export const useFetchFatwaList = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const search = params.get("search");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [fatwaLists, setFatwaLists] = useState<UseFetchFatwaList>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFatwaList = async () => {
      const query = params.get("search")
        ? `?search=${search}`
        : `?page=${page + 1}&limit=${limit}`;
      setLoading(true);
      await axiosInstance
        .get<FatwaListRoot>(`/fatwa/get-list${query}`)
        .then((res) => {
          setFatwaLists(res?.data.data);
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchFatwaList();
  }, [search, page, limit]);

  return {
    setFatwaLists,
    fatwaLists,
    loading,
    setPage,
    page,
  };
};
