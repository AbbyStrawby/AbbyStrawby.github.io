import { Carousel } from "@mantine/carousel";
import { ConfigProject } from "../../types/config";
import {
    ActionIcon,
    Badge,
    Blockquote,
    Box,
    Group,
    Modal,
    Paper,
    Space,
    Stack,
    Text,
    Title,
    Tooltip,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import "./slide.scss";
import { MdLink } from "react-icons/md";
import { ReactNode, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function CarouselSlide({
    project,
    currentSlide,
    index,
}: {
    project: ConfigProject;
    currentSlide: number;
    index: number;
}) {
    const mini = useMediaQuery("(max-width: 1000px)");
    const [details, setDetails] = useState(false);

    const [desc, setDesc] = useState<ReactNode>(<></>);
    useEffect(() => {
        if (project.description.type === "text") {
            setDesc(<p>{project.description.text}</p>);
        } else {
            fetch(project.description.url).then((result) =>
                result
                    .text()
                    .then((md) =>
                        setDesc(
                            <ReactMarkdown
                                children={md}
                                remarkPlugins={[remarkGfm]}
                            />,
                        ),
                    ),
            );
        }
    }, [project.description.type]);

    return (
        <Carousel.Slide
            className="carousel-slide"
            style={{
                opacity: currentSlide === index ? 1 : 0.25,
                filter: currentSlide === index ? "none" : "blur(8px)",
            }}
        >
            <Paper
                radius={"md"}
                p="md"
                className={"slide-wrapper" + (mini ? " smol" : "")}
                onClick={() => {
                    if (mini) {
                        setDetails(true);
                    }
                }}
            >
                <img className="slide-bg" src={project.image} />
                <Box className={"slide-content" + (mini ? " mini" : "")}>
                    {mini ? (
                        <Stack className="main-content" gap="sm" align="center">
                            <Text className="project-name">{project.name}</Text>
                            <Group
                                gap="xs"
                                className="project-tags"
                                justify="center"
                            >
                                {project.tags.map((tag) => (
                                    <Badge
                                        color="accent.3"
                                        key={tag}
                                        className="tag"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </Group>
                        </Stack>
                    ) : (
                        <>
                            <Stack
                                className="main-content"
                                gap="sm"
                                align="left"
                            >
                                <Text className="project-name">
                                    {project.name}
                                </Text>
                                <Group
                                    gap="xs"
                                    className="project-tags"
                                    justify="center"
                                >
                                    {project.tags.map((tag) => (
                                        <Badge
                                            color="accent.3"
                                            key={tag}
                                            className="tag"
                                            size="lg"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </Group>
                                <Blockquote
                                    className="project-description"
                                    onClick={() => setDetails(true)}
                                >
                                    <div className="desc-renderer">{desc}</div>
                                </Blockquote>
                            </Stack>
                            <Space w="md" />
                            <img
                                className="project-image"
                                src={project.image}
                            />
                            {project.url && (
                                <Tooltip
                                    label="Project Site"
                                    position="right"
                                    color="gray"
                                >
                                    <ActionIcon
                                        className="project-url"
                                        size="xl"
                                        radius="xl"
                                        onClick={() =>
                                            window.open(project.url, "_blank")
                                        }
                                    >
                                        <MdLink size={24} />
                                    </ActionIcon>
                                </Tooltip>
                            )}
                        </>
                    )}
                </Box>
            </Paper>
            <Modal
                size="auto"
                title={
                    <Stack gap="sm">
                        <Title order={3}>{project.name}</Title>
                        <Group gap="xs" justify="left">
                            {project.tags.map((tag) => (
                                <Badge
                                    color="accent.3"
                                    key={tag}
                                    className="tag"
                                    size="lg"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </Group>
                        {mini && project.url && (
                            <a href={project.url}>Project Link</a>
                        )}
                    </Stack>
                }
                opened={details}
                onClose={() => setDetails(false)}
            >
                <div className="desc-renderer">{desc}</div>
            </Modal>
        </Carousel.Slide>
    );
}
