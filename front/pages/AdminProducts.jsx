import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
const categoryMap = {
  skinquality: "איכות ומרקם האור",
  hairloss: "התקרחות גברית",
  weightloss: "ירידה במשקל",
  

};
const subcategoryMap = {
  skinquality: {
    psoriazis: "פסוריאזיס",
    acne: "אקנה",
    pigmentation: "פיגמנטציה",
    antiaiging: "אנטי אייג'ינג",
  },
};
function AdminProducts() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSubcategories, setShowSubcategories] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user]);

  
  const handleCategoryClick = (category) => {
    if (category === "skinquality") {
      setShowSubcategories((prev) => !prev);
    } else {
      navigate(`/${category}`);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    navigate(`/${subcategory}`);
  };

  return (
    <div className="container mt-5" dir="rtl">
      <h2 className="mb-4 text-center">ניהול מוצרים לפי קטגוריה</h2>

      <div className="mb-4 d-flex flex-column align-items-center">
        {Object.entries(categoryMap).map(([key, label]) => (
          <div key={key} className="w-100 text-center">
            <button
              className="btn w-50 my-2 d-flex justify-content-between align-items-center btn-outline-primary"
              onClick={() => handleCategoryClick(key)}
            >
              <span>{label}</span>
              {key === "skinquality" ? (
                <span>
                  {showSubcategories ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              ) : null}
            </button>

            {key === "skinquality" && showSubcategories && (
              <div className="mt-2">
                {Object.entries(subcategoryMap.skinquality).map(
                  ([subKey, subLabel]) => (
                    <button
                      key={subKey}
                      className="btn btn-sm btn-outline-secondary w-50 my-1"
                      onClick={() => handleSubcategoryClick(subKey)}
                    >
                      {subLabel}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;