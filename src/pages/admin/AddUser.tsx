import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";
import { useState } from "react";
import "./AddUser.css";

const AddUser = () => {
  const [name, setName] = useState("");
  const [regOrStaff, setRegOrStaff] = useState("");
  const [email, setEmail] = useState("");

  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");

  const departments = ["CSE", "ECE", "EEE", "MECH"];
  const roles = ["student", "faculty"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !role) {
      alert("Please fill all required fields");
      return;
    }

    console.log("New User Created:", {
      name,
      regOrStaff,
      email,
      department,
      role,
    });

    alert("User added successfully!");
    setName("");
    setRegOrStaff("");
    setEmail("");
    setRole("");
    setDepartment("");
  };

  return (
    <>
      <Navbar />

      <div className="adduser-page">
        <div className="adduser-container">
          <h1 className="adduser-title">Add New User</h1>
          <p className="adduser-description">
            Admin can add students or faculty members.
          </p>

          <form className="adduser-form" onSubmit={handleSubmit}>
            <div className="adduser-grid">
              {/* NAME */}
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* REG / STAFF */}
              <div className="form-group">
                <label>Register Number / Staff ID *</label>
                <input
                  type="text"
                  placeholder="Enter register no / staff ID"
                  value={regOrStaff}
                  onChange={(e) => setRegOrStaff(e.target.value)}
                />
              </div>

              {/* EMAIL */}
              <div className="form-group">
                <label>Email ID *</label>
                <input
                  type="email"
                  placeholder="example@citchennai.net"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* DEPARTMENT DROPDOWN */}
              <div className="form-group">
                <label>Department</label>

                <DropdownMenu>
                  <DropdownMenuTrigger className="dropdown-trigger">
                    {department || "Select Department"}
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="dropdown-panel">
                    {departments.map((dep) => (
                      <DropdownMenuItem
                        key={dep}
                        className={`dropdown-item ${
                          department === dep ? "active-item" : ""
                        }`}
                        onClick={() => setDepartment(dep)}
                      >
                        {department === dep && (
                          <Check className="check-icon" />
                        )}
                        {dep}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* ROLE DROPDOWN */}
              <div className="form-group">
                <label>User Role *</label>

                <DropdownMenu>
                  <DropdownMenuTrigger className="dropdown-trigger">
                    {role || "Select Role"}
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="dropdown-panel">
                    {roles.map((r) => (
                      <DropdownMenuItem
                        key={r}
                        className={`dropdown-item ${
                          role === r ? "active-item" : ""
                        }`}
                        onClick={() => setRole(r)}
                      >
                        {role === r && <Check className="check-icon" />}
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Button className="adduser-submit">Add User</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;
