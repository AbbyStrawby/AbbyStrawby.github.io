import { Badge, Group, Paper } from "@mantine/core";
import { useConfig } from "./ApplicationStateProvider";
import { MdCheckCircle, MdExplore, MdSchool } from "react-icons/md";
import { isString } from "lodash";
import { GeneralIcon } from "./GeneralIcon";
import { useRef } from "react";

const metamap = {
    skills: {
        name: "Skills",
        icon: <MdCheckCircle size={24} />,
    },
    education: {
        name: "Education",
        icon: <MdSchool size={24} />,
    },
    experiences: {
        name: "Experience",
        icon: <MdExplore size={24} />,
    },
};

export function ListCategory({
    category,
}: {
    category: "skills" | "education" | "experiences";
}) {
    const config = useConfig();
    const scRef = useRef<HTMLDivElement>();

    const handleScroll = (event: any) => {
        const container = scRef.current;
        if (!container) {
            return;
        }
        const scrollAmount = event.deltaY;
        container.scrollTo({
            top: 0,
            left: container.scrollLeft - scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <Paper
            withBorder
            p="sm"
            radius="sm"
            shadow="sm"
            className="list-category"
            style={{ position: "relative", whiteSpace: "nowrap" }}
        >
            <Group gap="xs" wrap="nowrap">
                {metamap[category].icon}
                <Group
                    gap="xs"
                    wrap="nowrap"
                    className="item-list"
                    ref={scRef as any}
                    onWheel={handleScroll}
                >
                    {config[category].map((item, i) => (
                        <Badge
                            size="lg"
                            key={i}
                            style={{
                                zIndex: 2,
                                width: "fit-content",
                                display: "inline-block",
                            }}
                            variant="gradient"
                            fullWidth
                            gradient={{
                                deg: 90,
                                from: "primary.3",
                                to: "accent.3",
                            }}
                            className="list-item"
                        >
                            {isString(item) ? (
                                item
                            ) : (
                                <Group gap="sm">
                                    <GeneralIcon
                                        iconName={item.icon as any}
                                        size={18}
                                    />
                                    <span>{item.text}</span>
                                </Group>
                            )}
                        </Badge>
                    ))}
                </Group>
            </Group>
            <span
                className="list-name"
                style={{
                    position: "absolute",
                    top: "-12px",
                    right: "16px",
                    padding: "2px",
                    boxSizing: "border-box",
                    paddingRight: "4px",
                    paddingLeft: "4px",
                    backgroundColor: "var(--mantine-color-dark-7)",
                    userSelect: "none",
                    color: "#ffffffcc",
                    zIndex: 0,
                }}
            >
                {metamap[category].name}
            </span>
        </Paper>
    );
}
