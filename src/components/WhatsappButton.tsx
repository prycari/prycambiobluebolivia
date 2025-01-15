import { FC } from "react"
import { Button, ButtonProps } from "@mui/material"

export type WhatsappButtonProps = {
    message: string
    phoneNumber: string
} & ButtonProps

export const WhatsappButton: FC<WhatsappButtonProps> = ({
    message,
    children,
    phoneNumber,
    ...props
}) => {
    const handleClick = () => {
        const encodedMessage = encodeURIComponent(message)
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

        window.open(whatsappUrl, '_blank')
    }

    return (
        <Button
            variant="contained"
            onClick={handleClick}
            className="flex items-center"
            {...props}
        >
            {children}
        </Button>
    )
}