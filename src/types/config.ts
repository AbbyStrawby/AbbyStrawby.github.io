export type ConfigRoot = {
    header: {
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
    skills: string[];
    education: string[];
    experiences: string[];
    projects: ConfigProject[];
    palette: {
        background: string;
        primary: string;
        accent: string;
    };
};

export type ConfigProject = {
    name: string;
    description: string;
    tags: string[];
    url?: string;
    image: string;
    accentColor?: string;
};
