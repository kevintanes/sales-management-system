interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const PageHeader = ({ title, action, description }: PageHeaderProps) => {
  return (
    <div className="mb-8 flex justify-between">
      <div>
        <h1 className="text-foreground font-outfit text-3xl font-bold">
          {title}
        </h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      {action && <div className="flex items-end gap-3">{action}</div>}
    </div>
  );
};

export default PageHeader;
