import { useState, useEffect } from "react";
import { TextField } from "@radix-ui/themes";

const IssueSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [issues, setIssues] = useState([]);

  // ✅ Debounce the search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchTerm.length > 2) {
        // Only search if 3+ characters
        try {
          const response = await fetch(`/api/issues/search?q=${searchTerm}`);
          const results = await response.json();
          setIssues(results);
        } catch (error) {
          console.error("Search error:", error);
        }
      }
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div>
      <TextField.Root
        placeholder="Search issues..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {issues.length > 0 && (
        <div className="mt-4">
          {issues.map((issue: any) => (
            <div key={issue.id} className="p-2 border-b">
              {issue.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
