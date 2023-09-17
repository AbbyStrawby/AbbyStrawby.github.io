export type ConfigRoot = {
    header: ConfigHeader;
    skills: string[];
    education: string[];
    experiences: string[];
    projects: ConfigProject[];
    themes: { [key: string]: ThemeConfig };
    defaultTheme: string;
};

export type ConfigHeader = {
    name: string; // Name (ie Abby)
    subheader: string; // Information to write under name
    image: string; // URI to header profile image
    backdrop:
        | {
              type: "image";
              url: string;
          }
        | {
              type: "color";
              color: string;
          };
};

export type ConfigProject = {
    name: string;
    description: string;
    tags: string[];
    url?: string;
    image: string;
};

export type ThemeOverride =
    | {
          type: "color";
          color: string;
      }
    | {
          type: "gradient";
          colors: string[];
      }
    | {
          type: "image";
          url: string;
      };

export type ThemeConfig = {
    conditions: {
        date?: {
            month: number;
            day?: number;
            hour?: number;
            minute?: number;
        };
        project?: string;
    };
    colors: {
        background: string | string[];
        primary: string | string[];
        accent: string | string[];
    };
    backgroundImage?: string;
    overrides?: Partial<{
        banner: ThemeOverride;
        footer: ThemeOverride;
        carousel: ThemeOverride;
    }>;
};
