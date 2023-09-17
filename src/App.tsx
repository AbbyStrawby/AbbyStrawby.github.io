import { MantineProvider } from "@mantine/core";
import {
    ApplicationStateProvider,
    useTheme,
} from "./components/ApplicationStateProvider";

function ApplicationBody() {
    const theme = useTheme();
    return (
        <MantineProvider
            withCSSVariables
            withGlobalStyles
            withNormalizeCSS
            theme={theme}
        >
            <></>
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