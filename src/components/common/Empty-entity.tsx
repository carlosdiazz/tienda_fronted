import React from 'react'
import { Card, CardContent } from '../ui'
import {
  CodeIcon
} from "@radix-ui/react-icons"


interface Props {
  title: string;
  subTitle: string;
}

export const EmptyEntity = ({title, subTitle}:Props) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <CodeIcon className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">{ title}</h2>
        <p className="text-muted-foreground">
          {subTitle}
        </p>
      </CardContent>
    </Card>
  )
}
