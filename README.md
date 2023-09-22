# AbbyStrawby.github.io

## Deploying

Deploying the site to Github Pages is handled automatically on every push with a Github Actions workflow. To run locally, run `yarn && yarn dev` in the root folder.

## Configuration

Configuration is stored in `public/conf/root.json`. A JSON schema is provided in `doc/config.schema.json`, and should be automatically recognized if using VS Code.

A basic overview of the configuration options is as follows:

```json
{
    "header": {
        "name": "YOUR NAME",
        "subheader": "SHORT TEXT ABOUT YOU",
        "backdrop": {
            "type": "image",
            "url": "IMAGE URL"
        } OR {
            "type": "color",
            "color": "SOME HEX VALUE"
        },
        "image": "PROFILE IMAGE"
    },
    "education": ["STRING" OR ConfigTag],
    "experiences": ["STRING" OR ConfigTag],
    "skills": ["STRING" OR ConfigTag],
    "projects": [
        {
            "name": "PROJECT NAME",
            "description": {
                "type": "text",
                "text": "TEXT DESCRIPTION"
            } OR {
                "type": "url",
                "url": "MARKDOWN URL"
            },
            "tags": ["STRING" OR ConfigTag],
            "url": "OPTIONAL: PROJECT LINK",
            "image": "PROJECT IMAGE URL"
        }, ...
    ],
    "contact": [
        {
            "icon": "ICON NAME",
            "name": "CONTACT NAME",
            "link": "OPTIONAL: LINK",
            "value": "CONTACT VALUE"
        }, ...
    ],
    "themes": {
        "THEME NAME": {
            "conditions": {
                "project": "OPTIONAl: PROJECT NAME",
                "date": (OPTIONAL) {
                    "month": "MONTH #, 0-11",
                    "day": "OPTIONAL DAY #, 0+",
                    "hour": "OPTIONAL HOUR #, 0-23",
                    "minute": "OPTIONAL MINUTE #, 0-59"
                }
            },
            "colors": {
                "background": "HEX COLOR",
                "primary": "HEX COLOR",
                "accent": "HEX COLOR"
            }
        }, ...
    },
    "defaultTheme": "DEFAULT THEME NAME"
}
```

**ConfigTags:**

ConfigTags are a general model to represent a tag with a label and an icon. Their format is as follows:

```json
{
    "text": "SOME LABEL TEXT",
    "icon": "ICON NAME"
}
```

**Icons:**

All icons listed [here](https://react-icons.github.io/react-icons/) are supported. For example, a star icon from the Material Icons set would be called `MdStar`.

**Additional Files:** 

Other files, such as images or markdown files, can be placed in `public/conf` and are exposed on the frontend as `abbystrawby.github.io/conf/<file name>`. This can be used to, for example, place images in your markdown.

***Caveat: Site Icon/Favicon:*** The site's icon is not configurable through the config file. Instead, place the desired file (PNG format) in the `public` folder and rename it `icon.png`.

---

Made with ♥ by [Dax](https://github.com/iTecAI)

