import { Section, Heading, Button } from "@radix-ui/themes";
import Link from "next/link";

export interface StatItem {
  count: number;
  label: string;
  color: string;
}

export default function QuickStats({ stats }: { stats: StatItem[] }) {
  return (
    <Section className="bg-white rounded-lg p-8 shadow-md">
      <Heading className="text-2xl font-semibold text-center">
        Quick Overview
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-6">
        {stats.map((stat, i) => (
          <div key={i}>
            <div className={`text-3xl font-bold ${stat.color} mb-2`}>
              {stat.count}
            </div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link href="/issues">
          <Button variant="ghost">View detailed statistics →</Button>
        </Link>
      </div>
    </Section>
  );
}