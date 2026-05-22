import React, { useState } from "react";

const Eye = ({ className, size }: { className?: string; size?: number }) => (
  <span className={className} style={{ fontSize: size ?? 18, lineHeight: 1 }}>
    👁️
  </span>
);

const EyeOff = ({ className, size }: { className?: string; size?: number }) => (
  <span className={className} style={{ fontSize: size ?? 18, lineHeight: 1 }}>
    🙈
  </span>
);

const Mail = ({ className, size }: { className?: string; size?: number }) => (
  <span className={className} style={{ fontSize: size ?? 18, lineHeight: 1 }}>
    ✉️
  </span>
);

const Lock = ({ className, size }: { className?: string; size?: number }) => (
  <span className={className} style={{ fontSize: size ?? 18, lineHeight: 1 }}>
    🔒
  </span>
);

const User = ({ className, size }: { className?: string; size?: number }) => (
  <span className={className} style={{ fontSize: size ?? 18, lineHeight: 1 }}>
    👤
  </span>
);

const LayoutDashboard = ({ className, size }: { className?: string; size?: number }) => (
  <span className={className} style={{ fontSize: size ?? 18, lineHeight: 1 }}>
    📊
  </span>
);

const FileText = ({ className, size }: { className?: string; size?: number }) => (
  <span className={className} style={{ fontSize: size ?? 18, lineHeight: 1 }}>
    📝
  </span>
);

const ClipboardCheck = ({ className, size }: { className?: string; size?: number }) => (
  <span className={className} style={{ fontSize: size ?? 18, lineHeight: 1 }}>
    ✅
  </span>
);

const CheckCircle = ({ className, size }: { className?: string; size?: number }) => (
  <span className={className} style={{ fontSize: size ?? 18, lineHeight: 1 }}>
    ✔️
  </span>
);


const Upload = ({ className, size }: { className?: string; size?: number }) => (
  <span className={className} style={{ fontSize: size ?? 18, lineHeight: 1 }}>
    ⬆️
  </span>
);

export default function App() {

  // =========================
  // AUTH
  // =========================
  const [isLogin, setIsLogin] =
    useState(true);

  const [showPassword, setShowPassword] =
    useState(false);

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  // =========================
  // PROFILE
  // =========================
  const [studentName, setStudentName] =
    useState("John Doe");

  const [tempName, setTempName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [profileImage, setProfileImage] =
    useState(
      "https://i.pravatar.cc/150"
    );

  const [tempImage, setTempImage] =
    useState<string | null>(null);

  // =========================
  // NOTIFICATION
  // =========================
  const [notification, setNotification] =
    useState("");

  const showNotification = (message: string) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  // =========================
  // DASHBOARD SECTION
  // =========================
  const [activeSection, setActiveSection] =
    useState("dashboard");

  // =========================
  // ASSIGNMENTS
  // =========================
  const [assignments, setAssignments] =
    useState([
      "React Project",
      "Database Assignment",
    ]);

  const [newAssignment, setNewAssignment] =
    useState("");

  // =========================
  // EXAMS
  // =========================
  const [selectedCourse, setSelectedCourse] =
    useState("");

  const [matricNumber, setMatricNumber] =
    useState("");

  const [level, setLevel] =
    useState("");

  const courses = [
    "MTH 500",
    "MTH 760",
    "STAT 600",
  ];

  // =========================
  // LOGIN
  // =========================
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLogin && tempName.trim() === "") {
      showNotification(
        "Please enter your full name"
      );
      return;
    }

    if (!isLogin) {
      setStudentName(tempName);
    }

    setIsAuthenticated(true);

    showNotification(
      isLogin
        ? "Login Successful!"
        : "Registration Successful!"
    );
  };

  // =========================
  // IMAGE UPLOAD
  // =========================
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];

    if (file) {

      const imageUrl =
        URL.createObjectURL(file);

      setTempImage(imageUrl);

      showNotification(
        "Image Uploaded Successfully!"
      );
    }
  };

  // =========================
  // SAVE PROFILE
  // =========================
  const saveProfileDetails = () => {

    if (tempName.trim() !== "") {
      setStudentName(tempName);
    }

    if (tempImage) {
      setProfileImage(tempImage);
    }

    showNotification(
      "Profile Updated Successfully!"
    );
  };

  // =========================
  // ASSIGNMENT
  // =========================
  const submitAssignment = () => {

    if (
      newAssignment.trim() !== ""
    ) {
      setAssignments([
        ...assignments,
        newAssignment,
      ]);

      setNewAssignment("");

      showNotification(
        "Assignment Submitted Successfully!"
      );
    }
  };

  // =========================
  // START EXAM
  // =========================
  const startExam = () => {

    if (
      matricNumber.trim() !== "" &&
      level.trim() !== ""
    ) {

      showNotification(
        `${selectedCourse} Exam Started`
      );

    } else {

      showNotification(
        "Please fill all exam details"
      );
    }
  };

  // =========================
  // LOGIN PAGE
  // =========================
  if (!isAuthenticated) {

    return (
     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f172a] via-[#111827] to-[#1e293b] p-6">

        {/* NOTIFICATION */}
        {notification && (
          <div className="fixed top-5 right-5 bg-cyan-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-bounce">
            {notification}
          </div>
        )}

        <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">

          {/* LEFT */}
          <div className="p-10 md:p-14 flex flex-col justify-center">

            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {isLogin
                ? "Welcome Back 👋"
                : "Create Account"}
            </h1>

            <p className="text-gray-500 mb-8">
              {isLogin
                ? "Login to access dashboard"
                : "Create student account"}
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* NAME */}
              {!isLogin && (
                <div>

                  <label className="block text-sm text-gray-600 mb-2">
                    Full Name
                  </label>

                  <div className="relative">

                    <User
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={18}
                    />

                    <input
                      type="text"
                      placeholder="John Doe"
                      value={tempName}
                      onChange={(e) =>
                        setTempName(
                          e.target.value
                        )
                      }
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              )}

              {/* EMAIL */}
              <div>

                <label className="block text-sm text-gray-600 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    className="absolute left-4 top-3.5 text-gray-400"
                    size={18}
                  />

                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>

                <label className="block text-sm text-gray-600 mb-2">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    className="absolute left-4 top-3.5 text-gray-400"
                    size={18}
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="********"
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-3 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition-all text-white py-3 rounded-xl font-semibold shadow-lg"
              >
                {isLogin
                  ? "Login"
                  : "Register"}
              </button>
            </form>

            {/* TOGGLE */}
            <p className="mt-8 text-center text-gray-500">

              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                onClick={() =>
                  setIsLogin(!isLogin)
                }
                className="ml-2 text-cyan-600 font-semibold"
              >
                {isLogin
                  ? "Register"
                  : "Login"}
              </button>
            </p>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex relative">

            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
              alt="background"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-cyan-900/60"></div>

            <div className="absolute bottom-10 left-10 text-white">

              <h2 className="text-5xl font-bold mb-4">
                Student Portal
              </h2>

              <p className="max-w-md text-lg text-white/80">
                Manage exams,
                assignments,
                and profile easily.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // DASHBOARD
  // =========================
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* NOTIFICATION */}
      {notification && (
        <div className="fixed top-5 right-5 bg-cyan-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-bounce">
          {notification}
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-72 bg-[#081028] text-white flex flex-col">

        {/* PROFILE */}
        <div className="p-6 border-b border-gray-700 flex items-center gap-4">

          <img
            src={profileImage}
            alt="profile"
            className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500"
          />

          <div>
            <h2 className="font-bold text-lg">
              {studentName}
            </h2>

            <p className="text-gray-400 text-sm">
              Student Dashboard
            </p>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 p-4 space-y-3">

          <SidebarItem
            icon={<LayoutDashboard />}
            title="Dashboard"
            active={
              activeSection === "dashboard"
            }
            onClick={() =>
              setActiveSection("dashboard")
            }
          />

          <SidebarItem
            icon={<User />}
            title="Personal Details"
            active={
              activeSection === "personal"
            }
            onClick={() =>
              setActiveSection("personal")
            }
          />

          <SidebarItem
            icon={<FileText />}
            title="Exams"
            active={
              activeSection === "exams"
            }
            onClick={() =>
              setActiveSection("exams")
            }
          />

          <SidebarItem
            icon={<ClipboardCheck />}
            title="Assignments"
            active={
              activeSection ===
              "assignments"
            }
            onClick={() =>
              setActiveSection(
                "assignments"
              )
            }
          />

          <SidebarItem
            icon={<CheckCircle />}
            title="Clearance"
            active={
              activeSection ===
              "clearance"
            }
            onClick={() =>
              setActiveSection(
                "clearance"
              )
            }
          />
        </nav>

        {/* LOGOUT */}
        <div className="p-6">

          <button
            onClick={() =>
              setIsAuthenticated(false)
            }
            className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">

        {/* DASHBOARD */}
        {activeSection === "dashboard" && (
          <div>

            <h1 className="text-3xl font-bold mb-8">
              Welcome, {studentName}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

              <Card
                title="Assignments"
                value={assignments.length.toString()}
              />

              <Card
                title="Exams"
                value={courses.length.toString()}
              />

              <Card
                title="Department"
                value={
                  department || "N/A"
                }
              />

              <Card
                title="Clearance"
                value="Approved"
              />
            </div>
          </div>
        )}

        {/* PERSONAL DETAILS */}
        {activeSection === "personal" && (
          <SectionCard title="Personal Details">

            <div className="flex flex-col md:flex-row gap-10">

              {/* IMAGE */}
              <div className="flex flex-col items-center">

                <img
                  src={
                    tempImage ||
                    profileImage
                  }
                  alt="profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-cyan-500 shadow-lg"
                />

                <label className="mt-5 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl cursor-pointer flex items-center gap-2">

                  <Upload size={18} />
                  Upload Picture

                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={
                      handleImageUpload
                    }
                  />
                </label>
              </div>

              {/* FORM */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">

                <Input
                  label="Full Name"
                  value={tempName}
                  onChange={(e) =>
                    setTempName(
                      e.target.value
                    )
                  }
                />

                <Input
                  label="Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                />

                <Input
                  label="Address"
                  value={address}
                  onChange={(e) =>
                    setAddress(
                      e.target.value
                    )
                  }
                />

                <Input
                  label="Department"
                  value={department}
                  onChange={(e) =>
                    setDepartment(
                      e.target.value
                    )
                  }
                />

                <div className="md:col-span-2">

                  <button
                    onClick={
                      saveProfileDetails
                    }
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
                  >
                    Save Details
                  </button>
                </div>
              </div>
            </div>
          </SectionCard>
        )}

        {/* EXAMS */}
        {activeSection === "exams" && (

          <SectionCard title="Available Exams">

            {!selectedCourse && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {courses.map(
                  (course, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedCourse(
                          course
                        );

                        showNotification(
                          `${course} Selected`
                        );
                      }}
                      className="bg-linear-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all text-white rounded-2xl p-8 shadow-xl"
                    >
                      <h2 className="text-2xl font-bold">
                        {course}
                      </h2>

                      <p className="mt-2 text-white/80">
                        Click to continue exam
                      </p>
                    </button>
                  )
                )}
              </div>
            )}

            {/* EXAM FORM */}
            {selectedCourse && (
              <div className="max-w-2xl mx-auto bg-gray-50 rounded-3xl p-8 shadow-lg">

                <h2 className="text-3xl font-bold text-center mb-2 text-cyan-600">
                  {selectedCourse}
                </h2>

                <p className="text-center text-gray-500 mb-8">
                  Fill your details
                  to start exam
                </p>

                <div className="mb-5">

                  <label className="block text-gray-600 mb-2">
                    Matric Number
                  </label>

                  <input
                    type="text"
                    placeholder="CSC/2025/001"
                    value={matricNumber}
                    onChange={(e) =>
                      setMatricNumber(
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  />
                </div>

                <div className="mb-8">

                  <label className="block text-gray-600 mb-2">
                    Level
                  </label>

                  <input
                    type="text"
                    placeholder="500 Level"
                    value={level}
                    onChange={(e) =>
                      setLevel(
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  />
                </div>

                <div className="flex gap-4">

                  <button
                    onClick={startExam}
                    className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl font-bold shadow-lg"
                  >
                    Start Exam
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCourse(
                        ""
                      );

                      setMatricNumber(
                        ""
                      );

                      setLevel("");
                    }}
                    className="px-6 bg-gray-300 hover:bg-gray-400 rounded-xl font-semibold"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </SectionCard>
        )}

        {/* ASSIGNMENTS */}
        {activeSection ===
          "assignments" && (

          <SectionCard title="Assignments">

            <div className="flex gap-4 mb-8">

              <input
                type="text"
                value={newAssignment}
                onChange={(e) =>
                  setNewAssignment(
                    e.target.value
                  )
                }
                placeholder="Enter Assignment"
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3"
              />

              <button
                onClick={
                  submitAssignment
                }
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 rounded-xl"
              >
                Submit
              </button>
            </div>

            <div className="space-y-4">

              {assignments.map(
                (
                  assignment,
                  index
                ) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-xl px-5 py-4 flex justify-between"
                  >
                    <span>
                      {assignment}
                    </span>

                    <span className="text-green-600 font-semibold">
                      Submitted
                    </span>
                  </div>
                )
              )}
            </div>
          </SectionCard>
        )}

        {/* CLEARANCE */}
        {activeSection ===
          "clearance" && (

          <SectionCard title="Clearance Status">

            <ClearanceItem
              title="Library Clearance"
              status="Approved"
            />

            <ClearanceItem
              title="Department Clearance"
              status="Approved"
            />

            <ClearanceItem
              title="School Fees"
              status="Pending"
            />
          </SectionCard>
        )}
      </main>
    </div>
  );
}

// =========================
// COMPONENTS
// =========================

function SidebarItem({
  icon,
  title,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  active: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all ${
        active
          ? "bg-cyan-500 text-white"
          : "hover:bg-[#111c44] text-gray-300"
      }`}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <p className="text-gray-500">
        {title}
      </p>

      <h3 className="text-3xl font-bold text-cyan-600 mt-2">
        {value}
      </h3>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div>

      <label className="block text-gray-600 mb-2">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
      />
    </div>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-3xl font-bold mb-8">
        {title}
      </h2>

      {children}
    </div>
  );
}

function ClearanceItem({
title, 
  status,
}: {
  title: string;
  status: string;
}) {
  return (
    <div className="bg-gray-100 rounded-xl px-5 py-4 flex justify-between">

      <h4 className="font-semibold">
        {title}
      </h4>

      <span
        className={`font-semibold ${
          status === "Approved"
            ? "text-green-600"
            : "text-yellow-600"
        }`}
      >
        {status}
      </span>
    </div>
  );
}