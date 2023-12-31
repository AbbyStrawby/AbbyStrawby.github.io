import {
    AppShell,
    Box,
    ColorSchemeScript,
    MantineProvider,
    SimpleGrid,
    Stack,
    Title,
    createTheme,
} from "@mantine/core";
import {
    ApplicationStateProvider,
    useConfig,
    useProject,
    useTheme,
} from "./components/ApplicationStateProvider";

import "./app.scss";
import { ListCategory } from "./components/ListCategory";
import { useMemo } from "react";
import { Carousel } from "@mantine/carousel";
import { CarouselSlide } from "./components/CarouselSlide";
import { useMediaQuery } from "@mantine/hooks";
import { ContactItem } from "./components/ContactItem";

function ApplicationBody() {
    const theme = useTheme();
    const config = useConfig();
    const [project, setProject] = useProject();

    const normalizedTheme = useMemo(() => createTheme(theme), [theme]);
    const mini = useMediaQuery("(max-width: 1000px)");

    return (
        <>
            <ColorSchemeScript defaultColorScheme="dark" />
            <MantineProvider defaultColorScheme="dark" theme={normalizedTheme}>
                <AppShell className="app-root" p={0}>
                    <Box
                        className="app-header"
                        style={
                            config.header.backdrop.type === "image"
                                ? {
                                      backgroundImage: `url("${config.header.backdrop.url}")`,
                                  }
                                : {
                                      backgroundColor:
                                          config.header.backdrop.color,
                                  }
                        }
                    >
                        <Box className="header-overlay">
                            <img
                                className="header-img"
                                src={config.header.image}
                            />
                            <Stack gap={"xs"} className="header-text">
                                <Title order={2}>{config.header.name}</Title>
                                <Title order={3}>
                                    {config.header.subheader}
                                </Title>
                            </Stack>
                            <Stack
                                className="contact-list"
                                gap={mini ? "sm" : "lg"}
                            >
                                {config.contact.map((c, i) => (
                                    <ContactItem key={i} config={c} />
                                ))}
                            </Stack>
                        </Box>
                    </Box>
                    <SimpleGrid
                        cols={{ xs: 1, md: 3 }}
                        spacing="xs"
                        verticalSpacing="sm"
                        p="xs"
                        style={{
                            marginTop: "8px",
                        }}
                        className="list-categories"
                    >
                        <ListCategory category="skills" />
                        <ListCategory category="experiences" />
                        <ListCategory category="education" />
                    </SimpleGrid>
                    <Box className="project-box" p="md">
                        <div
                            style={{
                                display: "flex",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <Carousel
                                slideGap={"md"}
                                loop
                                slideSize="75%"
                                onSlideChange={setProject}
                                height={"100%"}
                                style={{ flex: 1 }}
                                withIndicators={!mini}
                                className="project-spinner"
                            >
                                {config.projects.map((p, i) => (
                                    <CarouselSlide
                                        project={p}
                                        key={i}
                                        index={i}
                                        currentSlide={project[1]}
                                    />
                                ))}
                            </Carousel>
                        </div>
                    </Box>
                </AppShell>
            </MantineProvider>
        </>
    );
}

function App() {
    return (
        <ApplicationStateProvider>
            <ApplicationBody />
        </ApplicationStateProvider>
    );
}

export default App;
