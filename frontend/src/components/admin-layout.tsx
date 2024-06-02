import AuthGuard from "@/guard/AuthGuard";

import AdminNavbar from "./admin-navbar";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <AuthGuard>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/6">
          <AdminNavbar />
        </div>
        <div className="md:w-5/6">{children}</div>
      </div>
    </AuthGuard>
  );
}
