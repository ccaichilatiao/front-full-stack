import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
function App() {
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    fetch("/api/expenses/get-spent")
      .then((res) => res.json())
      .then((data) => {
        setTotalSpend(data.total);
      });
  }, []);

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spend</CardTitle>
        <CardDescription>The total anount you've spend.</CardDescription>
      </CardHeader>
      <CardContent>{totalSpend}</CardContent>
    </Card>
  );
}

export default App;
