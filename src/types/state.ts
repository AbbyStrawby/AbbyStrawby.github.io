import { MantineThemeOverride } from "@mantine/core";
import { ConfigProject, ConfigRoot } from "./config";

export type ApplicationState = {
    config: ConfigRoot;
    selectedProject: {
        index: number;
        data: ConfigProject;
    } | null;
    generatedTheme: MantineThemeOverride;
};

export type ApplicationStateContextType = {
    state: ApplicationState;
    setProject: (index: number) => ConfigProject | null;
};
