import * as m from "@/paraglide/messages";
import { Locale } from "@/paraglide/runtime";

export default async function Home({ params }: { params: { locale: Locale } }) {
  const { locale } = await params;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <p>locale: {locale}</p>
        <h1>{m.example_message({ username: "John Doe" })}</h1>
      </main>
    </div>
  );
}
