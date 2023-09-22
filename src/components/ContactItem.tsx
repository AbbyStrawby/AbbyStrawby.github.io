import {
    ActionIcon,
    Anchor,
    Group,
    HoverCard,
    Popover,
    Text,
} from "@mantine/core";
import { ContactConfig } from "../types/config";
import { GeneralIcon } from "./GeneralIcon";
import { useMediaQuery } from "@mantine/hooks";

export function ContactItem({ config }: { config: ContactConfig }) {
    const mini = useMediaQuery("(max-width: 1000px)");
    const Element = mini ? Popover : HoverCard;
    return (
        <Element position="right" withArrow>
            <Element.Target>
                <ActionIcon radius="xl" size={mini ? "md" : "xl"}>
                    <GeneralIcon
                        iconName={config.icon as any}
                        size={mini ? 16 : 24}
                    />
                </ActionIcon>
            </Element.Target>
            <Element.Dropdown>
                <Group gap="xs">
                    <Text fw={500}>{config.name}</Text>
                    {config.link ? (
                        <Anchor href={config.link} target="_blank">
                            {config.value}
                        </Anchor>
                    ) : (
                        <Text>{config.value}</Text>
                    )}
                </Group>
            </Element.Dropdown>
        </Element>
    );
}
