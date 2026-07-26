import Navbar from "@/app/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto py-24">

        <h1 className="text-6xl font-bold">
          AI Incident Management
        </h1>

        <p className="mt-6 text-xl text-gray-600">

          Upload application logs.

          Let AI explain production issues.

        </p>

      </main>
    </>
  );
}