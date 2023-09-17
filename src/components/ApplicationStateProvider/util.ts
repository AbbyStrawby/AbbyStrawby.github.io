import { createContext, useContext } from "react";
import { ApplicationStateContextType } from "../../types/state";
import { ConfigProject, ConfigRoot } from "../../types/config";
import { MantineThemeOverride } from "@mantine/core";

export const StateContext = createContext<ApplicationStateContextType>(
    null as any,
);

export function useConfig(): ConfigRoot {
    return useContext(StateContext).state.config;
}

export function useTheme(): MantineThemeOverride {
    return useContext(StateContext).state.generatedTheme;
}

export function useProject(): [
    [ConfigProject | null, number],
    (index: number) => ConfigProject | null,
] {
    const context = useContext(StateContext);
    if (context) {
        return [
            [
                context.state.selectedProject?.data ?? null,
                context.state.selectedProject?.index ?? -1,
            ],
            context.setProject,
        ];
    } else {
        return [[null, -1], () => null];
    }
}
