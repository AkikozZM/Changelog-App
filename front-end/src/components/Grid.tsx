import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

export function BentoGridSecond() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
const items = [
  {
    title: "Set Up Code Reviews",
    description:
      "Enhance your development process with AI-powered code reviews.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-6 w-6 text-neutral-500" />,
  },
  {
    title: "Invite Your Team",
    description: "Collaborate with your team members for better productivity.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-6 w-6 text-neutral-500" />,
  },
  {
    title: "Chat with Your Codebase",
    description: "Interact with your codebase using natural language.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-6 w-6 text-neutral-500" />,
  },
  {
    title: "Make Your First API Call",
    description: "Integrate Greptile's powerful features into your workflow.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-6 w-6 text-neutral-500" />,
  },
];
