import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Dragon Challenge - E-commerce</title>
        <meta name="description" content="Dragon Challenge E-commerce Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🐉 Welcome to Dragon Challenge
          </h1>
          <p className="text-lg text-gray-600">
            A full-stack e-commerce application built with React, Next.js, NestJS, and GraphQL.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">🛍️ Browse Products</h2>
              <p className="text-gray-600">Explore our collection of products</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">📦 Place Orders</h2>
              <p className="text-gray-600">Easy checkout and order management</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">👤 User Account</h2>
              <p className="text-gray-600">Manage your profile and order history</p>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-gray-600">
              📚 Check the README.md for full documentation and setup instructions.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
