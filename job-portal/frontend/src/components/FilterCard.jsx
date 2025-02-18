import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const filterData = [
  {
    filterType: "Location",
    array: [
      "New Delhi",
      "Gurugram",
      "Nodia",
      "Banglore",
      "Pune",
      "Mumbai",
      "Chennai",
      "Hyderabad",
      "Kolkata",
      "Mohali",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Data Scientist",
      "Machine Learning Engineer",
      "AI Engineer",
      "Product Manager",
      "UX/UI Designer",
      "Tester",
      "Project Manager",
      "Architect",
      "Business Analyst",
      "Data Analyst",
      "Content Writer",
      "Content Editor",
      "Marketing Manager",
      "Copywriter",
    ],
  },
  {
    filterType: "Salary",
    array: ["10k - 20k", "20k - 30k", "30k - 40k", "40k - 50k", "50k+"],
  },
];

export default function FilterCard() {
  return (
    <div className="">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="my-3" />
      <RadioGroup>
        {filterData.map((item, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg">{item.filterType}</h1>
            <hr className="my-3" />
            {item.array.map((data, index) => {
              return (
                <div key={index} className="flex gap-3 my-2 items-center">
                  <RadioGroupItem value={data} />
                  <Label className="cursor-pointer">{data}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
