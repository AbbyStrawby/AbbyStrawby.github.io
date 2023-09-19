import { Badge, Group, Paper } from "@mantine/core";
import { useConfig } from "./ApplicationStateProvider";
import { MdCheckCircle, MdExplore, MdSchool } from "react-icons/md";

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

    return (
        <Paper
            withBorder
            p="sm"
            radius="sm"
            shadow="sm"
            className="list-category"
            style={{ position: "relative" }}
        >
            <Group gap="xs">
                {metamap[category].icon}
                {config[category].map((item, i) => (
                    <Badge
                        size="lg"
                        key={i}
                        style={{
                            paddingTop: "4px",
                        }}
                        variant="gradient"
                        gradient={{
                            deg: 90,
                            from: "primary.3",
                            to: "accent.3",
                        }}
                    >
                        {item}
                    </Badge>
                ))}
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
                    opacity: 0.8,
                }}
            >
                {metamap[category].name}
            </span>
        </Paper>
    );
}
