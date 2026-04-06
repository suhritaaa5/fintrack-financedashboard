import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
const BudgetProgress = ({
 budget,
  currentExpenses,
  percentageUsed,
}) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetProgress;
