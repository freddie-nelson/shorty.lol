import seedrandom from "seedrandom";
import randomColor from "randomcolor";
import tinygradient from "tinygradient";

export default function GradientAvatar(props: { seed: string; className?: string }) {
  const random = seedrandom(props.seed);
  const count = Math.floor(random() * 2) + 2; // seeded random number from 2 to 3

  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    colors.push(randomColor({ seed: random().toString() }));
  }

  const gradient = tinygradient(...colors);

  return (
    <div
      className={`rounded-xl filter saturate-[1.25] ${props.className}`}
      style={{ background: gradient.css("linear", "to bottom right") }}
    ></div>
  );
}
