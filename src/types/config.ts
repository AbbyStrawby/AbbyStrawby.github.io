export type ConfigRoot = {
    header: ConfigHeader;
    skills: ConfigTag[];
    education: ConfigTag[];
    experiences: ConfigTag[];
    projects: ConfigProject[];
    themes: { [key: string]: ThemeConfig };
    defaultTheme: string;
};

export type ConfigTag =
    | string
    | {
          text: string;
          icon: string;
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
    tags: ConfigTag[];
    url?: string;
    image: string;
    description:
        | {
              type: "text";
              text: string;
          }
        | {
              type: "url";
              url: string;
          };
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
};
