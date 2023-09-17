import { ReactNode, useEffect, useState } from "react";
import { ConfigRoot } from "../../types/config";
import { MantineThemeOverride } from "@mantine/core";
import { StateContext } from "./util";
import { lightness } from "simpler-color";
import { isArray } from "lodash";

function generateShades(color: string): string[] {
    return [10, 20, 30, 40, 50, 60, 70, 80, 90, 95].map((l) =>
        lightness(color, l),
    );
}

export function ApplicationStateProvider({
    children,
}: {
    children?: ReactNode | ReactNode[];
}) {
    const [selectedProject, setSelectedProject] = useState<number>(0);
    const [config, setConfig] = useState<ConfigRoot | null>(null);
    const [theme, setTheme] = useState<MantineThemeOverride>({});

    useEffect(() => {
        fetch("conf/root.json").then((result) => result.json().then(setConfig));
    }, []);

    useEffect(() => {
        if (config) {
            const currentDate = new Date(Date.now());
            const projectName = config.projects[selectedProject]?.name ?? null;
            let selectedTheme = config.themes[config.defaultTheme];

            for (const themeConfig of Object.values(config.themes)) {
                if (themeConfig.conditions.date) {
                    if (
                        themeConfig.conditions.date.month ===
                            currentDate.getMonth() &&
                        (!themeConfig.conditions.date.day ||
                            themeConfig.conditions.date.day ===
                                currentDate.getDate()) &&
                        (!themeConfig.conditions.date.hour ||
                            themeConfig.conditions.date.hour ===
                                currentDate.getHours()) &&
                        (!themeConfig.conditions.date.minute ||
                            themeConfig.conditions.date.minute ===
                                currentDate.getMinutes())
                    ) {
                        selectedTheme = themeConfig;
                        break;
                    }
                    continue;
                }

                if (themeConfig.conditions.project === projectName) {
                    selectedTheme = themeConfig;
                    break;
                }
            }

            setTheme({
                colors: {
                    gray: isArray(selectedTheme.colors.background)
                        ? (selectedTheme.colors.background as any)
                        : generateShades(selectedTheme.colors.background),
                    primary: isArray(selectedTheme.colors.primary)
                        ? (selectedTheme.colors.primary as any)
                        : generateShades(selectedTheme.colors.primary),
                    accent: isArray(selectedTheme.colors.accent)
                        ? (selectedTheme.colors.accent as any)
                        : generateShades(selectedTheme.colors.accent),
                },
                colorScheme: "dark",
                primaryColor: "primary",
            });
        }
    }, [selectedProject, config]);

    return config ? (
        <StateContext.Provider
            value={{
                state: {
                    config: config,
                    selectedProject: {
                        index: selectedProject,
                        data: config.projects[selectedProject] ?? null,
                    },
                    generatedTheme: theme,
                },
                setProject: (index) => {
                    setSelectedProject(index);
                    return config.projects[selectedProject] ?? null;
                },
            }}
        >
            {children}
        </StateContext.Provider>
    ) : (
        <></>
    );
}
