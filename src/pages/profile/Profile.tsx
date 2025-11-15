import { Navbar } from "@/components/layout/Navbar";
import { HelpPopup } from "@/components/shared/HelpPopup";
import { useApp } from "@/providers/AppProvider";
import "./Profile.css";

const Profile = () => {
  const { user } = useApp(); // name, email, role, etc.

  const profileFields: any = {
    student: [
      { label: "Name", value: user?.name },
      { label: "Email", value: user?.email },
      { label: "Roll No", value: (user as any)?.rollno || "—" },
      { label: "Department", value: (user as any)?.department || "—" },
    ],
    faculty: [
      { label: "Name", value: user?.name },
      { label: "Email", value: user?.email },
      { label: "Faculty ID", value: (user as any)?.facultyId || "—" },
      { label: "Department", value: (user as any)?.department || "—" },
    ],
    admin: [
      { label: "Name", value: user?.name },
      { label: "Email", value: user?.email },
    ],
  };

  const fields = profileFields[user?.role || "student"];

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-container">

          {/* =========================
               HEADER
          ========================== */}
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="profile-info-text">
              <h1 className="profile-title">{user?.name}</h1>
              <p className="profile-role">
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
              </p>
            </div>
          </div>

          {/* =========================
               PROFILE CARD
          ========================== */}
          <div className="profile-card">
            <h2 className="profile-section-title">Profile Information</h2>

            {/* CHANGED THIS ONLY — vertical layout */}
            <div className="profile-column">
              {fields.map((field: any) => (
                <div key={field.label} className="profile-row">
                  <p className="profile-label">{field.label}</p>
                  <p className="profile-value">{field.value}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      <HelpPopup />
    </>
  );
};

export default Profile;
