import { AppShell, Box, MantineProvider, Stack, Title } from "@mantine/core";
import {
    ApplicationStateProvider,
    useConfig,
    useTheme,
} from "./components/ApplicationStateProvider";

import "./app.scss";

function ApplicationBody() {
    const theme = useTheme();
    const config = useConfig();
    return (
        <MantineProvider
            withCSSVariables
            withGlobalStyles
            withNormalizeCSS
            theme={theme}
        >
            <AppShell className="app-root" p={0}>
                <Box
                    className="app-header"
                    style={
                        config.header.backdrop.type === "image"
                            ? {
                                  backgroundImage: `url("${config.header.backdrop.url}")`,
                              }
                            : {
                                  backgroundColor: config.header.backdrop.color,
                              }
                    }
                >
                    <Box className="header-overlay">
                        <img className="header-img" src={config.header.image} />
                        <Stack spacing={"xs"} className="header-text">
                            <Title order={2}>{config.header.name}</Title>
                            <Title order={3}>{config.header.subheader}</Title>
                        </Stack>
                    </Box>
                </Box>
            </AppShell>
        </MantineProvider>
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
