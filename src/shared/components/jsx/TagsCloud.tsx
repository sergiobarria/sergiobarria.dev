import {
	SiReact,
	SiHtml5,
	SiCss3,
	SiNextdotjs,
	SiTypescript,
	SiJavascript,
	SiTailwindcss,
	SiChakraui,
	SiNodedotjs,
	SiDart,
	SiVuedotjs,
	SiMongodb,
	SiPython,
	SiPostgresql,
	SiGo,
} from 'react-icons/si';

export function TagsCloud() {
	return (
		<div className="aspect-w-1 aspect-h-1 relative">
			<div className="w-full h-full absolute animate-[spin_60s_linear_infinite] border border-accent rounded-full">
				<SiHtml5 size={20} className="absolute -top-5 left-[50%] translate-x-[-50%] h-10" />
			</div>
			<div className="absolute rotate-180 w-full h-full">
				<div className="h-full w-full animate-[spin_60s_linear_infinite] rounded-full">
					<SiCss3 size={20} className="absolute -top-5 left-[50%] translate-x-[-50%] h-10" />
				</div>
			</div>
			<div className="absolute rotate-90 w-full h-full">
				<div className="h-full w-full animate-[spin_60s_linear_infinite] rounded-full">
					<SiPostgresql size={20} className="absolute -top-5 left-[50%] translate-x-[-50%] h-10" />
				</div>
			</div>
			<div className="absolute -rotate-90 w-full h-full">
				<div className="h-full w-full animate-[spin_60s_linear_infinite] rounded-full">
					<SiTypescript size={20} className="absolute -top-5 left-[50%] translate-x-[-50%] h-10" />
				</div>
			</div>

			{/* Circle 2 - 80% */}
			<div className="absolute rotate-45 w-[80%] h-[80%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
				<div className="h-full w-full animate-[spin_30s_linear_infinite] a border border-accent rounded-full">
					<SiNextdotjs size={20} className="absolute -top-5 left-[50%] translate-x-[-50%] h-10" />
				</div>
			</div>
			<div className="absolute rotate-[180deg] w-[80%] h-[80%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
				<div className="h-full w-full animate-[spin_30s_linear_infinite] rounded-full">
					<SiReact size={20} className="absolute -top-5 left-[50%] translate-x-[-50%] h-10" />
				</div>
			</div>
			<div className="absolute rotate-[270deg] w-[80%] h-[80%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
				<div className="h-full w-full animate-[spin_30s_linear_infinite] rounded-full">
					<SiMongodb size={20} className="absolute -top-5 left-[50%] translate-x-[-50%] h-10" />
				</div>
			</div>

			{/* Circle 3 - 60% */}
			<div className="absolute rotate-90 w-[60%] h-[60%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
				<div className="h-full w-full animate-[spin_18s_linear_infinite] border border-accent rounded-full">
					<SiNodedotjs size={20} className="absolute -top-5 left-[50%] translate-x-[-50%] h-10" />
				</div>
			</div>
			<div className="absolute rotate-[210deg] w-[60%] h-[60%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
				<div className="h-full w-full animate-[spin_18s_linear_infinite] rounded-full">
					<SiTailwindcss size={20} className="absolute -top-5 left-[50%] translate-x-[-50%] h-10" />
				</div>
			</div>
			<div className="absolute rotate-[330deg] w-[60%] h-[60%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
				<div className="h-full w-full animate-[spin_18s_linear_infinite] rounded-full">
					<SiChakraui size={20} className="absolute -top-5 left-[50%] translate-x-[-50%] h-10" />
				</div>
			</div>

			{/* Circle 4 - 40% */}
			<div className="absolute rotate-[120deg] w-[40%] h-[40%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
				<div className="h-full w-full animate-[spin_18s_linear_infinite] border border-accent rounded-full">
					<SiVuedotjs size={20} className="absolute -top-5 left-[50%] translate-x-[-50%] h-10" />
				</div>
			</div>
			<div className="absolute rotate-[300deg] w-[40%] h-[40%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
				<div className="h-full w-full animate-[spin_18s_linear_infinite] rounded-full">
					<SiPython size={20} className="absolute -top-5 left-[50%] translate-x-[-50%] h-10" />
				</div>
			</div>

			{/* Circle 5 - 20% */}
			<div className="absolute rotate-[120deg] w-[20%] h-[20%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
				<div className="h-full w-full animate-[spin_6s_linear_infinite] border border-accent rounded-full">
					<SiDart size={20} className="absolute -top-5 left-[50%] translate-x-[-50%] h-10" />
				</div>
			</div>
			<div className="absolute rotate-[300deg] w-[20%] h-[20%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
				<div className="h-full w-full animate-[spin_6s_linear_infinite] rounded-full">
					<SiGo size={20} className="absolute -top-5 left-[50%] translate-x-[-50%] h-10" />
				</div>
			</div>

			{/* Center */}
			<div className="absolute h-full w-full flex items-center justify-center animate-pulse">
				<SiJavascript size={20} className="h-10" />
			</div>
		</div>
	);
}
