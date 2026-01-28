import React from "react";

export default function Button({ children, href, icon: Icon, primary, ...rest }) {
  const baseClasses =
    "inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300";
  const styles = primary
    ? "bg-white text-black hover:bg-neutral-200"
    : "bg-neutral-800 text-white hover:bg-neutral-700";

  const className = `${baseClasses} ${styles}`;

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
        {Icon && <Icon size={18} />}
      </a>
    );
  }

  return (
    <button className={className} {...rest}>
      {children}
      {Icon && <Icon size={18} />}
    </button>
  );
}
