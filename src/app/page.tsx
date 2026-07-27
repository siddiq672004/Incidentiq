// import Navbar from "@/app/components/Navbar";

// export default function Home() {
//   return (
//     <>
//       <Navbar />

//       <main className="max-w-5xl mx-auto py-24">

//         <h1 className="text-6xl font-bold">
//           AI Incident Management
//         </h1>

//         <p className="mt-6 text-xl text-gray-600">

//           Upload application logs.

//           Let AI explain production issues.

//         </p>

//       </main>
//     </>
//   );
// }


"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }

    checkSession();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      Loading...
    </main>
  );
}