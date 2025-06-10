export type TagVariant = 'udemy' | 'coursera' | 'generated';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: TagVariant;
  className?: string;
}