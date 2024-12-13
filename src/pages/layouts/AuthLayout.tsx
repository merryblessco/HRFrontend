import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main>
      <div className="py-">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Replace with your content */}
          <Outlet />

          {/* /End replace */}
        </div>
      </div>
    </main>
  );
}
