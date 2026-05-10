import { useState } from "react";
import { ChevronDown, ChevronRight, Zap, Lock, ArrowRight } from "lucide-react";

type Course = {
  code: string;
  name: string;
  elective?: boolean;
  special?: boolean;
  prereqs?: string[];
  unlocks?: string[];
};

const allCourses: Course[] = [
  // Semester 1
  { code: "MTHG001", name: "Calculus 1" },
  { code: "MTHG002", name: "Algebra" },
  { code: "PHYG001", name: "Mechanical Properties of Matter & Thermodynamics", unlocks: ["EECG118", "MEPG173"] },
  { code: "EMCG001", name: "Engineering Mechanics - Statics", unlocks: ["EMCG101", "CVEG118"] },
  { code: "INTG005", name: "Introduction to Computer Science", unlocks: ["CMPG218", "EPEG103"] },
  { code: "INTG001", name: "Technical Drawing" },
  { code: "GENG002", name: "Occupational Health & Safety" },
  // Semester 2
  { code: "MTHG003", name: "Calculus 2", unlocks: ["EPEG101", "EPEG102", "EECG318"] },
  { code: "PHYG002", name: "Electricity and Magnetism", unlocks: ["EPEG101", "EPEG102", "EPEG104", "INTLxxx"] },
  { code: "EMCG002", name: "Engineering Mechanics - Dynamics" },
  { code: "CHMG001", name: "Chemistry for Engineers" },
  { code: "ENGG001", name: "Applied and Modern Manufacturing Engineering" },
  { code: "GENG003", name: "Societal Issues" },
  // Semester 3
  { code: "MTHG104", name: "Differential Equations", prereqs: [], unlocks: ["EPEG104", "EPEG105", "EPEG204"] },
  { code: "EECG118", name: "Electronics", prereqs: ["PHYG001"], unlocks: ["EPEG106", "EPEG203", "EPEG302"] },
  { code: "EPEG101", name: "Electrical Circuits (1)", prereqs: ["PHYG002", "MTHG003"], unlocks: ["EPEG105", "EPEG203", "EPEG204", "EPEG206"] },
  { code: "EPEG102", name: "Principles of Energy Conversion", prereqs: ["PHYG002", "MTHG003"] },
  { code: "EPEG103", name: "Computer Applications in Electrical Power Systems", prereqs: ["INTG005"], unlocks: ["EPEG106"] },
  { code: "EMCG101", name: "Dynamics of Rigid Bodies", prereqs: ["EMCG001"], unlocks: ["MOPG102"] },
  // Semester 4
  { code: "MTHG102", name: "Linear Algebra and Multivariable Integrals" },
  { code: "EPEG104", name: "Electromagnetic Fields", prereqs: ["PHYG002", "MTHG104"], unlocks: ["EPEG202"] },
  { code: "EPEG105", name: "Electrical Circuits (2)", prereqs: ["MTHG104", "EPEG101"], unlocks: ["EPEG201", "EPEG202", "EPEG302"] },
  { code: "EPEG106", name: "Logic Circuits and Microprocessors", prereqs: ["EPEG103", "EECG118"] },
  { code: "INTLxxx", name: "Electric Materials", prereqs: ["PHYG002"] },
  { code: "GENGxxx_1", name: "Selected Topics 1" },
  // Semester 5
  { code: "CVEG118", name: "Civil Engineering", prereqs: ["EMCG001"] },
  { code: "MTHG110", name: "Introduction to Numerical Analysis", unlocks: ["EPEG301"] },
  { code: "EPEG204", name: "Signals and Systems", prereqs: ["MTHG104", "EPEG101"], unlocks: ["EPEG207", "EECG318"] },
  { code: "MEPG173", name: "Engineering Thermodynamics", prereqs: ["PHYG001"], unlocks: ["EPEG206"] },
  { code: "MOPG102", name: "Fundamentals of Mechanical Design", prereqs: ["EMCG101"] },
  { code: "EPEG202", name: "Electrical Machines (1)", prereqs: ["EPEG105", "EPEG104"], unlocks: ["EPEG201", "EPEG205"] },
  // Semester 6
  { code: "EPEG201", name: "Power Systems (1)", prereqs: ["EPEG105", "EPEG202"], unlocks: ["EPEG301", "EPEG304"] },
  { code: "CMPG218", name: "Data Structures", prereqs: ["INTG005"] },
  { code: "EPEG203", name: "Electric and Electronic Measurements", prereqs: ["EPEG101", "EECG118"], unlocks: ["EPEG304", "EPEG305"] },
  { code: "EPEG207", name: "Automatic Control Systems", prereqs: ["EPEG204"], unlocks: ["EPEG307"] },
  { code: "EPEG205", name: "Electrical Machines (2)", prereqs: ["EPEG202"], unlocks: ["EPEG303", "EPEG401", "EPEG402"] },
  { code: "MTHG113", name: "Probability and Statistics" },
  { code: "SUMMER", name: "Industrial Training 1 (Summer)", special: true },
  // Semester 7
  { code: "EPEG301", name: "Power Systems (2)", prereqs: ["EPEG201", "MTHG110"], unlocks: ["Electives: EPEG411–418"] },
  { code: "EPEG304", name: "Switchgear and Protection Systems", prereqs: ["EPEG201", "EPEG203"], unlocks: ["EPEG402", "Electives: EPEG433–434"] },
  { code: "EPEG206", name: "Electrical Power Generation", prereqs: ["EPEG101", "MEPG173"] },
  { code: "EPEG302", name: "Power Electronics (1)", prereqs: ["EECG118", "EPEG105"], unlocks: ["EPEG306"] },
  { code: "EPEG303", name: "Electrical Machines (3)", prereqs: ["EPEG205"], unlocks: ["Electives: EPEG424–429"] },
  { code: "GENG151", name: "Selected Current Local Issues" },
  // Semester 8
  { code: "EECG318", name: "Electrical Communications Systems", prereqs: ["MTHG003", "EPEG204"] },
  { code: "EPEG305", name: "High Voltage Engineering", prereqs: ["EPEG203"], unlocks: ["Electives: EPEG430–432"] },
  { code: "EPEG306", name: "Power Electronics (2)", prereqs: ["EPEG302"], unlocks: ["EPEG401", "Electives: EPEG435–438"] },
  { code: "EPEG307", name: "Digital Control Systems", prereqs: ["EPEG207"], unlocks: ["Electives: EPEG419–423"] },
  { code: "GENGxxx_re1", name: "UR Restricted Elective 1", elective: true },
  { code: "GENGxxx_re2", name: "UR Restricted Elective 2", elective: true },
  // Semester 9
  { code: "EPEG401", name: "Electrical Energy Utilization and Management", prereqs: ["EPEG205", "EPEG306"] },
  { code: "EPEG4XX_1", name: "Elective Course (1)", elective: true, prereqs: ["EPEG301 / EPEG303 / EPEG304 / EPEG305 / EPEG306 / EPEG307"] },
  { code: "EPEG4XX_2", name: "Elective Course (2)", elective: true, prereqs: ["EPEG301 / EPEG303 / EPEG304 / EPEG305 / EPEG306 / EPEG307"] },
  { code: "EPEG4XX_3", name: "Elective Course (3)", elective: true, prereqs: ["EPEG301 / EPEG303 / EPEG304 / EPEG305 / EPEG306 / EPEG307"] },
  { code: "EPEG480", name: "Graduation Project (1)", special: true, prereqs: ["110 Credit Hours + All Sophomore courses"], unlocks: ["EPEG481"] },
  { code: "GENGxxx_fe", name: "Free Elective", elective: true },
  // Semester 10
  { code: "EPEG402", name: "Electrical Installations", prereqs: ["EPEG304", "EPEG205"] },
  { code: "EPEG4XX_4", name: "Elective Course (4)", elective: true, prereqs: ["EPEG301 / EPEG303 / EPEG304 / EPEG305 / EPEG306 / EPEG307"] },
  { code: "EPEG4XX_5", name: "Elective Course (5)", elective: true, prereqs: ["EPEG301 / EPEG303 / EPEG304 / EPEG305 / EPEG306 / EPEG307"] },
  { code: "EPEG4XX_6", name: "Elective Course (6)", elective: true, prereqs: ["EPEG301 / EPEG303 / EPEG304 / EPEG305 / EPEG306 / EPEG307"] },
  { code: "EPEG481", name: "Graduation Project (2)", special: true, prereqs: ["EPEG480"] },
];

const semesters = [
  {
    id: 1, label: "Semester 1", season: "Fall",
    color: "from-blue-700 to-blue-500", border: "border-blue-500", bg: "bg-blue-50", badge: "bg-blue-100 text-blue-800",
    courseCodes: ["MTHG001","MTHG002","PHYG001","EMCG001","INTG005","INTG001","GENG002"],
  },
  {
    id: 2, label: "Semester 2", season: "Spring",
    color: "from-emerald-600 to-emerald-400", border: "border-emerald-500", bg: "bg-emerald-50", badge: "bg-emerald-100 text-emerald-800",
    courseCodes: ["MTHG003","PHYG002","EMCG002","CHMG001","ENGG001","GENG003"],
  },
  {
    id: 3, label: "Semester 3", season: "Fall",
    color: "from-blue-800 to-blue-600", border: "border-blue-700", bg: "bg-blue-50", badge: "bg-blue-200 text-blue-900",
    courseCodes: ["MTHG104","EECG118","EPEG101","EPEG102","EPEG103","EMCG101"],
  },
  {
    id: 4, label: "Semester 4", season: "Spring",
    color: "from-teal-600 to-teal-400", border: "border-teal-500", bg: "bg-teal-50", badge: "bg-teal-100 text-teal-800",
    courseCodes: ["MTHG102","EPEG104","EPEG105","EPEG106","INTLxxx","GENGxxx_1"],
  },
  {
    id: 5, label: "Semester 5", season: "Fall",
    color: "from-indigo-700 to-indigo-500", border: "border-indigo-600", bg: "bg-indigo-50", badge: "bg-indigo-100 text-indigo-800",
    courseCodes: ["CVEG118","MTHG110","EPEG204","MEPG173","MOPG102","EPEG202"],
  },
  {
    id: 6, label: "Semester 6", season: "Spring",
    color: "from-cyan-600 to-cyan-400", border: "border-cyan-500", bg: "bg-cyan-50", badge: "bg-cyan-100 text-cyan-800",
    courseCodes: ["EPEG201","CMPG218","EPEG203","EPEG207","EPEG205","MTHG113","SUMMER"],
  },
  {
    id: 7, label: "Semester 7", season: "Fall",
    color: "from-violet-700 to-violet-500", border: "border-violet-600", bg: "bg-violet-50", badge: "bg-violet-100 text-violet-800",
    courseCodes: ["EPEG301","EPEG304","EPEG206","EPEG302","EPEG303","GENG151"],
  },
  {
    id: 8, label: "Semester 8", season: "Spring",
    color: "from-sky-600 to-sky-400", border: "border-sky-500", bg: "bg-sky-50", badge: "bg-sky-100 text-sky-800",
    courseCodes: ["EECG318","EPEG305","EPEG306","EPEG307","GENGxxx_re1","GENGxxx_re2"],
  },
  {
    id: 9, label: "Semester 9", season: "Fall",
    color: "from-purple-700 to-purple-500", border: "border-purple-600", bg: "bg-purple-50", badge: "bg-purple-100 text-purple-800",
    courseCodes: ["EPEG401","EPEG4XX_1","EPEG4XX_2","EPEG4XX_3","EPEG480","GENGxxx_fe"],
  },
  {
    id: 10, label: "Semester 10", season: "Spring",
    color: "from-rose-600 to-rose-400", border: "border-rose-500", bg: "bg-rose-50", badge: "bg-rose-100 text-rose-800",
    courseCodes: ["EPEG402","EPEG4XX_4","EPEG4XX_5","EPEG4XX_6","EPEG481"],
  },
];

const courseMap = Object.fromEntries(allCourses.map((c) => [c.code, c]));

function CourseCard({ course, badge }: { course: Course; badge: string }) {
  const [expanded, setExpanded] = useState(false);
  const hasInfo = (course.prereqs && course.prereqs.length > 0) || (course.unlocks && course.unlocks.length > 0);

  return (
    <div
      className={`rounded-lg text-left transition-all duration-150
        ${course.special
          ? "bg-amber-100 border border-amber-300"
          : course.elective
          ? "bg-gray-100 border border-gray-300"
          : "bg-white border border-gray-200"
        } ${hasInfo ? "cursor-pointer hover:shadow-md" : ""}`}
      onClick={() => hasInfo && setExpanded((v) => !v)}
    >
      <div className="px-2 pt-2 pb-1">
        <div className={`text-[10px] font-bold tracking-wide mb-0.5 inline-block rounded px-1 py-0.5 ${badge}`}>
          {course.code.replace(/_\d+$/, "")}
        </div>
        <div className="text-[11px] text-gray-700 leading-tight font-medium">{course.name}</div>
      </div>

      {hasInfo && (
        <div className="px-2 pb-1.5 flex gap-2">
          {course.prereqs && course.prereqs.length > 0 && (
            <span className="flex items-center gap-0.5 text-[9px] text-orange-600 font-semibold">
              <Lock className="w-2.5 h-2.5" /> {course.prereqs.length}
            </span>
          )}
          {course.unlocks && course.unlocks.length > 0 && (
            <span className="flex items-center gap-0.5 text-[9px] text-green-600 font-semibold">
              <ArrowRight className="w-2.5 h-2.5" /> {course.unlocks.length}
            </span>
          )}
          {hasInfo && (
            <span className="text-[9px] text-gray-400 ml-auto">{expanded ? "▲" : "▼"} details</span>
          )}
        </div>
      )}

      {expanded && hasInfo && (
        <div className="border-t border-gray-200 mx-2 mt-0 pt-1.5 pb-2 flex flex-col gap-1.5">
          {course.prereqs && course.prereqs.length > 0 && (
            <div>
              <div className="flex items-center gap-1 text-[9px] font-bold text-orange-600 uppercase mb-1">
                <Lock className="w-2.5 h-2.5" /> Requires
              </div>
              <div className="flex flex-wrap gap-1">
                {course.prereqs.map((p, i) => (
                  <span key={i} className="text-[9px] bg-orange-50 border border-orange-200 text-orange-700 rounded px-1.5 py-0.5 font-mono">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
          {course.unlocks && course.unlocks.length > 0 && (
            <div>
              <div className="flex items-center gap-1 text-[9px] font-bold text-green-600 uppercase mb-1">
                <ArrowRight className="w-2.5 h-2.5" /> Unlocks
              </div>
              <div className="flex flex-wrap gap-1">
                {course.unlocks.map((u, i) => (
                  <span key={i} className="text-[9px] bg-green-50 border border-green-200 text-green-700 rounded px-1.5 py-0.5 font-mono">
                    {u}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SemesterCard({ semester, isOpen, onToggle }: {
  semester: typeof semesters[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const courses = semester.courseCodes.map((c) => courseMap[c]).filter(Boolean);

  return (
    <div
      className={`flex-shrink-0 rounded-xl border-2 ${semester.border} shadow-md transition-all duration-300 overflow-hidden bg-white`}
      style={{ minWidth: isOpen ? "220px" : "80px", maxWidth: isOpen ? "240px" : "80px" }}
    >
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
          {courses.map((course, i) => (
            <CourseCard key={i} course={course} badge={semester.badge} />
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
          <div className="flex items-center gap-4">
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
              <span className="flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-orange-500" /> Requires
              </span>
              <span className="flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-green-500" /> Unlocks
              </span>
            </div>
            <button
              onClick={() => setOpenSemesters(allOpen ? new Set() : new Set(semesters.map((s) => s.id)))}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors"
            >
              {allOpen ? "Collapse All" : "Expand All"}
            </button>
          </div>
        </div>
      </header>

      <div className="px-6 py-2 bg-blue-50 border-b border-blue-100 text-xs text-blue-700 flex-shrink-0">
        Click any course card to see its prerequisites and what courses it unlocks.
      </div>

      <main className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-3 items-start" style={{ minWidth: "max-content" }}>
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
        EPE Program · Alternative 1 · 10 Semesters · {allCourses.length} courses total · Bylaws 2023
      </footer>
    </div>
  );
}
