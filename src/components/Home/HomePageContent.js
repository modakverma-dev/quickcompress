"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, Image, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HomePageContent = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full flex flex-col items-center py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Compress Images in a Snap
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Reduce file sizes without compromising quality. Fast, free,
                  and easy to use.
                </p>
              </div>
              <div className="space-x-4">
                <Button
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                  className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 py-2 text-lg font-medium text-gray-50 shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/90 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                >
                  Get Started
                </Button>
                <Link
                  href="#section1"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white px-6 py-2 text-lg font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  variant="outline"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section
          id="section1"
          className="w-full flex flex-col items-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Why Choose QuickCompress?
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <h3 className="text-xl font-bold">Lightning Fast</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Compress images in seconds, not minutes.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <h3 className="text-xl font-bold">Quality Preserved</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Maintain image quality while reducing file size.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <h3 className="text-xl font-bold">Secure & Private</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Your images are deleted after compression.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col items-center py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Upload className="h-8 w-8" />
                <h3 className="text-xl font-bold">1. Upload</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Select the images you want to compress.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <ArrowRight className="h-8 w-8" />
                <h3 className="text-xl font-bold">2. Compress</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Our algorithm optimizes your images.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Image className="h-8 w-8" />
                <h3 className="text-xl font-bold">3. Download</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Get your compressed images instantly.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col items-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400 text-center italic">
                  &ldquo;CompressNow has saved me so much time and storage
                  space. It&apos;s a game-changer!&ldquo;
                </p>
                <p className="font-semibold">- Sarah K., Photographer</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400 text-center italic">
                  &ldquo;I use CompressNow for all my web projects. It&apos;s
                  fast, efficient, and reliable.&ldquo;
                </p>
                <p className="font-semibold">- Mike T., Web Developer</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400 text-center italic">
                  &ldquo;The quality of compressed images is impressive. Highly
                  recommended!&ldquo;
                </p>
                <p className="font-semibold">- Emily R., Graphic Designer</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col items-center py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to compress?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of satisfied users and start compressing your
                  images today.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Get notified about new features and updates. No spam.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePageContent;
