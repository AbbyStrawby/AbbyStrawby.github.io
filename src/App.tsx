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
    useTheme,
} from "./components/ApplicationStateProvider";

import "./app.scss";
import { ListCategory } from "./components/ListCategory";
import { useMemo } from "react";

function ApplicationBody() {
    const theme = useTheme();
    const config = useConfig();

    const normalizedTheme = useMemo(() => createTheme(theme), [theme]);
    console.log(normalizedTheme);

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
                        </Box>
                    </Box>
                    <SimpleGrid
                        cols={{ xs: 1, md: 3 }}
                        spacing="xs"
                        verticalSpacing="sm"
                        p="xs"
                        style={{ marginTop: "-8px" }}
                    >
                        <ListCategory category="skills" />
                        <ListCategory category="experiences" />
                        <ListCategory category="education" />
                    </SimpleGrid>
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
