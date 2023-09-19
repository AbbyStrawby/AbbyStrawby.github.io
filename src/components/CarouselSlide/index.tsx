import { Carousel } from "@mantine/carousel";
import { ConfigProject } from "../../types/config";
import { Paper } from "@mantine/core";

export function CarouselSlide({
    project,
    currentSlide,
    index,
}: {
    project: ConfigProject;
    currentSlide: number;
    index: number;
}) {
    return (
        <Carousel.Slide
            className="carousel-slide"
            style={{
                opacity: currentSlide === index ? 1 : 0.25,
                transition: "opacity 0.25s",
                filter: currentSlide === index ? "none" : "blur(8px)",
            }}
        >
            <Paper
                style={{
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                }}
                radius={"md"}
                p="md"
            >
                <img
                    className="slide-bg"
                    style={{
                        filter: "opacity(25%) blur(4px)",
                        position: "absolute",
                        top: "50%",
                        left: "0px",
                        display: "inline-block",
                        width: "100%",
                        height: "auto",
                        transform: "translate(0, -50%)",
                        pointerEvents: "none",
                        userSelect: "none",
                    }}
                    src={project.image}
                />
            </Paper>
        </Carousel.Slide>
    );
}
