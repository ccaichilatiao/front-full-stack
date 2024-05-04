import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

const getTotalSpent = async () => {
  const res = await api.expenses["get-spent"].$get();
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  const data = await res.json();
  return data;
};

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  if (error) return "An error has occurred: " + error.message;

  // const [totalSpend, setTotalSpend] = useState(0);
  // useEffect(() => {
  //   async function fetchTotal() {
  //     const res = await api.expenses["get-spent"].$get();
  //     const data = await res.json();
  //     setTotalSpend(data.total);
  //   }
  //   fetchTotal();
  // }, []);

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spend</CardTitle>
        <CardDescription>The total anount you've spend.</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? "..." : data.total}</CardContent>
    </Card>
  );
}
