import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Activity {
  id: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  amount: string;
  status: "completed" | "pending" | "failed";
  date: string;
}

const recentActivities: Activity[] = [
  {
    id: "1",
    user: {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      avatar: "/avatars/01.png",
    },
    amount: "+$1,999.00",
    status: "completed",
    date: "2 hours ago",
  },
  {
    id: "2",
    user: {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      avatar: "/avatars/02.png",
    },
    amount: "+$39.00",
    status: "completed",
    date: "5 hours ago",
  },
  {
    id: "3",
    user: {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      avatar: "/avatars/03.png",
    },
    amount: "+$299.00",
    status: "pending",
    date: "1 day ago",
  },
  {
    id: "4",
    user: {
      name: "William Kim",
      email: "will@email.com",
      avatar: "/avatars/04.png",
    },
    amount: "+$99.00",
    status: "completed",
    date: "2 days ago",
  },
  {
    id: "5",
    user: {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      avatar: "/avatars/05.png",
    },
    amount: "+$39.00",
    status: "completed",
    date: "3 days ago",
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.user.avatar} alt="Avatar" />
                <AvatarFallback>
                  {activity.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1 flex-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.user.email}
                </p>
              </div>
              <div className="text-right">
                <div className="font-medium">{activity.amount}</div>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
