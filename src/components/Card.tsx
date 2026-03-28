import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className = "" }: CardProps) => {
  return <div className={className}>{children}</div>;
};

export default Card;
