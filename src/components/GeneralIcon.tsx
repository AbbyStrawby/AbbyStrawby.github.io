import { IconBaseProps } from "react-icons";
import { IconTypes, iconTypes } from "../types/iconTypes";

export function GeneralIcon({
    iconName,
    ...props
}: { iconName: IconTypes } & Partial<IconBaseProps>) {
    const Element = iconTypes[iconName];
    return <Element {...props} />;
}
