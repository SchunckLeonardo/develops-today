import React, { forwardRef, ReactNode } from 'react'

type SelectInputProps = {
  id: string
  placeholder_select: string
  children: ReactNode
} & React.PropsWithChildren<React.ComponentPropsWithRef<'select'>>

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ id, placeholder_select, children, ...props }, ref) => {
    return (
      <select
        id={id}
        defaultValue="placeholder"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        {...props}
        ref={ref}
      >
        <option value="placeholder" disabled>
          {placeholder_select}
        </option>
        {children}
      </select>
    )
  },
)
