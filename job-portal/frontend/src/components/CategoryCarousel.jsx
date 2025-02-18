import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "UX/UI Designer",
  "Product Manager",
  "Full-Stack Developer",
  "Data Scientist",
  "AI/ML Engineer",
  "Cybersecurity Engineer",
  "UX/UI Designer",
  "Product Manager",
  "Full-Stack Developer",
  "Data Scientist",
  "AI/ML Engineer",
  "Cybersecurity Engineer",
  "UX/UI Designer",
];

export default function CategoryCarousel() {
  return (
    <div className="max-w-7xl mx-auto">
      <Carousel className="w-full max-w-xl mx-auto my-12">
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:h-1/3">
              <Button variant="outline" className="rounded-full w-full">
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
