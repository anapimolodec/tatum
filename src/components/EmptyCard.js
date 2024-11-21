import { Card } from "@radix-ui/themes";

const EmptyCard = ({ title, desc }) => {
  return (
    <Card className="space-y-3 py-8">
      <h3 className="font-bold"> {title} </h3> <p>{desc}</p>
    </Card>
  );
};

export default EmptyCard;
