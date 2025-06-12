import { TagVariant } from "./CourseTag.types";
import { TagProps } from "./CourseTag.types";

const VARIANT_MAP: Record<
  TagVariant,
  { text: string; classNames: string }
> = {
  udemy: {
    text: 'Udemy',
    classNames: 'bg-purple-500',
  },
  coursera: {
    text: 'Coursera',
    classNames: 'bg-blue-600',
  },
  generated: {
    text: 'Generated',
    classNames: 'bg-sky-500',
  },
};

export const CourseTag: React.FC<TagProps> = ({ variant, className = "", ...props }) => {
  const { text, classNames } = VARIANT_MAP[variant];

  return (
    <span
      className={classNames + " rounded-3xl text-white text-xs font-bold px-3 py-0.5" + ` ${className}`}
      {...props}
    >
      {text}
    </span>
  );
};
