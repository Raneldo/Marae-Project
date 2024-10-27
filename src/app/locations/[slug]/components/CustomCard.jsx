import React from 'react'

const CustomCard = ({children, id, title }) => {
  return (
    <div id={id} className="flex flex-col gap-4">
    <h1 className="text-2xl font-bold text-secondary-foreground/[0.85] text-center px-12 py-4 w-full border rounded-lg bg-card shadow-md">{title}</h1>
    {children}
  </div>
  )
}

export default CustomCard