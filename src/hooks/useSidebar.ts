"use client";

import { useState } from "react";

const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen((prev) => !prev);

  return { isOpen, toggle };
};

export default useSidebar;
