import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x max-w-2xl py-24 text-center">
      <h1 className="text-3xl font-extrabold">Sidan finns inte</h1>
      <p className="mt-4 text-muted">Länken kan vara gammal. Gå till startsidan eller ring oss.</p>
      <Link href="/" className="btn-dark mt-8">Till startsidan</Link>
    </section>
  );
}
