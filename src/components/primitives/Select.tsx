
import React from 'react';

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }

export const Select: React.FC<Props> = ({ label, ...props }) => {
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      {label && <span>{label}</span>}
      <select className="border rounded-md px-2 py-1" {...props} />
    </label>
  )
}
