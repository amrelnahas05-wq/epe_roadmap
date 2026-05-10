import { useState } from "react";
import { ChevronDown, ChevronRight, BookOpen, GraduationCap, Wrench, Zap } from "lucide-react";

const semesters = [
  {
    id: 1,
    label: "Semester 1",
    season: "Fall",
    color: "from-blue-600 to-blue-500",
    border: "border-blue-500",
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-800",
    courses: [
      { code: "MTHG001", name: "Calculus 1" },
      { code: "MTHG002", name: "Algebra" },
      { code: "PHYG001", name: "Mechanical Properties of Matter and Thermodynamics" },
      { code: "EMCG001", name: "Engineering Mechanics - Statics" },
      { code: "INTG005", name: "Introduction to Computer Science" },
      { code: "INTG001", name: "Technical Drawing" },
      { code: "GENG002", name: "Occupational Health & Safety" },
    ],
  },
  {
    id: 2,
    label: "Semester 2",
    season: "Spring",
    color: "from-emerald-600 to-emerald-500",
    border: "border-emerald-500",
    bg: "bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-800",
    courses: [
      { code: "MTHG003", name: "Calculus 2" },
      { code: "PHYG002", name: "Electricity and Magnetism" },
      { code: "EMCG002", name: "Engineering Mechanics - Dynamics" },
      { code: "CHMG001", name: "Chemistry for Engineers" },
      { code: "ENGG001", name: "Applied and Modern Manufacturing Engineering" },
      { code: "GENG003", name: "Societal Issues" },
    ],
  },
  {
    id: 3,
    label: "Semester 3",
    season: "Fall",
    color: "from-blue-700 to-blue-600",
    border: "border-blue-600",
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-800",
    courses: [
      { code: "MTHG104", name: "Differential Equations" },
      { code: "EECG118", name: "Electronics" },
      { code: "EPEG101", name: "Electrical Circuits (1)" },
      { code: "EPEG102", name: "Principles of Energy Conversion" },
      { code: "EPEG103", name: "Computer Applications in Electrical Power Systems" },
      { code: "GENG004", name: "Dynamics of Rigid Bodies" },
    ],
  },
  {
    id: 4,
    label: "Semester 4",
    season: "Spring",
    color: "from-teal-600 to-teal-500",
    border: "border-teal-500",
    bg: "bg-teal-50",
    badge: "bg-teal-100 text-teal-800",
    courses: [
      { code: "MTHG102", name: "Linear Algebra and Multivariable Integrals" },
      { code: "EPEG104", name: "Electromagnetic Fields" },
      { code: "EPEG105", name: "Electrical Circuits (2)" },
      { code: "EPEG106", name: "Logic Circuits and Microprocessors" },
      { code: "INTLxxx", name: "Electric Materials" },
      { code: "GENGxxx", name: "Selected Topics 1" },
    ],
  },
  {
    id: 5,
    label: "Semester 5",
    season: "Fall",
    color: "from-indigo-700 to-indigo-600",
    border: "border-indigo-600",
    bg: "bg-indigo-50",
    badge: "bg-indigo-100 text-indigo-800",
    courses: [
      { code: "CVEG118", name: "Civil Engineering" },
      { code: "MTHG110", name: "Introduction to Numerical Analysis" },
      { code: "EPEG204", name: "Signals and Systems" },
      { code: "MEPG173", name: "Engineering Thermodynamics" },
      { code: "MOPG102", name: "Fundamentals of Mechanical Design" },
      { code: "EPEG202", name: "Electrical Machines (1)" },
    ],
  },
  {
    id: 6,
    label: "Semester 6",
    season: "Spring",
    color: "from-cyan-600 to-cyan-500",
    border: "border-cyan-500",
    bg: "bg-cyan-50",
    badge: "bg-cyan-100 text-cyan-800",
    courses: [
      { code: "EPEG201", name: "Power Systems (1)" },
      { code: "CMPG218", name: "Data Structure" },
      { code: "EPEG203", name: "Electric and Electronic Measurements" },
      { code: "EPEG207", name: "Automatic Control Systems" },
      { code: "EPEG205", name: "Electrical Machines (2)" },
      { code: "MTHG113", name: "Probability and Statistics" },
      { code: "SUMMER", name: "Industrial Training 1 (Summer)", special: true },
    ],
  },
  {
    id: 7,
    label: "Semester 7",
    season: "Fall",
    color: "from-violet-700 to-violet-600",
    border: "border-violet-600",
    bg: "bg-violet-50",
    badge: "bg-violet-100 text-violet-800",
    courses: [
      { code: "EPEG301", name: "Power Systems (2)" },
      { code: "EPEG304", name: "Switchgear and Protection Systems" },
      { code: "EPEG206", name: "Electrical Power Generation" },
      { code: "EPEG302", name: "Power Electronics (1)" },
      { code: "EPEG303", name: "Electrical Machines (3)" },
      { code: "GENG151", name: "Selected Current Local Issues" },
    ],
  },
  {
    id: 8,
    label: "Semester 8",
    season: "Spring",
    color: "from-sky-600 to-sky-500",
    border: "border-sky-500",
    bg: "bg-sky-50",
    badge: "bg-sky-100 text-sky-800",
    courses: [
      { code: "EECG318", name: "Electrical Communications Systems" },
      { code: "EPEG305", name: "High Voltage Engineering" },
      { code: "EPEG306", name: "Power Electronics (2)" },
      { code: "EPEG307", name: "Digital Control Systems" },
      { code: "GENGxxx", name: "UR Restricted Elective 1", elective: true },
      { code: "GENGxxx", name: "UR Restricted Elective 2", elective: true },
    ],
  },
  {
    id: 9,
    label: "Semester 9",
    season: "Fall",
    color: "from-purple-700 to-purple-600",
    border: "border-purple-600",
    bg: "bg-purple-50",
    badge: "bg-purple-100 text-purple-800",
    courses: [
      { code: "EPEG401", name: "Electrical Energy Utilization and Management" },
      { code: "EPEG4XX", name: "Elective Course (1)", elective: true },
      { code: "EPEG4XX", name: "Elective Course (2)", elective: true },
      { code: "EPEG4XX", name: "Elective Course (3)", elective: true },
      { code: "EPEG481", name: "Graduation Project (1)", special: true },
      { code: "GENGxxx", name: "Free Elective", elective: true },
    ],
  },
  {
    id: 10,
    label: "Semester 10",
    season: "Spring",
    color: "from-rose-600 to-rose-500",
    border: "border-rose-500",
    bg: "bg-rose-50",
    badge: "bg-rose-100 text-rose-800",
    courses: [
      { code: "EPEG403", name: "Electrical Installations" },
      { code: "EPEG4XX", name: "Elective Course (4)", elective: true },
      { code: "EPEG4XX", name: "Elective Course (5)", elective: true },
      { code: "EPEG4XX", name: "Elective Course (6)", elective: true },
      { code: "EPEG482", name: "Graduation Project (2)", special: true },
    ],
  },
];

function SemesterCard({ semester, isOpen, onToggle }: {
  semester: typeof semesters[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`flex-shrink-0 rounded-xl border-2 ${semester.border} shadow-md transition-all duration-300 overflow-hidden bg-white`}
      style={{ minWidth: isOpen ? "220px" : "80px", maxWidth: isOpen ? "240px" : "80px" }}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-2 p-3 bg-gradient-to-r ${semester.color} text-white font-bold transition-all duration-200 hover:opacity-90 focus:outline-none`}
      >
        {isOpen ? (
          <>
            <ChevronDown className="w-4 h-4 flex-shrink-0" />
            <div className="text-left min-w-0">
              <div className="text-sm font-bold leading-tight truncate">{semester.label}</div>
              <div className="text-xs opacity-80 leading-tight">{semester.season}</div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center w-full py-2 gap-1">
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <div
              className="text-xs font-bold whitespace-nowrap"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", lineHeight: 1.2 }}
            >
              {semester.label} · {semester.season}
            </div>
          </div>
        )}
      </button>

      {isOpen && (
        <div className={`p-2 ${semester.bg} flex flex-col gap-1.5`}>
          {semester.courses.map((course, i) => (
            <div
              key={i}
              className={`rounded-lg px-2 py-2 text-left transition-all duration-150 hover:shadow-sm
                ${course.special
                  ? "bg-amber-100 border border-amber-300"
                  : course.elective
                  ? "bg-gray-100 border border-gray-300"
                  : "bg-white border border-gray-200"
                }`}
            >
              <div className={`text-[10px] font-bold tracking-wide mb-0.5 ${semester.badge} inline-block rounded px-1 py-0.5`}>
                {course.code}
              </div>
              <div className="text-[11px] text-gray-700 leading-tight font-medium">{course.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [openSemesters, setOpenSemesters] = useState<Set<number>>(
    new Set(semesters.map((s) => s.id))
  );

  const toggleSemester = (id: number) => {
    setOpenSemesters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allOpen = openSemesters.size === semesters.length;

  const toggleAll = () => {
    if (allOpen) setOpenSemesters(new Set());
    else setOpenSemesters(new Set(semesters.map((s) => s.id)));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white border-b border-gray-200 shadow-sm px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-blue-700 text-white rounded-xl p-2.5">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">Electrical Power Engineering Program</h1>
              <p className="text-sm text-gray-500">Cairo University · Faculty of Engineering · Course Map 2023 · 10 Semesters</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded bg-white border border-gray-300"></span> Core
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded bg-gray-100 border border-gray-300"></span> Elective
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded bg-amber-100 border border-amber-300"></span> Milestone
              </span>
            </div>
            <button
              onClick={toggleAll}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors"
            >
              {allOpen ? "Collapse All" : "Expand All"}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-3 items-start h-full" style={{ minWidth: "max-content" }}>
          {semesters.map((semester) => (
            <SemesterCard
              key={semester.id}
              semester={semester}
              isOpen={openSemesters.has(semester.id)}
              onToggle={() => toggleSemester(semester.id)}
            />
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 px-6 py-2 text-center text-xs text-gray-400 flex-shrink-0">
        EPE Program · Alternative 1 · 10 Semesters · {semesters.reduce((acc, s) => acc + s.courses.length, 0)} courses total
      </footer>
    </div>
  );
}
