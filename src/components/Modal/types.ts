type useModalProps = {
  status: boolean;
  title?: string | React.ReactNode;
  message?: string | React.ReactNode;
  children?: React.ReactNode;
};

export type useModalType = useModalProps & {
  setValue: ({ status, title, message, children }: useModalProps) => void;
};
