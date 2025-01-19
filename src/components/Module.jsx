import React, { useState, useRef } from "react";

export default function CourseModules({ modules }) {
  const [expandedModuleId, setExpandedModuleId] = useState(modules[0]?.id || null);
  const contentRef = useRef({});

  const toggleModule = (moduleId) => {
    setExpandedModuleId((prev) => (prev === moduleId ? null : moduleId));
  };

  const gradientStyle = {
    backgroundImage: "linear-gradient(to right, #0D8267, #044233)",
    color: "white",
    textAlign: "center",
  };

  return (
    <div className="py-10 px-4 md:px-8 lg:px-16 rounded-lg font-inter max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-main mb-8 text-center">
        Course Curriculum
      </h2>
      <div className="space-y-6">
        {modules.map((module) => (
          <div
            key={module.id}
            className="bg-white border font-medium border-gray-200 rounded-xl shadow-lg overflow-hidden"
          >
            <div
              style={gradientStyle}
              className="p-4 text-white font-semibold cursor-pointer flex justify-between items-center rounded-t-xl"
              onClick={() => toggleModule(module.id)}
            >
              <h3 className="text-sm md:text-md">{module.moduleName}</h3>
              <span className="text-xl">
                {expandedModuleId === module.id ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 15.75 7.5-7.5 7.5 7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
              </span>
            </div>

            <div
              ref={(el) => (contentRef.current[module.id] = el)}
              style={{
                height: expandedModuleId === module.id ? `${contentRef.current[module.id]?.scrollHeight}px` : "0px",
                overflow: "hidden",
                transition: "height 0.3s ease",
              }}
              className="bg-gray-50"
            >
              {module.contents.length > 0 ? (
                <ul className="space-y-3 p-4">
                  {module.contents.map((content) => (
                    <li
                      key={content.id}
                      className="p-3 bg-white text-sm rounded-lg shadow-md border-l-4 border-main hover:bg-green-50 transition-all"
                    >
                      {content.contentName}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center p-4">
                  No contents available for this module.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
