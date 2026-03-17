// bounded
export type BoundedProps = {
  children: React.ReactNode;
  className?: string;
  isPaded?: boolean;
  as?: React.ElementType;
};

// Submit Button
export type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
};

// CTA
export type CTAProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
};
