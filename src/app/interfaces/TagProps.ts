import { TagVariant } from "../types/TagVariant";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: TagVariant;
  className?: string;
}