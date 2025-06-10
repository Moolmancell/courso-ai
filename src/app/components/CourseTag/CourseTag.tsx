import { TagVariant } from "@/app/types/TagVariant";
import { TagProps } from "@/app/interfaces/TagProps";

const VARIANT_MAP: Record<
  TagVariant,
  { text: string; icon?: React.ReactNode; classNames: string }
> = {
  Udemy: {
    text: 'Udemy',
    classNames: 'bg-purple-500',
  },
  Coursera: {
    text: 'Coursera',
    classNames: 'bg-blue-600',
  },
  Generated: {
    text: 'Generated',
    classNames: 'bg-sky-500',
  },
};

export const CourseTag: React.FC<TagProps> = ({ variant, className, ...props }) => {
  const { text, classNames } = VARIANT_MAP[variant];

  return (
    <span
      className={classNames + " rounded-3xl text-white text-xs font-bold px-3 py-0.5"}
      {...props}
    >
      {text}
    </span>
  );
};
