import React, { useEffect, useState } from "react";
import styles from "./AdminPage.module.css";

const AdminPage = () => {
  const ADMIN_PASSWORD = "techcadd2016";
  const ADMIN_ACCESS_KEY = "adminAccessGranted";

  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(ADMIN_ACCESS_KEY) === "true";
  });

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleUnlock = (event) => {
    event.preventDefault();

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_ACCESS_KEY, "true");
      setIsAuthenticated(true);
      setAuthError("");
      setPassword("");
      return;
    }

    setAuthError("Invalid admin password.");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setStatus("loading");
      return;
    }

    const load = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/form`);
        if (!response.ok) {
          throw new Error("Failed to fetch form data");
        }
        const data = await response.json();
        const submissions = Array.isArray(data?.data) ? data.data : [];
        setItems(submissions);
        setStatus("ready");
      } catch (error) {
        setStatus("error");
      }
    };

    load();
  }, [isAuthenticated, apiBaseUrl]);

  if (!isAuthenticated) {
    return (
      <div className={styles.adminPage}>
        <div className={styles.authCard}>
          <h1 className={styles.title}>Admin Access</h1>
          <p className={styles.status}>Enter password to continue.</p>
          <form className={styles.authForm} onSubmit={handleUnlock}>
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (authError) {
                  setAuthError("");
                }
              }}
              placeholder="Enter admin password"
              className={styles.passwordInput}
              required
            />
            <button type="submit" className={styles.unlockButton}>
              Unlock Admin
            </button>
          </form>
          {authError && <p className={styles.authError}>{authError}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      <h1 className={styles.title}>Form Submissions</h1>
      {status === "loading" && <p className={styles.status}>Loading...</p>}
      {status === "error" && (
        <p className={styles.status}>Failed to load form data.</p>
      )}
      {status === "ready" && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Experience</th>
                <th>Topic</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className={styles.empty}>
                    No submissions yet.
                  </td>
                </tr>
              )}
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.experience || "-"}</td>
                  <td>{item.topic || "-"}</td>
                  <td>{item.name || "-"}</td>
                  <td>{item.phone || "-"}</td>
                  <td>{item.email || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
