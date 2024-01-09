import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function loading() {
  return (
    <div className="container mt-20 h-full">
      <div className="mt-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Link href={`/`}>
            <Card className="m-2 hover:bg-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10" />
                  <div>
                    <Skeleton className="mb-2 h-5 w-40" />
                    <Skeleton className="h-5 w-52" />
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
