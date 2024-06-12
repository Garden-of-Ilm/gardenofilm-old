import React from "react";
import AuthGuard from "@/guard/AuthGuard";
import AdminLayout from "@/layouts/AdminLayout";
import DashboardFatwaList from "../../sections/dashboard/fatwa-list";
import { useFetchFatwaList } from "@/hooks/useFetchFatwaList";

function FatwaList() {
  const { fatwaLists, setFatwaLists, page, loading, setPage } =
    useFetchFatwaList();

  return (
    <AuthGuard>
      <AdminLayout
        buttonText="Create fatwa"
        is_heading
        is_showcase
        withMobileLogo={true}
        search={true}
        title="Admin Panel"
        description="Publish, edit, delete a ruling"
      >
        <DashboardFatwaList
          page={page}
          fatwaLists={fatwaLists}
          loading={loading}
          setFatwaLists={setFatwaLists}
          setPage={setPage}
        />
      </AdminLayout>
    </AuthGuard>
  );
}

export default FatwaList;
