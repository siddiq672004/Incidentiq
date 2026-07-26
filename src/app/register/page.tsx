export default function RegisterPage() {
  return (

    <main className="flex justify-center py-24">

      <div className="w-96">

        <h1 className="text-3xl font-bold">

          Register

        </h1>

        <input

          placeholder="Email"

          className="mt-6 w-full rounded border p-3"

        />

        <input

          placeholder="Password"

          type="password"

          className="mt-4 w-full rounded border p-3"

        />

        <button

          className="mt-6 w-full rounded bg-blue-600 p-3 text-white"

        >

          Register

        </button>

      </div>

    </main>

  );
}