import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { userQueryOptions } from "@/lib/api";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { isPending, data, error } = useQuery(userQueryOptions);
  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="p-2">
      <h2>
        Hello {data.user.given_name} {data.user.family_name}
      </h2>
      <a href="/api/logout">
        <Button>Logout</Button>
      </a>
    </div>
  );
};

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});
