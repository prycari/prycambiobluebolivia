import { FC } from "react"

export type ShowProps = {
    when: boolean
    children: React.ReactNode
    default?: React.ReactNode
}

export const Show: FC<ShowProps> = ({
    when,
    children,
    default: defaultContent
}) => {
    return <>{when ? children : defaultContent}</>
}