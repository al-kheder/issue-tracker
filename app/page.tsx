import { auth } from "@/auth";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  // if (session) redirect("/dashboard")
  {
    session && redirect("/dashboard");
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-amber-200 via-pink-200 to-rose-200 blur-3xl opacity-30 animate-pulse [animation-delay:3s]" />
      </div>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-1 text-sm font-medium shadow-sm border">
          <span className="text-blue-600">NEW</span> Real‑time issue insights
          (soon)
        </div>
        <Heading size="9" className="tracking-tight leading-[1.05]">
          Track, Prioritize, and Resolve Issues{" "}
          <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Faster Together
          </span>
        </Heading>
        <Text
          size="5"
          color="gray"
          className="max-w-2xl mx-auto leading-relaxed"
        >
          A focused workspace to log bugs, assign teammates, monitor progress,
          and celebrate shipped fixes. Simple enough to start in seconds.
          Powerful enough to scale with your project.
        </Text>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="3" asChild>
            <Link href="/api/auth/signin">Sign In with Google</Link>
          </Button>
          <Button size="3" variant="outline" asChild>
            <Link href="#features">Explore Features</Link>
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Issues Tracked", value: "1,240+" },
            { label: "Avg. Resolution", value: "2.1d" },
            { label: "Active Contributors", value: "58" },
            { label: "Automation Rules", value: "12" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-white/70 backdrop-blur">
              <Flex direction="column" align="center" gap="1" py="3">
                <Heading size="5">{stat.value}</Heading>
                <Text size="2" color="gray">
                  {stat.label}
                </Text>
              </Flex>
            </Card>
          ))}
        </div>
      </section>

      {/* Feature Highlights */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-6 pb-20 space-y-12"
      >
        <Heading size="7" className="text-center">
          Why Use This Issue Tracker?
        </Heading>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="p-6 bg-white/80 backdrop-blur">
            <div className="text-4xl mb-4">📝</div>
            <Heading size="4" mb="2">
              Capture Clearly
            </Heading>
            <Text color="gray" size="2">
              Create structured issues with rich descriptions, ownership, and
              labels so nothing slips.
            </Text>
          </Card>
          <Card className="p-6 bg-white/80 backdrop-blur">
            <div className="text-4xl mb-4">👥</div>
            <Heading size="4" mb="2">
              Assign & Own
            </Heading>
            <Text color="gray" size="2">
              Assign teammates and instantly see responsibility, status, and
              next steps.
            </Text>
          </Card>
          <Card className="p-6 bg-white/80 backdrop-blur">
            <div className="text-4xl mb-4">🚀</div>
            <Heading size="4" mb="2">
              Ship Faster
            </Heading>
            <Text color="gray" size="2">
              Prioritize intelligently and remove blockers with a workflow
              purpose‑built for iteration.
            </Text>
          </Card>
        </div>
      </section>

      {/* Workflow Strip */}
      <section className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-10">
          <Heading size="7" className="text-center">
            A Flow That Matches Your Momentum
          </Heading>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              {
                step: "1",
                title: "Log",
                desc: "Create a new issue with context",
              },
              {
                step: "2",
                title: "Assign",
                desc: "Pick an owner or leave unassigned",
              },
              {
                step: "3",
                title: "Prioritize",
                desc: "Add labels & sort by impact",
              },
              {
                step: "4",
                title: "Resolve",
                desc: "Track progress to closure",
              },
              { step: "5", title: "Reflect", desc: "Review metrics & improve" },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center font-semibold">
                    {item.step}
                  </span>
                  <span className="font-medium">{item.title}</span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-12">
        <Heading size="7" className="text-center">
          Use It Your Way
        </Heading>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: "🧪",
              title: "QA Teams",
              body: "Surface regressions fast. Keep dev loop tight.",
            },
            {
              icon: "💻",
              title: "Indie Devs",
              body: "Stay organized solo without heavy process overhead.",
            },
            {
              icon: "🏢",
              title: "Product Squads",
              body: "Coordinate across roles with clear accountability.",
            },
          ].map((card) => (
            <Card
              key={card.title}
              className="p-6 hover:shadow-lg transition-shadow bg-white/85 backdrop-blur"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <Heading size="4" mb="2">
                {card.title}
              </Heading>
              <Text color="gray" size="2">
                {card.body}
              </Text>
            </Card>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center space-y-6">
        <Heading size="6">Ready To Eliminate Noise?</Heading>
        <Text size="3" color="gray">
          Sign in and start tracking the work that matters. No config. Just
          flow.
        </Text>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="3" asChild>
            <Link href="/api/auth/signin">Start Now</Link>
          </Button>
          <Button size="3" variant="outline" asChild>
            <Link href="/api/auth/signin">Try With a Demo Project</Link>
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Google sign‑in only. We store minimal profile data for identification.
        </p>
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  applicationName: "Issue Tracker",
  title: {
    default: "Issue Tracker – Track, Prioritize, and Resolve Faster",
    template: "%s | Issue Tracker",
  },
  description:
    "Log bugs, assign teammates, prioritize work, and ship fixes. Simple to start, powerful enough to scale.",
  keywords: [
    "issue tracker",
    "bug tracking",
    "task management",
    "project management",
    "software development",
    "QA",
    "sprint planning",
    "kanban",
  ],
  authors: [{ name: "Issue Tracker Team" }],
  creator: "Issue Tracker",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Issue Tracker",
    title: "Issue Tracker – Track, Prioritize, and Resolve Faster",
    description:
      "Log bugs, assign teammates, prioritize work, and ship fixes. Simple to start, powerful enough to scale.",
    locale: "en_US",
  },
};
